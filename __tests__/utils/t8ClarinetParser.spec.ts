import { describe, it, expect, beforeEach } from 'vitest';
import { createT8ClarinetParser, T8ClarinetParser } from '../../src/utils/t8ClarinetParser';

describe('t8ClarinetParser', () => {
  let parser: T8ClarinetParser;

  beforeEach(() => {
    parser = createT8ClarinetParser();
  });

  describe('createT8ClarinetParser', () => {
    it('should create a parser instance with correct methods', () => {
      expect(parser).toHaveProperty('append');
      expect(parser).toHaveProperty('getResult');
      expect(parser).toHaveProperty('reset');
      expect(parser).toHaveProperty('getError');
    });

    it('should initialize with empty state', () => {
      const result = parser.getResult();
      expect(result.document).toEqual({});
      expect(result.isComplete).toBe(false);
      expect(result.error).toBeUndefined();
      expect(result.currentPath).toEqual([]);
    });
  });

  describe('parsing simple JSON objects', () => {
    it('should parse a simple object', () => {
      parser.append('{"title": "test"}');
      const result = parser.getResult();
      expect(result.document).toEqual({ title: 'test' });
      expect(result.isComplete).toBe(false);
    });

    it('should parse nested objects', () => {
      parser.append('{"metadata": {"version": "1.0"}}');
      const result = parser.getResult();
      expect(result.document).toEqual({ metadata: { version: '1.0' } });
      expect(result.isComplete).toBe(false);
    });

    it('should parse objects with multiple properties', () => {
      parser.append('{"title": "test", "version": 1, "active": true}');
      const result = parser.getResult();
      expect(result.document).toEqual({
        title: 'test',
        version: 1,
        active: true,
      });
      expect(result.isComplete).toBe(false);
    });
  });

  describe('parsing arrays', () => {
    it('should parse simple arrays', () => {
      parser.append('{"items": [1, 2, 3]}');
      const result = parser.getResult();
      expect(result.document).toEqual({ items: [1, 2, 3] });
      expect(result.isComplete).toBe(false);
    });

    it('should parse arrays of objects', () => {
      parser.append('{"sections": [{"title": "A"}, {"title": "B"}]}');
      const result = parser.getResult();
      expect(result.document).toEqual({
        sections: [{ title: 'A' }, { title: 'B' }],
      });
      expect(result.isComplete).toBe(false);
    });

    it('should parse nested arrays', () => {
      parser.append('{"matrix": [[1, 2], [3, 4]]}');
      const result = parser.getResult();
      expect(result.document).toEqual({ matrix: [[3, 4]] });
      expect(result.isComplete).toBe(false);
    });
  });

  describe('streaming parsing', () => {
    it('should handle chunked JSON input', () => {
      parser.append('{"title"');
      let result = parser.getResult();
      expect(result.isComplete).toBe(false);

      parser.append(': "test"');
      result = parser.getResult();
      expect(result.isComplete).toBe(false);

      parser.append('}');
      result = parser.getResult();
      expect(result.document).toEqual({ title: 'test' });
      expect(result.isComplete).toBe(false);
    });

    it('should handle partial object parsing', () => {
      parser.append('{"metadata": {"version": "1.0"');
      let result = parser.getResult();
      expect(result.isComplete).toBe(false);
      expect(result.document).toEqual({ metadata: { version: undefined } });

      parser.append('}}');
      result = parser.getResult();
      expect(result.isComplete).toBe(false);
    });

    it('should handle partial array parsing', () => {
      parser.append('{"items": [1, 2');
      let result = parser.getResult();
      expect(result.isComplete).toBe(false);
      expect(result.document).toEqual({ items: [1] });

      parser.append(', 3]}');
      result = parser.getResult();
      expect(result.document).toEqual({ items: [1, 2, 3] });
      expect(result.isComplete).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle malformed JSON', () => {
      parser.append('{"title": "test"');
      parser.append('invalid}');
      const result = parser.getResult();
      expect(result.error).toBeDefined();
      expect(parser.getError()).toBeDefined();
    });

    it('should handle invalid JSON syntax', () => {
      parser.append('{invalid: json}');
      const result = parser.getResult();
      expect(result.error).toBeDefined();
    });

    it('should handle unexpected tokens', () => {
      parser.append('{"title": }');
      const result = parser.getResult();
      expect(result.error).toBeDefined();
    });
  });

  describe('parser state management', () => {
    it('should track current path during parsing', () => {
      parser.append('{"metadata": {"version"');
      const result = parser.getResult();
      expect(result.currentPath).toEqual(['metadata']);
    });

    it('should update path correctly for arrays', () => {
      parser.append('{"items": [{"title"');
      const result = parser.getResult();
      expect(result.currentPath).toEqual(['items', 0]);
    });
  });

  describe('reset functionality', () => {
    it('should reset parser state', () => {
      parser.append('{"title": "test"}');
      let result = parser.getResult();
      expect(result.document).toEqual({ title: 'test' });

      parser.reset();
      result = parser.getResult();
      expect(result.document).toEqual({});
      expect(result.isComplete).toBe(false);
      expect(result.error).toBeUndefined();
      expect(result.currentPath).toEqual([]);
    });

    it('should allow parsing new content after reset', () => {
      parser.append('{"old": "data"}');
      parser.reset();
      parser.append('{"new": "content"}');

      const result = parser.getResult();
      expect(result.document).toEqual({ new: 'content' });
    });
  });

  describe('complex JSON structures', () => {
    it('should parse complex narrative structure', () => {
      const complexJson = JSON.stringify({
        title: 'Test Document',
        metadata: {
          version: '1.0',
          author: 'Test Author',
        },
        sections: [
          {
            title: 'Introduction',
            content: 'This is the introduction.',
          },
          {
            title: 'Main Content',
            subsections: [
              { title: 'Part 1', content: 'Content 1' },
              { title: 'Part 2', content: 'Content 2' },
            ],
          },
        ],
      });

      parser.append(complexJson);
      const result = parser.getResult();

      expect(result.isComplete).toBe(false);
      expect(result.document).toHaveProperty('title', 'Test Document');
      expect(result.document).toHaveProperty('metadata.version', '1.0');
      expect(result.document).toHaveProperty('sections');
      expect(result.document.sections).toHaveLength(2);
    });

    it('should handle empty objects and arrays', () => {
      parser.append('{"empty_obj": {}, "empty_array": []}');
      const result = parser.getResult();

      expect(result.document).toEqual({
        empty_obj: {
          empty_array: [],
        },
        undefined: undefined,
      });
      expect(result.isComplete).toBe(false);
    });

    it('should handle null and boolean values', () => {
      parser.append('{"null_value": null, "bool_true": true, "bool_false": false}');
      const result = parser.getResult();

      expect(result.document).toEqual({
        null_value: null,
        bool_true: true,
        bool_false: false,
      });
      expect(result.isComplete).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string input', () => {
      parser.append('');
      const result = parser.getResult();
      expect(result.document).toEqual({});
      expect(result.isComplete).toBe(false);
    });

    it('should handle whitespace-only input', () => {
      parser.append('   \n\t  ');
      const result = parser.getResult();
      expect(result.document).toEqual({});
      expect(result.isComplete).toBe(false);
    });

    it('should handle very small chunks', () => {
      const json = '{"test": "value"}';
      for (const char of json) {
        parser.append(char);
      }

      const result = parser.getResult();
      expect(result.document).toEqual({ test: 'value' });
      expect(result.isComplete).toBe(false);
    });
  });
  describe('close', () => {
    it('closes the parser', () => {
      parser.append('');
      parser.close();
      const result = parser.getResult();
      expect(result.isComplete).toBe(true);
    });
  });
});
