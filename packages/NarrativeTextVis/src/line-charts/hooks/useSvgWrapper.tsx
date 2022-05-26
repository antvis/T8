import React, { useRef, useState, useLayoutEffect } from 'react';
import { getElementFontSize } from './getElementFontSize';

type SvgReactFC = React.FC<React.SVGProps<SVGSVGElement>>;

export const useSvgWrapper = () => {
  const ele = useRef(null);
  const [size, setSize] = useState<number>();
  useLayoutEffect(() => {
    if (ele.current) {
      setSize(getElementFontSize(ele.current, 14));
    }
  }, []);
  const Svg: SvgReactFC = ({ children, ...otherProps }) => {
    return (
      <svg
        style={{
          margin: '0px 4px',
          transform: 'translate(0px, 0.125em)',
        }}
        ref={ele}
        {...otherProps}
      >
        {children}
      </svg>
    );
  };
  return [Svg, size] as [SvgReactFC, number];
};
