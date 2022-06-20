import React from 'react';
import { Tooltip, TooltipProps } from 'antd';
import { POP_TOOLBAR_CLS } from '../../globalStyles';

export const PopToolbar: React.FC<TooltipProps> = ({ children, placement, ...tooltipProps }) => {
  return (
    <Tooltip
      autoAdjustOverflow={false}
      trigger="hover"
      placement="bottomLeft"
      overlayClassName={POP_TOOLBAR_CLS}
      {...tooltipProps}
    >
      {children}
    </Tooltip>
  );
};
