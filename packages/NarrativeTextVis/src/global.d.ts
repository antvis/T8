import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wsc-proportion': global.HTMLElementTagNameMap['wsc-proportion'];
    }
  }
}
