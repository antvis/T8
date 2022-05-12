import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-ignore
      'wsc-proportion': global.HTMLElementTagNameMap['wsc-proportion'];
    }
  }
}
