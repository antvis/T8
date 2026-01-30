import {
  NarrativeTextSpec,
  ParagraphSpec,
  ParagraphType,
  PhraseSpec,
  PhraseType,
  EntityMetaData,
  BulletItemSpec,
} from '../schema';

/**
 * Parses a T8 Syntax string into a NarrativeTextSpec object.
 *
 * T8 Syntax supports:
 * - Markdown-style headings (# to ######)
 * - Paragraphs (text separated by blank lines)
 * - Bullet lists (- or * for unordered, 1. 2. 3. for ordered)
 * - Text formatting (**bold**, *italic*, __underline__)
 * - Links [text](url)
 * - Entity syntax: [displayText](entityType, key1=value1, key2="value2")
 *
 * @param syntaxString - The T8 Syntax string to parse
 * @returns A NarrativeTextSpec object
 */
export function parseSyntax(syntaxString: string): NarrativeTextSpec {
  const lines = syntaxString.split('\n');
  const sections: { paragraphs: ParagraphSpec[] }[] = [];
  const currentParagraphs: ParagraphSpec[] = [];
  let currentParagraphLines: string[] = [];
  let currentBulletLines: string[] = [];
  let inBulletList = false;
  let bulletListIsOrdered = false;

  const flushBulletList = () => {
    if (currentBulletLines.length > 0) {
      const bulletParagraph = parseBulletList(currentBulletLines, bulletListIsOrdered);
      if (bulletParagraph) {
        currentParagraphs.push(bulletParagraph);
      }
      currentBulletLines = [];
      inBulletList = false;
    }
  };

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const text = currentParagraphLines.join('\n').trim();
      if (text) {
        const paragraph = parseBlock(text);
        if (paragraph) {
          currentParagraphs.push(paragraph);
        }
      }
      currentParagraphLines = [];
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if it's a heading
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      // Flush any accumulated content
      flushBulletList();
      flushParagraph();

      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const phrases = parseInlineContent(content);

      const headingType = `heading${level}` as
        | ParagraphType.HEADING1
        | ParagraphType.HEADING2
        | ParagraphType.HEADING3
        | ParagraphType.HEADING4
        | ParagraphType.HEADING5
        | ParagraphType.HEADING6;

      currentParagraphs.push({
        type: headingType,
        phrases,
      } as ParagraphSpec);
      continue;
    }

    // Check if it's a bullet list item (unordered: - or *)
    const unorderedBulletMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
    if (unorderedBulletMatch) {
      flushParagraph();
      if (!inBulletList) {
        inBulletList = true;
        bulletListIsOrdered = false;
      }
      currentBulletLines.push(line);
      continue;
    }

    // Check if it's a numbered list item (ordered: 1. 2. 3.)
    const orderedBulletMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
    if (orderedBulletMatch) {
      flushParagraph();
      if (!inBulletList) {
        inBulletList = true;
        bulletListIsOrdered = true;
      }
      currentBulletLines.push(line);
      continue;
    }

    // Blank line
    if (trimmedLine === '') {
      flushBulletList();
      flushParagraph();
      continue;
    }

    // Regular text line
    if (inBulletList) {
      // If we're in a bullet list and hit non-bullet text, end the list
      flushBulletList();
    }
    currentParagraphLines.push(line);
  }

  // Flush any remaining content
  flushBulletList();
  flushParagraph();

  // Create sections from paragraphs
  if (currentParagraphs.length > 0) {
    sections.push({ paragraphs: currentParagraphs });
  }

  return {
    sections,
  };
}

/**
 * Parses a block of text into a ParagraphSpec.
 * Handles multi-line paragraphs that are not headings.
 */
function parseBlock(text: string): ParagraphSpec | null {
  if (!text.trim()) {
    return null;
  }

  const phrases = parseInlineContent(text);

  return {
    type: ParagraphType.NORMAL,
    phrases,
  };
}

/**
 * Parses bullet list lines into a BulletsParagraphSpec.
 */
function parseBulletList(lines: string[], isOrdered: boolean): ParagraphSpec | null {
  if (lines.length === 0) {
    return null;
  }

  const bullets: BulletItemSpec[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    let content = '';

    // Extract content after bullet marker
    if (isOrdered) {
      const match = trimmedLine.match(/^\d+\.\s+(.+)$/);
      if (match) {
        content = match[1];
      }
    } else {
      const match = trimmedLine.match(/^[-*]\s+(.+)$/);
      if (match) {
        content = match[1];
      }
    }

    if (content) {
      const phrases = parseInlineContent(content);
      bullets.push({
        type: 'bullet-item',
        phrases,
      });
    }
  }

  if (bullets.length === 0) {
    return null;
  }

  return {
    type: ParagraphType.BULLETS,
    isOrder: isOrdered,
    bullets,
  };
}

/**
 * Parses inline content (text with entity markers, formatting, and links) into an array of PhraseSpec.
 * Handles:
 * - Entity syntax: [displayText](entityType, key1=value1, key2="value2")
 * - Links: [text](http://url) or [text](https://url)
 * - Bold: **text**
 * - Italic: *text*
 * - Underline: __text__
 */
