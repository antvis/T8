import { NarrativeTextSpec, ParagraphSpec, ParagraphType, PhraseSpec, PhraseType, EntityMetaData } from '../schema';

/**
 * Parses a T8-DSL string into a NarrativeTextSpec object.
 *
 * The DSL supports:
 * - Markdown-style headings (# to ######)
 * - Paragraphs (text separated by blank lines)
 * - Entity syntax: [displayText](entityType, key1=value1, key2="value2")
 *
 * @param dslString - The DSL string to parse
 * @returns A NarrativeTextSpec object
 */
export function parseDSL(dslString: string): NarrativeTextSpec {
  const lines = dslString.split('\n');
  const sections: { paragraphs: ParagraphSpec[] }[] = [];
  const currentParagraphs: ParagraphSpec[] = [];
  let currentParagraphLines: string[] = [];

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
      // Flush any accumulated paragraph
      flushParagraph();

      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const phrases = parseInlineContent(content);

      const headingType = `heading${level}` as ParagraphType;
      currentParagraphs.push({
        type: headingType,
        phrases,
      });
    } else if (trimmedLine === '') {
      // Blank line - flush current paragraph
      flushParagraph();
    } else {
      // Regular text line - accumulate
      currentParagraphLines.push(line);
    }
  }

  // Flush any remaining paragraph
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
 * Parses inline content (text with entity markers) into an array of PhraseSpec.
 * Handles the [displayText](entityType, key1=value1, key2="value2") syntax.
 */
function parseInlineContent(text: string): PhraseSpec[] {
  const phrases: PhraseSpec[] = [];

  // Regex to match entity syntax: [displayText](entityType, key1=value1, key2="value2")
  // This regex captures:
  // 1. The display text in square brackets
  // 2. The entity type and metadata in parentheses
  const entityRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = entityRegex.exec(text)) !== null) {
    // Add any text before this entity
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        phrases.push({
          type: PhraseType.TEXT,
          value: beforeText,
        });
      }
    }

    // Parse the entity
    const displayText = match[1];
    const metadataString = match[2];

    // Parse metadata
    const metadata = parseEntityMetadata(metadataString);

    phrases.push({
      type: PhraseType.ENTITY,
      value: displayText,
      metadata,
    });

    lastIndex = entityRegex.lastIndex;
  }

  // Add any remaining text after the last entity
  if (lastIndex < text.length) {
    const afterText = text.substring(lastIndex);
    if (afterText) {
      phrases.push({
        type: PhraseType.TEXT,
        value: afterText,
      });
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
