import { describe, it, expect } from 'vitest';
import { classnames } from '../../src/utils/classnames';

describe('classnames', () => {
  it('should return empty string when no arguments provided', () => {
    expect(classnames()).toBe('');
  });

  it('should return single class name', () => {
    expect(classnames('foo')).toBe('foo');
  });

  it('should concatenate multiple class names', () => {
    expect(classnames('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('should filter out empty strings', () => {
    expect(classnames('foo', '', 'bar')).toBe('foo bar');
  });

  it('should filter out undefined values', () => {
    expect(classnames('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('should filter out null values', () => {
    expect(classnames('foo', null, 'bar')).toBe('foo bar');
  });

  it('should handle only empty/falsy values', () => {
    expect(classnames('', null, undefined)).toBe('');
  });

  it('should handle mixed valid and invalid values', () => {
    expect(classnames('valid', '', 'another', null, 'last')).toBe('valid another last');
  });

  it('should trim leading space when first value is empty', () => {
    expect(classnames('', 'foo', 'bar')).toBe('foo bar');
  });
});
