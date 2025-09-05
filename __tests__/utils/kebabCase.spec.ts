import { kebabCase } from '../../src/utils/kebabCase';

describe('kebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(kebabCase('camelCase')).toBe('camel-case');
    expect(kebabCase('myVariableName')).toBe('my-variable-name');
  });

  it('should convert PascalCase to kebab-case', () => {
    expect(kebabCase('PascalCase')).toBe('pascal-case');
    expect(kebabCase('MyComponentName')).toBe('my-component-name');
  });

  it('should handle single words', () => {
    expect(kebabCase('HelloWord')).toBe('hello-word');
    expect(kebabCase('word')).toBe('word');
    expect(kebabCase('Word')).toBe('word');
  });

  it('should handle empty string', () => {
    expect(kebabCase('')).toBe('');
  });

  it('should handle strings with numbers', () => {
    expect(kebabCase('version2Name')).toBe('version2-name');
    expect(kebabCase('html5Parser')).toBe('html5-parser');
  });

  it('should handle already kebab-case strings', () => {
    expect(kebabCase('kebab-case')).toBe('kebab-case');
    expect(kebabCase('already-kebab')).toBe('already-kebab');
  });

  it('should handle strings with spaces', () => {
    expect(kebabCase('hello world')).toBe('hello world');
    expect(kebabCase('multiple word string')).toBe('multiple word string');
  });
});
