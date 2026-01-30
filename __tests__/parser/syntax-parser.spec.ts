import { describe, expect, it } from 'vitest';
import { parseSyntax } from '../../src/parser/syntax-parser';
import { ParagraphType, PhraseType } from '../../src/schema';

describe('T8 Syntax Parser', () => {
  it('should parse headings of different levels', () => {
    const syntax = `
# Heading 1
## Heading 2
### Heading 3
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(3);

    expect(result.sections![0].paragraphs![0].type).toBe(ParagraphType.HEADING1);
    expect(result.sections![0].paragraphs![0].phrases[0].type).toBe(PhraseType.TEXT);
    expect(result.sections![0].paragraphs![0].phrases[0].value).toBe('Heading 1');

    expect(result.sections![0].paragraphs![1].type).toBe(ParagraphType.HEADING2);
    expect(result.sections![0].paragraphs![1].phrases[0].value).toBe('Heading 2');

    expect(result.sections![0].paragraphs![2].type).toBe(ParagraphType.HEADING3);
    expect(result.sections![0].paragraphs![2].phrases[0].value).toBe('Heading 3');
  });

  it('should parse paragraphs separated by blank lines', () => {
    const syntax = `
First paragraph with some text.

Second paragraph with more text.
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(2);

    expect(result.sections![0].paragraphs![0].type).toBe(ParagraphType.NORMAL);
    expect(result.sections![0].paragraphs![0].phrases[0].value).toBe('First paragraph with some text.');

    expect(result.sections![0].paragraphs![1].type).toBe(ParagraphType.NORMAL);
    expect(result.sections![0].paragraphs![1].phrases[0].value).toBe('Second paragraph with more text.');
  });

  it('should parse simple entities without metadata', () => {
    const syntax = `The metric is [¥800,000](metric_value).`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(1);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3); // "The metric is ", entity, "."

    expect(phrases[0].type).toBe(PhraseType.TEXT);
    expect(phrases[0].value).toBe('The metric is ');

    expect(phrases[1].type).toBe(PhraseType.ENTITY);
    expect(phrases[1].value).toBe('¥800,000');
    expect(phrases[1].metadata?.entityType).toBe('metric_value');

    expect(phrases[2].type).toBe(PhraseType.TEXT);
    expect(phrases[2].value).toBe('.');
  });

  it('should parse entities with metadata key-value pairs', () => {
    const syntax = `The value is [¥1,234,567](metric_value, origin=1234567, unit="元").`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3); // "The value is ", entity, "."

    expect(phrases[1].type).toBe(PhraseType.ENTITY);
    expect(phrases[1].value).toBe('¥1,234,567');
    expect(phrases[1].metadata?.entityType).toBe('metric_value');
    expect(phrases[1].metadata?.origin).toBe(1234567);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((phrases[1].metadata as any).unit).toBe('元');
  });

  it('should parse entities with assessment metadata', () => {
    const syntax = `占比 [64.8%](contribute_ratio, assessment="positive")。`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3); // "占比 ", entity, "。"

    expect(phrases[1].type).toBe(PhraseType.ENTITY);
    expect(phrases[1].value).toBe('64.8%');
    expect(phrases[1].metadata?.entityType).toBe('contribute_ratio');
    expect(phrases[1].metadata?.assessment).toBe('positive');
  });

  it('should parse complex document with headings, paragraphs, and entities', () => {
    const syntax = `
# 2026年第一季度销售报告

本季度总销售额为 [¥1,234,567](metric_value, origin=1234567, unit="元")，表现出色。

## 各地区表现

华东地区贡献最大，销售额为 [¥800,000](metric_value)，占比 [64.8%](contribute_ratio, assessment="positive")。
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(4);

    // First heading
    expect(result.sections![0].paragraphs![0].type).toBe(ParagraphType.HEADING1);
    expect(result.sections![0].paragraphs![0].phrases[0].value).toBe('2026年第一季度销售报告');

    // First paragraph
    expect(result.sections![0].paragraphs![1].type).toBe(ParagraphType.NORMAL);
    const para1Phrases = result.sections![0].paragraphs![1].phrases;
    expect(para1Phrases[1].type).toBe(PhraseType.ENTITY);
    expect(para1Phrases[1].value).toBe('¥1,234,567');
    expect(para1Phrases[1].metadata?.entityType).toBe('metric_value');
    expect(para1Phrases[1].metadata?.origin).toBe(1234567);

    // Second heading
    expect(result.sections![0].paragraphs![2].type).toBe(ParagraphType.HEADING2);
    expect(result.sections![0].paragraphs![2].phrases[0].value).toBe('各地区表现');

    // Second paragraph
    expect(result.sections![0].paragraphs![3].type).toBe(ParagraphType.NORMAL);
    const para2Phrases = result.sections![0].paragraphs![3].phrases;
    expect(para2Phrases.filter((p) => p.type === PhraseType.ENTITY)).toHaveLength(2);
  });

  it('should handle multi-line paragraphs', () => {
    const syntax = `
This is a paragraph
that spans multiple
lines of text.

This is another paragraph.
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(2);

    expect(result.sections![0].paragraphs![0].phrases[0].value).toContain('This is a paragraph');
    expect(result.sections![0].paragraphs![0].phrases[0].value).toContain('that spans multiple');
    expect(result.sections![0].paragraphs![0].phrases[0].value).toContain('lines of text.');
  });

  it('should parse entities with boolean values', () => {
    const syntax = `Test [value](metric_value, active=true, disabled=false).`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    const entity = phrases[1];

    expect(entity.type).toBe(PhraseType.ENTITY);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((entity.metadata as any).active).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((entity.metadata as any).disabled).toBe(false);
  });

  it('should handle empty input', () => {
    const syntax = '';
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(0);
  });

  it('should handle input with only blank lines', () => {
    const syntax = '\n\n\n';
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(0);
  });

  it('should parse entities in headings', () => {
    const syntax = `# Sales Report: [¥1,000,000](metric_value)`;
    const result = parseSyntax(syntax);

    expect(result.sections![0].paragraphs![0].type).toBe(ParagraphType.HEADING1);
    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(2);
    expect(phrases[0].type).toBe(PhraseType.TEXT);
    expect(phrases[1].type).toBe(PhraseType.ENTITY);
    expect(phrases[1].value).toBe('¥1,000,000');
  });
});
