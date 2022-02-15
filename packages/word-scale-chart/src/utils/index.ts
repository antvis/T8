import { select } from 'd3-selection';

export function removeAllChildren(container: HTMLSpanElement) {
  select(container).selectAll('*').remove();
}

function getStyle(ele: Element, style: string): string | undefined {
  // @ts-ignore currentStyle for IE
  return window.getComputedStyle ? window.getComputedStyle(ele, null)[style] : ele?.currentStyle?.[style];
}

function isAbsoluteUnitPx(str: string | undefined): boolean {
  return str?.endsWith('px');
}

function getPxNumber(str: string): number | undefined {
  const removeUnit = str.replace(/px$/, '');
  const resultNumber = Number(removeUnit);
  if (!Number.isNaN(resultNumber)) return resultNumber;
  return undefined;
}

export function getElementFontSize(ele: Element, defaultSize?: 14): number {
  const FONT_SIZE = 'font-size';
  const eleFontSizeStr = getStyle(ele, FONT_SIZE);
  if (isAbsoluteUnitPx(eleFontSizeStr) && getPxNumber(eleFontSizeStr)) {
    return getPxNumber(eleFontSizeStr);
  }
  const bodyFontSizeStr = getStyle(window.document.body, FONT_SIZE);
  if (isAbsoluteUnitPx(bodyFontSizeStr) && getPxNumber(bodyFontSizeStr)) {
    return getPxNumber(bodyFontSizeStr);
  }
  return defaultSize;
}
