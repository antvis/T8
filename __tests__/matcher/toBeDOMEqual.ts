import * as fs from 'fs';
import * as path from 'path';
import { format } from 'prettier';

async function formatHTML(html: string): Promise<string> {
  return await format(html, {
    parser: 'html',
  });
}

function diffString(actual: string, expected: string): string[] {
  const actualLines = actual.split('\n');
  const expectedLines = expected.split('\n');
  const diff: string[] = [];

  for (let i = 0; i < Math.min(actualLines.length, expectedLines.length); i++) {
    const actualLine = actualLines[i] || '';
    const expectedLine = expectedLines[i] || '';

    if (actualLine !== expectedLine) {
      diff.push(`- ${expectedLine}`);
      diff.push(`+ ${actualLine}`);
    }
  }

  return diff;
}

/**
 * Used to compare the actual DOM output with a golden file.
 * If the golden file does not exist, it will create one.
 * If the actual output does not match the golden file, it will return a mismatch error.
 * If the actual output matches the golden file, it will return a success message.
 */
export async function toBeDOMEqual(
  dom: Element | string,
  name: string,
  dir: string = './__tests__/snapshot',
): Promise<{ message: () => string; pass: boolean }> {
  const targetFile = path.join(dir, name);
  const actualFilePath = path.join(dir, `${name}-actual.html`);
  const expectedFilePath = path.join(dir, `${name}.html`);

  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const domElement = typeof dom === 'string' ? document.querySelector(dom) : dom;
    const domString = await formatHTML(domElement?.outerHTML || '');

    // If the target file does not exist, create it.
    if (!fs.existsSync(expectedFilePath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${targetFile}`);
      }

      console.warn(`! generate ${targetFile}`);
      fs.writeFileSync(expectedFilePath, domString, 'utf8');

      return {
        message: () => `generate ${targetFile}`,
        pass: true,
      };
    } else {
      fs.writeFileSync(actualFilePath, domString, 'utf8');
      const expectedDomString = await formatHTML(fs.readFileSync(expectedFilePath, 'utf8'));

      const diff = diffString(domString, expectedDomString);
      const pass = diff.length === 0;

      if (pass) {
        fs.unlinkSync(actualFilePath);
        return {
          message: () => `match ${targetFile}`,
          pass: true,
        };
      }
      return {
        message: () => `Mismatch between actual and expected DOM output.\n\n${diff.join('\n')}`,
        pass: false,
      };
    }
  } catch (e) {
    return {
      message: () => `${e}`,
      pass: false,
    };
  }
}
