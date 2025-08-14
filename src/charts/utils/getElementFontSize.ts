/**
 * Default font size in pixels to use as fallback
 */
export const DEFAULT_FONT_SIZE = 14;

/**
 * Gets the computed style value for an element
 * Compatible with both modern browsers and IE
 *
 * @param ele - DOM element to get style from
 * @param style - CSS property name to retrieve
 * @returns The computed style value as a string, or undefined if not available
 */
function getStyle(ele: Element, style: string): string | undefined {
  // @ts-expect-error currentStyle for IE
  return window.getComputedStyle ? window.getComputedStyle(ele, null)[style] : ele?.currentStyle?.[style];
}

/**
 * Checks if a CSS size value is in absolute pixels (px)
 *
 * @param str - CSS size value to check
 * @returns boolean indicating if the value is in pixels
 */
function isAbsoluteUnitPx(str: string | undefined): boolean | undefined {
  return str?.endsWith('px');
}

/**
 * Extracts the numeric value from a pixel measurement
 *
 * @param str - CSS size value in px format (e.g. "14px")
 * @returns The numeric value without units, or undefined if conversion fails
 */
function getPxNumber(str: string): number | undefined {
  const removeUnit = str.replace(/px$/, '');
  const resultNumber = Number(removeUnit);
  if (!Number.isNaN(resultNumber)) return resultNumber;
  return undefined;
}

/**
 * Gets the font size of an element in pixels
 *
 * First tries to get the font-size of the element itself,
 * then falls back to the body's font-size, and finally
 * uses the default size if neither is available in px.
 *
 * @param ele - The DOM element to get font size from
 * @param defaultSize - Default size to use as fallback
 * @returns Font size in pixels
 */
export function getElementFontSize(ele: Element, defaultSize = DEFAULT_FONT_SIZE): number {
  const FONT_SIZE = 'font-size';
  // Try to get font size from the element
  const eleFontSizeStr = getStyle(ele, FONT_SIZE);
  if (eleFontSizeStr && isAbsoluteUnitPx(eleFontSizeStr)) {
    const px = getPxNumber(eleFontSizeStr);
    if (px) return px;
  }
  // Fall back to body font size
  const bodyFontSizeStr = getStyle(window.document.body, FONT_SIZE);
  if (bodyFontSizeStr && isAbsoluteUnitPx(bodyFontSizeStr)) {
    const px = getPxNumber(bodyFontSizeStr);
    if (px) return px;
  }
  // Use default as last resort
  return defaultSize;
}
