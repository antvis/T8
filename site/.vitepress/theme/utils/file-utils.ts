import path from 'node:path';
import byteSize from 'byte-size';
import markdownTitle from 'markdown-title';
import { compile, match } from 'path-to-regexp';

interface DirectoryInfo {
  path: string;
  depth: number;
  relativePath: string;
}

interface FileData {
  data?: {
    title?: string;
    titleTemplate?: string;
  };
  content: string;
}

const splitDirAndFile = (filepath: string) => ({
  dir: path.dirname(filepath),
  file: path.basename(filepath),
});

const contentFileExts = new Set(['.md', '.html']);

export const stripExt = (filepath: string, usePosix = false): string => {
  const { dir, file } = splitDirAndFile(filepath);
  const ext = path.extname(file);
  const base = contentFileExts.has(ext) ? path.basename(file, ext) : file;
  const joinFn = usePosix ? path.posix.join : path.join;
  return joinFn(dir, base);
};

export const stripExtPosix = (filepath: string): string => stripExt(filepath, true);

export const transformToPosixPath = (filepath: string): string => filepath.replace(/\\/g, '/');

export function cleanUrl(path: string): string {
  let cleanedPath = path.split('?')[0].split('#')[0];
  if (cleanedPath.length > 1 && cleanedPath.endsWith('/')) {
    cleanedPath = cleanedPath.slice(0, -1);
  }

  const removeHtmlExtension = (pathSegment: string): string => {
    const lastSlashIndex = pathSegment.lastIndexOf('/');
    const lastDotIndex = pathSegment.lastIndexOf('.');
    if (lastDotIndex > lastSlashIndex && lastDotIndex !== -1 && pathSegment.endsWith('.html')) {
      return pathSegment.substring(0, lastDotIndex);
    }
    return pathSegment;
  };

  const protocolMatch = cleanedPath.match(/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//);
  if (protocolMatch) {
    const protocolEndIndex = protocolMatch[0].length;
    const pathStartIndex = cleanedPath.indexOf('/', protocolEndIndex);
    if (pathStartIndex === -1) {
      return cleanedPath;
    }
    const domainPart = cleanedPath.substring(0, pathStartIndex);
    const pathPart = cleanedPath.substring(pathStartIndex);
    return domainPart + removeHtmlExtension(pathPart);
  }

  return removeHtmlExtension(cleanedPath);
}

type RewriteFunction = (file: string) => string | undefined;
type RewriteRules = Record<string, string> | RewriteFunction;

export function resolveOutputFilePath(file: string, workDir: string, rewrites?: RewriteRules): string {
  let resolvedRewrite: string | undefined;

  if (typeof rewrites === 'function') {
    const resolvedFilePath = rewrites(file);
    if (resolvedFilePath) resolvedRewrite = resolvedFilePath;
  } else if (rewrites && typeof rewrites === 'object') {
    if (file in rewrites) {
      resolvedRewrite = rewrites[file];
    } else {
      for (const [pattern, replacement] of Object.entries(rewrites)) {
        if (!pattern.includes(':') && !pattern.includes('*')) {
          continue;
        }
        try {
          const matcher = match(pattern);
          const result = matcher(file);
          if (result) {
            const compileFn = compile(replacement);
            resolvedRewrite = compileFn(result.params);
            break;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
          // Ignore pattern matching errors
        }
      }
    }
  }

  if (resolvedRewrite) {
    return path.join(workDir, resolvedRewrite);
  }
  return file;
}

export function getDirectoriesAtDepths(files: string[], baseDir: string, maxDepth: number): DirectoryInfo[] {
  const directories = new Set<string>();
  directories.add(baseDir);

  for (const file of files) {
    const relativePath = path.relative(baseDir, file);
    const parts = relativePath.split(path.sep);
    for (let depth = 1; depth < Math.min(parts.length, maxDepth); depth++) {
      const dirParts = parts.slice(0, depth);
      const dirPath = path.resolve(baseDir, ...dirParts);
      directories.add(dirPath);
    }
  }

  return Array.from(directories)
    .map((dirPath) => ({
      path: dirPath,
      depth: dirPath === baseDir ? 1 : path.relative(baseDir, dirPath).split(path.sep).length + 1,
      relativePath: path.relative(baseDir, dirPath) || '.',
    }))
    .filter((dir) => dir.depth <= maxDepth)
    .sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return a.path.localeCompare(b.path);
    });
}

export function extractTitle(file: FileData): string | undefined {
  return file.data?.title || file.data?.titleTemplate || markdownTitle(file.content);
}

export const getHumanReadableSizeOf = (string: string): string => byteSize(new Blob([string]).size).toString();