function parseInlineContent(text: string): PhraseSpec[] {
  const phrases: PhraseSpec[] = [];

  // Regex to match [...](...) syntax (both entities and links)
  const bracketRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = bracketRegex.exec(text)) !== null) {
    // Add any text before this match
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        phrases.push(...parseTextWithFormatting(beforeText));
      }
    }

    const displayText = match[1];
    const paramString = match[2];

    // Determine if it's a link or an entity
    // Links start with http://, https://, or /
    if (paramString.startsWith('http://') || paramString.startsWith('https://') || paramString.startsWith('/')) {
      // It's a link
      phrases.push({
        type: PhraseType.TEXT,
        value: displayText,
        url: paramString,
      });
    } else {
      // It's an entity - parse metadata
      const metadata = parseEntityMetadata(paramString);
      phrases.push({
        type: PhraseType.ENTITY,
        value: displayText,
        metadata,
      });
    }

    lastIndex = bracketRegex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    const afterText = text.substring(lastIndex);
    if (afterText) {
      phrases.push(...parseTextWithFormatting(afterText));
    }
  }

  return phrases;
}

/**
 * Parses text with inline formatting (bold, italic, underline) into text phrases.
 */
function parseTextWithFormatting(text: string): PhraseSpec[] {
  const phrases: PhraseSpec[] = [];

  // Parse formatting markers: **bold**, *italic*, __underline__
  // We'll process these in order of priority to avoid conflicts

  let currentIndex = 0;
  const textLength = text.length;

  while (currentIndex < textLength) {
    let foundFormatting = false;

    // Check for bold (**text**)
    if (currentIndex + 2 < textLength && text.substring(currentIndex, currentIndex + 2) === '**') {
      const endIndex = text.indexOf('**', currentIndex + 2);
      if (endIndex !== -1) {
        const content = text.substring(currentIndex + 2, endIndex);
        phrases.push({
          type: PhraseType.TEXT,
          value: content,
          bold: true,
        });
        currentIndex = endIndex + 2;
        foundFormatting = true;
      }
    }

    // Check for underline (__text__)
    if (!foundFormatting && currentIndex + 2 < textLength && text.substring(currentIndex, currentIndex + 2) === '__') {
      const endIndex = text.indexOf('__', currentIndex + 2);
      if (endIndex !== -1) {
        const content = text.substring(currentIndex + 2, endIndex);
        phrases.push({
          type: PhraseType.TEXT,
          value: content,
          underline: true,
        });
        currentIndex = endIndex + 2;
        foundFormatting = true;
      }
    }

    // Check for italic (*text*)
    if (!foundFormatting && currentIndex + 1 < textLength && text[currentIndex] === '*') {
      const endIndex = text.indexOf('*', currentIndex + 1);
      if (endIndex !== -1) {
        const content = text.substring(currentIndex + 1, endIndex);
        phrases.push({
          type: PhraseType.TEXT,
          value: content,
          italic: true,
        });
        currentIndex = endIndex + 1;
        foundFormatting = true;
      }
    }

    // If no formatting found, accumulate plain text until next formatting marker
    if (!foundFormatting) {
      let nextMarkerIndex = textLength;
      const markers = ['**', '__', '*'];

      for (const marker of markers) {
        const markerIndex = text.indexOf(marker, currentIndex);
        if (markerIndex !== -1 && markerIndex < nextMarkerIndex) {
          nextMarkerIndex = markerIndex;
        }
      }

      const plainText = text.substring(currentIndex, nextMarkerIndex);
      if (plainText) {
        phrases.push({
          type: PhraseType.TEXT,
          value: plainText,
        });
      }
      currentIndex = nextMarkerIndex;

      // If we're at the end and haven't moved, break to avoid infinite loop
      if (currentIndex === textLength) {
        break;
      }
      if (currentIndex === nextMarkerIndex && nextMarkerIndex === textLength) {
        break;
      }
      // If we found no markers and are not at end, skip one character to avoid infinite loop
      if (nextMarkerIndex === textLength && currentIndex < textLength) {
        currentIndex++;
      }
    }
  }

  return phrases;
}

/**
 * Parses the metadata string from an entity definition.
 * Format: entityType, key1=value1, key2="value2"
 *
 * @param metadataString - The metadata string to parse
 * @returns An EntityMetaData object
 */
function parseEntityMetadata(metadataString: string): EntityMetaData {
  const parts = metadataString.split(',').map((s) => s.trim());

  if (parts.length === 0) {
    throw new Error('Entity must have at least an entityType');
  }

  // First part is the entityType
  const entityType = parts[0] as EntityMetaData['entityType'];
  const metadata: EntityMetaData = {
    entityType,
  };

  // Parse remaining key=value pairs
  for (let i = 1; i < parts.length; i++) {
    const pair = parts[i];
    const eqIndex = pair.indexOf('=');

    if (eqIndex === -1) {
      continue; // Skip invalid pairs
    }

    const key = pair.substring(0, eqIndex).trim();
    let value: string | number | boolean = pair.substring(eqIndex + 1).trim();

    // Parse the value
    // Check if it's a quoted string
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (!isNaN(Number(value))) {
      value = Number(value);
    }

    // Add to metadata
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (metadata as any)[key] = value;
  }

  return metadata;
}
