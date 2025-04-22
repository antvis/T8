function isOrContains(node: Node | null, container: HTMLElement) {
  while (node) {
    if (node === container) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
/**
 * check if the selection is inside the element
 */
export function elementContainsSelection(el: HTMLElement) {
  let sel: Selection | null;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel?.rangeCount > 0) {
      for (let i = 0; i < sel?.rangeCount; i += 1) {
        if (!isOrContains(sel?.getRangeAt(i)?.commonAncestorContainer, el)) {
          return false;
        }
      }
      return true;
    }
    // @ts-expect-error when window.getSelection is undefined, sel is null
  } else if ((sel = document?.selection) && sel?.type !== 'Control') {
    // @ts-expect-error when window.getSelection is undefined, sel is null
    return isOrContains(sel?.createRange()?.parentElement(), el);
  }
  return false;
}
