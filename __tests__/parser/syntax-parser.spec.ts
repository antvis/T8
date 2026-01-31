import { describe, expect, it } from 'vitest';
import { parseSyntax } from '../../src/parser/syntax-parser';
import { ParagraphType, PhraseType, BulletsParagraphSpec, TextPhraseSpec } from '../../src/schema';

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
  it('should parse unordered bullet lists', () => {
    const syntax = `
# Features

- First item
- Second item
- Third item
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(2);

    const bulletParagraph = result.sections![0].paragraphs![1];
    expect(bulletParagraph.type).toBe(ParagraphType.BULLETS);
    expect((bulletParagraph as BulletsParagraphSpec).isOrder).toBe(false);
    expect((bulletParagraph as BulletsParagraphSpec).bullets).toHaveLength(3);
    expect((bulletParagraph as BulletsParagraphSpec).bullets[0].phrases[0].value).toBe('First item');
    expect((bulletParagraph as BulletsParagraphSpec).bullets[1].phrases[0].value).toBe('Second item');
    expect((bulletParagraph as BulletsParagraphSpec).bullets[2].phrases[0].value).toBe('Third item');
  });

  it('should parse ordered bullet lists', () => {
    const syntax = `
# Steps

1. First step
2. Second step
3. Third step
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    expect(result.sections![0].paragraphs).toHaveLength(2);

    const bulletParagraph = result.sections![0].paragraphs![1];
    expect(bulletParagraph.type).toBe(ParagraphType.BULLETS);
    expect((bulletParagraph as BulletsParagraphSpec).isOrder).toBe(true);
    expect((bulletParagraph as BulletsParagraphSpec).bullets).toHaveLength(3);
    expect((bulletParagraph as BulletsParagraphSpec).bullets[0].phrases[0].value).toBe('First step');
  });

  it('should parse bold text', () => {
    const syntax = `This is **bold text** in a sentence.`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3);
    expect(phrases[0].value).toBe('This is ');
    expect(phrases[1].value).toBe('bold text');
    expect((phrases[1] as TextPhraseSpec).bold).toBe(true);
    expect(phrases[2].value).toBe(' in a sentence.');
  });

  it('should parse italic text', () => {
    const syntax = `This is *italic text* in a sentence.`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3);
    expect(phrases[1].value).toBe('italic text');
    expect((phrases[1] as TextPhraseSpec).italic).toBe(true);
  });

  it('should parse underline text', () => {
    const syntax = `This is __underlined text__ in a sentence.`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3);
    expect(phrases[1].value).toBe('underlined text');
    expect((phrases[1] as TextPhraseSpec).underline).toBe(true);
  });

  it('should parse links', () => {
    const syntax = `Check out [our website](https://example.com) for more info.`;
    const result = parseSyntax(syntax);

    const phrases = result.sections![0].paragraphs![0].phrases;
    expect(phrases).toHaveLength(3);
    expect(phrases[1].value).toBe('our website');
    expect((phrases[1] as TextPhraseSpec).url).toBe('https://example.com');
  });

  it('should parse entities with formatting in bullet lists', () => {
    const syntax = `
- Revenue: [¥1,000,000](metric_value, origin=1000000)
- **Growth**: [15%](ratio_value, assessment="positive")
`;
    const result = parseSyntax(syntax);

    const bulletParagraph = result.sections![0].paragraphs![0];
    expect(bulletParagraph.type).toBe(ParagraphType.BULLETS);
    expect((bulletParagraph as BulletsParagraphSpec).bullets).toHaveLength(2);

    // First bullet has entity
    const firstBullet = (bulletParagraph as BulletsParagraphSpec).bullets[0];
    expect(firstBullet.phrases.some((p) => p.type === PhraseType.ENTITY)).toBe(true);

    // Second bullet has bold text and entity
    const secondBullet = (bulletParagraph as BulletsParagraphSpec).bullets[1];
    expect(secondBullet.phrases.some((p) => (p as TextPhraseSpec).bold === true)).toBe(true);
    expect(secondBullet.phrases.some((p) => p.type === PhraseType.ENTITY)).toBe(true);
  });

  it('should handle mixed content with lists, formatting, and entities', () => {
    const syntax = `
# Q3 Report

Total revenue reached [¥5M](metric_value, origin=5000000) with **strong growth**.

## Key Metrics

1. Revenue: [¥5M](metric_value)
2. Growth: *up* [25%](ratio_value, assessment="positive")
3. Details at [company site](https://example.com)
`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const paragraphs = result.sections![0].paragraphs!;

    // Check heading
    expect(paragraphs[0].type).toBe(ParagraphType.HEADING1);

    // Check paragraph with entity and bold
    expect(paragraphs[1].type).toBe(ParagraphType.NORMAL);

    // Check subheading
    expect(paragraphs[2].type).toBe(ParagraphType.HEADING2);

    // Check ordered list
    expect(paragraphs[3].type).toBe(ParagraphType.BULLETS);
    expect((paragraphs[3] as BulletsParagraphSpec).isOrder).toBe(true);
    expect((paragraphs[3] as BulletsParagraphSpec).bullets).toHaveLength(3);
  });

  it('should parse entities with array metadata', () => {
    const syntax = `[ranked 1st](rank, detail=[320, 180, 90, 65, 45])`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrase = result.sections![0].paragraphs![0].phrases[0];

    expect(phrase.type).toBe(PhraseType.ENTITY);
    expect(phrase.value).toBe('ranked 1st');
    expect(phrase.metadata?.entityType).toBe('rank');
    expect(phrase.metadata?.detail).toEqual([320, 180, 90, 65, 45]);
  });

  it('should parse entities with object metadata', () => {
    const syntax = `[seasonal peak](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]})`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrase = result.sections![0].paragraphs![0].phrases[0];

    expect(phrase.type).toBe(PhraseType.ENTITY);
    expect(phrase.value).toBe('seasonal peak');
    expect(phrase.metadata?.entityType).toBe('seasonality');
    expect(phrase.metadata?.detail).toEqual({
      data: [80, 90, 95, 135],
      range: [0, 150],
    });
  });

  it('should parse entities with array of objects metadata', () => {
    const syntax = `[strong correlation](association, detail=[{"x":100,"y":105},{"x":120,"y":128}])`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrase = result.sections![0].paragraphs![0].phrases[0];

    expect(phrase.type).toBe(PhraseType.ENTITY);
    expect(phrase.value).toBe('strong correlation');
    expect(phrase.metadata?.entityType).toBe('association');
    expect(phrase.metadata?.detail).toEqual([
      { x: 100, y: 105 },
      { x: 120, y: 128 },
    ]);
  });

  it('should parse entities with mixed metadata types', () => {
    const syntax = `[test value](metric_value, origin=1234567, unit="元", detail=[1,2,3], active=true)`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrase = result.sections![0].paragraphs![0].phrases[0];

    expect(phrase.type).toBe(PhraseType.ENTITY);
    expect(phrase.metadata?.entityType).toBe('metric_value');
    expect(phrase.metadata?.origin).toBe(1234567);
    expect(phrase.metadata?.unit).toBe('元');
    expect(phrase.metadata?.detail).toEqual([1, 2, 3]);
    expect((phrase.metadata as Record<string, unknown>).active).toBe(true);
  });

  it('should handle unclosed bold formatting without infinite loop', () => {
    const syntax = `Text with **unclosed bold at the end`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrases = result.sections![0].paragraphs![0].phrases;

    // Should parse without hanging
    expect(phrases.length).toBeGreaterThan(0);
    expect(phrases[0].value).toBe('Text with ');
    expect(phrases[1].value).toBe('**');
    expect(phrases[2].value).toBe('unclosed bold at the end');
  });

  it('should handle unclosed italic formatting without infinite loop', () => {
    const syntax = `Text with *unclosed italic at the end`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrases = result.sections![0].paragraphs![0].phrases;

    // Should parse without hanging
    expect(phrases.length).toBeGreaterThan(0);
    expect(phrases[0].value).toBe('Text with ');
    expect(phrases[1].value).toBe('*');
    expect(phrases[2].value).toBe('unclosed italic at the end');
  });

  it('should handle unclosed underline formatting without infinite loop', () => {
    const syntax = `Text with __unclosed underline at the end`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrases = result.sections![0].paragraphs![0].phrases;

    // Should parse without hanging
    expect(phrases.length).toBeGreaterThan(0);
    expect(phrases[0].value).toBe('Text with ');
    expect(phrases[1].value).toBe('__');
    expect(phrases[2].value).toBe('unclosed underline at the end');
  });

  it('should handle multiple unclosed formatting markers', () => {
    const syntax = `Text **bold __underline *italic`;
    const result = parseSyntax(syntax);

    expect(result.sections).toHaveLength(1);
    const phrases = result.sections![0].paragraphs![0].phrases;

    // Should parse without hanging and treat all markers as plain text
    expect(phrases.length).toBeGreaterThan(0);
  });

  it('should handle streaming-like partial syntax without infinite loop', () => {
    // This simulates what happens during streaming when text is incrementally added
    const partialChunks = [
      'The **premium segment**',
      'The **premium segment** (devices over $800) showed *remarkable',
      'The **premium segment** (devices over $800) showed *remarkable* [resilience](trend_desc',
    ];

    // Each chunk should parse without infinite loop
    partialChunks.forEach((chunk) => {
      const result = parseSyntax(chunk);
      expect(result.sections).toBeDefined();
    });
  });
});
