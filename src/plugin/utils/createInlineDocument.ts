/**
 * add element to original element, this function is used to add element to Phrase element,
 * @param element - element to add, type: HTMLElement, string or number.
 * @param value - original string from spec, type: string, make sure it only contains text node.
 * @param position - position to add element, type: 'suffix' | 'prefix', default: 'suffix'.
 * @returns - new container element, type: HTMLSpanElement.
 * use function `addElement` to add element to original element.
 */
export const createInlineDocument = (
  element: string | number | Element,
  value: string,
  position: 'suffix' | 'prefix' = 'suffix',
): HTMLSpanElement => {
  const span = document.createElement('span');

  const originalElementSpan = value;
  span.textContent = originalElementSpan;

  let newElement: Element | undefined = undefined;

  if (typeof element === 'string' || typeof element === 'number') {
    newElement = document.createElement('span');
    newElement.textContent = element.toString();
  } else {
    newElement = element;
  }

  if (newElement) {
    if (position === 'suffix') {
      span.appendChild(newElement);
    } else {
      span.insertBefore(newElement, span.firstChild);
    }
  }

  return span;
};
