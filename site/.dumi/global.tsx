/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as G2 from '@antv/g2';
import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * 增加自己的全局变量，用于 DEMO 中的依赖，以 G2 为例
 */
if (typeof window !== 'undefined' && window) {
  (window as any).g2 = extendG2(G2);
  (window as any).globalAdd = (x, y) => x + y;
  (window as any).globalCard = globalCard;
  (window as any).d3Regression = require('d3-regression');
}

// 对 G2 的 Chart 对象进行扩展
// 1. 可以自定义 spec 的展示内容和 key 的排序
// 2. 在 render 的时候触发 spec 事件抛出 spec，用于展示 spec
function extendG2(g2) {
  const { Chart: G2Chart, ...rest } = g2;

  // 这里只是对顶层 key 进行排序，在 G2 中还需要递归排序
  const sortKeys = (options) => {
    const newOptions = sortObject(options);
    return newOptions;
  };

  const sortObject = (
    obj,
    keys = [
      'type',
      'autoFit',
      'theme',
      'width',
      'height',
      'data',
      'encode',
      'transform',
      'scale',
      'coordinate',
      'axis',
      'legend',
      'label',
      'children',
    ].reverse(),
  ) => {
    const autoFit = Object.keys(obj).find((d) => d === 'autoFit');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filter = ([key, _]) => (!autoFit ? true : key === 'width' || key === 'height' ? false : true);
    return Object.fromEntries(
      Object.entries(obj)
        .sort(([a], [b]) => keys.indexOf(b) - keys.indexOf(a))
        .filter(filter),
    );
  };

  class Chart extends G2Chart {
    options() {
      // eslint-disable-next-line prefer-rest-params
      if (arguments.length !== 0) return super.options(...arguments);
      const options = super.options();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, children, key, ...rest } = options;
      const topLevel =
        type === 'view' && Array.isArray(children) && children.length === 1
          ? { ...children[0], ...rest }
          : { type, children, ...rest };
      return sortKeys(topLevel);
    }
    render() {
      // 触发自定义事件
      const event = new CustomEvent('spec', {
        detail: {
          options: this.options(),
        },
      });
      window.dispatchEvent(event);
      return super.render();
    }
  }
  return { ...rest, Chart };
}

function globalCard(text) {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<Card children={undefined}>{text}</Card>);
  return container;
}

function Card({ children }) {
  return (
    <div
      style={{
        width: '100%',
        height: 100,
        background: 'steelblue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}
    >
      <span style={{ color: 'white', fontSize: 30 }}>{children}</span>
    </div>
  );
}
