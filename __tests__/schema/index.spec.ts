import { describe, it, expect } from 'vitest';
import {
  isCustomSection,
  isCustomParagraph,
  isStandardSection,
  isTextParagraph,
  isBulletParagraph,
  isHeadingParagraph,
  isCustomPhrase,
  isEntityPhrase,
  isTextPhrase,
  getHeadingWeight,
  ParagraphType,
  PhraseType,
} from '../../src/schema';

describe('Schema Type Guards', () => {
  describe('isCustomSection', () => {
    it('should return true for custom section', () => {
      const spec = { customType: 'myCustom' };
      expect(isCustomSection(spec)).toBe(true);
    });

    it('should return false for standard section', () => {
      const spec = { paragraphs: [] };
      expect(isCustomSection(spec)).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(isCustomSection(null)).toBe(false);
      expect(isCustomSection(undefined)).toBe(false);
    });
  });

  describe('isCustomParagraph', () => {
    it('should return true for custom paragraph', () => {
      const spec = { customType: 'myCustomParagraph' };
      expect(isCustomParagraph(spec)).toBe(true);
    });

    it('should return false for standard paragraph', () => {
      const spec = { type: ParagraphType.NORMAL, phrases: [] };
      // @ts-expect-error for testing purpose
      expect(isCustomParagraph(spec)).toBe(false);
    });
  });

  describe('isStandardSection', () => {
    it('should return true for standard section with paragraphs array', () => {
      const spec = { paragraphs: [] };
      expect(isStandardSection(spec)).toBe(true);
    });

    it('should return false for custom section', () => {
      const spec = { customType: 'custom' };
      expect(isStandardSection(spec)).toBe(false);
    });

    it('should return false when paragraphs is not array', () => {
      const spec = { paragraphs: 'not-array' };
      // @ts-expect-error for testing purpose
      expect(isStandardSection(spec)).toBe(false);
    });
  });

  describe('isTextParagraph', () => {
    it('should return true for text paragraph', () => {
      const spec = { type: ParagraphType.NORMAL, phrases: [] };
      // @ts-expect-error for testing purpose
      expect(isTextParagraph(spec)).toBe(true);
    });

    it('should return false for bullet paragraph', () => {
      const spec = { type: ParagraphType.BULLETS, bullets: [] };
      // @ts-expect-error for testing purpose
      expect(isTextParagraph(spec)).toBe(false);
    });

    it('should return false when phrases is not array', () => {
      const spec = { type: ParagraphType.NORMAL, phrases: 'not-array' };
      // @ts-expect-error for testing purpose
      expect(isTextParagraph(spec)).toBe(false);
    });
  });

  describe('isBulletParagraph', () => {
    it('should return true for bullet paragraph', () => {
      const spec = { type: ParagraphType.BULLETS, bullets: [] };
      // @ts-expect-error for testing purpose
      expect(isBulletParagraph(spec)).toBe(true);
    });

    it('should return false for text paragraph', () => {
      const spec = { type: ParagraphType.NORMAL, phrases: [] };
      // @ts-expect-error for testing purpose
      expect(isBulletParagraph(spec)).toBe(false);
    });

    it('should return false when bullets is not array', () => {
      const spec = { type: ParagraphType.BULLETS, bullets: 'not-array' };
      // @ts-expect-error for testing purpose
      expect(isBulletParagraph(spec)).toBe(false);
    });
  });

  describe('isHeadingParagraph', () => {
    it('should return true for valid heading types', () => {
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'heading1' })).toBe(true);
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'heading2' })).toBe(true);
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'heading6' })).toBe(true);
    });

    it('should return false for invalid heading weights', () => {
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'heading0' })).toBe(false);
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'heading7' })).toBe(false);
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'headingX' })).toBe(false);
    });

    it('should return false for non-heading types', () => {
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: ParagraphType.NORMAL })).toBe(false);
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 'not-heading' })).toBe(false);
    });

    it('should return false for invalid inputs', () => {
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({})).toBe(false);
      // @ts-expect-error for testing purpose
      expect(isHeadingParagraph({ type: 123 })).toBe(false);
      expect(isHeadingParagraph(null)).toBe(false);
    });
  });

  describe('isCustomPhrase', () => {
    it('should return true for custom phrase with customType', () => {
      const spec = { type: PhraseType.CUSTOM, metadata: { customType: 'myCustom' } };
      // @ts-expect-error for testing purpose
      expect(isCustomPhrase(spec)).toBe(true);
    });

    it('should return false for custom phrase without customType', () => {
      const spec = { type: PhraseType.CUSTOM, metadata: {} };
      // @ts-expect-error for testing purpose
      expect(isCustomPhrase(spec)).toBe(false);
    });

    it('should return false for non-custom phrase', () => {
      const spec = { type: PhraseType.TEXT, metadata: { customType: 'test' } };
      // @ts-expect-error for testing purpose
      expect(isCustomPhrase(spec)).toBe(false);
    });
  });

  describe('isEntityPhrase', () => {
    it('should return true for valid entity phrase', () => {
      const spec = { type: PhraseType.ENTITY, metadata: { entityType: 'metric_name' } };
      // @ts-expect-error for testing purpose
      expect(isEntityPhrase(spec)).toBe(true);
    });

    it('should return false for entity phrase without entityType', () => {
      const spec = { type: PhraseType.ENTITY, metadata: {} };
      // @ts-expect-error for testing purpose
      expect(isEntityPhrase(spec)).toBe(false);
    });

    it('should return false for invalid entity type', () => {
      const spec = { type: PhraseType.ENTITY, metadata: { entityType: 'INVALID' } };
      // @ts-expect-error for testing purpose
      expect(isEntityPhrase(spec)).toBe(false);
    });

    it('should return false for non-entity phrase', () => {
      const spec = { type: PhraseType.TEXT, metadata: { entityType: 'PERSON' } };
      // @ts-expect-error for testing purpose
      expect(isEntityPhrase(spec)).toBe(false);
    });
  });

  describe('isTextPhrase', () => {
    it('should return true for text phrase', () => {
      const spec = { type: PhraseType.TEXT };
      // @ts-expect-error for testing purpose
      expect(isTextPhrase(spec)).toBe(true);
    });

    it('should return false for non-text phrase', () => {
      const spec = { type: PhraseType.ENTITY };
      // @ts-expect-error for testing purpose
      expect(isTextPhrase(spec)).toBe(false);
    });
  });

  describe('getHeadingWeight', () => {
    it('should return correct weight for valid heading types', () => {
      expect(getHeadingWeight('heading1')).toBe(1);
      expect(getHeadingWeight('heading2')).toBe(2);
      expect(getHeadingWeight('heading6')).toBe(6);
    });

    it('should return NaN for invalid heading weights', () => {
      expect(getHeadingWeight('heading0')).toBeNaN();
      expect(getHeadingWeight('heading7')).toBeNaN();
      expect(getHeadingWeight('headingX')).toBeNaN();
    });

    it('should return NaN for non-heading types', () => {
      expect(getHeadingWeight('normal')).toBeNaN();
      expect(getHeadingWeight('bullets')).toBeNaN();
      expect(getHeadingWeight('')).toBeNaN();
    });

    it('should return NaN for null/undefined', () => {
      expect(getHeadingWeight(null)).toBeNaN();
      expect(getHeadingWeight(undefined)).toBeNaN();
    });
  });
});
