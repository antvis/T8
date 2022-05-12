import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wsc-proportion': global.HTMLElementTagNameMap['wsc-proportion'];
      'wsc-line': global.HTMLElementTagNameMap['wsc-line'];
    }
  }
}
