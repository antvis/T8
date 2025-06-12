/**
 * add element to original element, this function is used to add element to Phrase element,
 * @param element - element to add, type: HTMLElement, string or number.
 * @param value - original string from spec, type: string, make sure it only contains text node.
 * @param position - position to add element, type: 'suffix' | 'prefix', default: 'suffix'.
 * @returns - new container element, type: HTMLSpanElement.
 * use function `addElement` to add element to original element.
 */
export const createDocumentFragment = (
  element: HTMLElement | string | number,
  value: string,
  position: 'suffix' | 'prefix' = 'suffix',
): DocumentFragment => {
  const fragment = document.createDocumentFragment();

  const originalElementSpan = value;
  fragment.textContent = originalElementSpan;

  let newElement: HTMLElement | undefined = undefined;

  if (typeof element === 'string' || typeof element === 'number') {
    newElement = document.createElement('span');
    newElement.textContent = element.toString();
  } else {
    newElement = element;
  }

  if (newElement) {
    if (position === 'suffix') {
      fragment.appendChild(newElement);
    } else {
      fragment.insertBefore(newElement, fragment.firstChild);
    }
  }

  return fragment;
};
