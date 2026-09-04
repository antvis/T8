import { Selection } from './selection';

/**
 * Creates an SVG element with proper styling and appends it to a container
 *
 * @param container - The container element to append SVG to
 * @param width - SVG width
 * @param height - SVG height
 * @returns Selection object for the created SVG
 */
export const createSvg = (container: Element, width: number, height: number): Selection => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.margin = '0px 4px';

  // The container is a wrapper span between the outer inline-flex phrase span and this svg.
  // Make it a centering flex box as well, so the svg is centered against the text instead of
  // sitting on the baseline of its own line box.
  if (container instanceof HTMLElement) {
    container.style.display = 'inline-flex';
    container.style.alignItems = 'center';
  }

  svg.setAttribute('height', String(height));
  svg.setAttribute('width', String(width));

  container.appendChild(svg);
  return new Selection(svg);
};
