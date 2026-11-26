import { isNil } from '../utils';

export type Child = Node | string | number | null | undefined | false | Child[];

export type DomProps = {
  className?: string;
  style?: Record<string, string | number | undefined>;
  [key: string]: unknown;
};

const UNITLESS_STYLE = /^(lineHeight|zIndex|opacity|fontWeight|flex\w*|order|zoom)$/;

function appendChildren(el: Node, children: Child[]) {
  children.forEach((child) => {
    if (Array.isArray(child)) appendChildren(el, child);
    else if (child instanceof Node) el.appendChild(child);
    else if (!isNil(child) && child !== false) el.appendChild(document.createTextNode(String(child)));
  });
}

/**
 * Create a DOM element.
 * `onXxx` props are bound as event listeners, `style` numbers get a `px` unit unless they are unitless.
 */
export function h(tag: string, props: DomProps | null, ...children: Child[]): HTMLElement {
  const el = document.createElement(tag);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (isNil(value)) return;
    if (key === 'style') {
      Object.entries(value as NonNullable<DomProps['style']>).forEach(([name, v]) => {
        if (isNil(v)) return;
        (el.style as unknown as Record<string, string>)[name] =
          typeof v === 'number' && !UNITLESS_STYLE.test(name) ? `${v}px` : String(v);
      });
    } else if (key === 'className') {
      el.className = value as string;
    } else if (/^on[A-Z]/.test(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    } else {
      el.setAttribute(key, String(value));
    }
  });

  appendChildren(el, children);
  return el;
}
