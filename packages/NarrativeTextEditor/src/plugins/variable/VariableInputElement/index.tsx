import React from 'react';
import { getHandler } from '@udecode/plate-core';
import { getRootProps, StyledElementProps } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import styled from 'styled-components';
import { VariableNode, VariableNodeData } from '../types';

interface VariableInputElementStyleProps extends VariableInputElementProps {
  selected?: boolean;
  focused?: boolean;
}

const StyledVariableElement = styled.span<VariableInputElementStyleProps>`
  margin: 0px 1px;
  vertical-align: baseline;
  display: inline-block;
  padding: 0px 2px;
  border-radius: 2px;
  background-color: rgba(242, 241, 237, 1);
  min-width: 96px;
  position: relative;
  ::before {
    content: '输入搜索...';
    position: absolute;
    left: 4px;
    top: 0;
    opacity: 0.25;
  }
`;

// renderElement props
export interface VariableInputElementProps extends Omit<StyledElementProps<VariableNode>, 'onClick'> {
  /**
   * Prefix rendered before variable
   */
  prefix?: string;
  onClick?: (variableNode: VariableNode) => void;
  renderLabel?: (variableable: VariableNodeData) => string;
}

export const VariableInputElement = (props: VariableInputElementProps) => {
  const { attributes, children, nodeProps, element, onClick } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();

  return (
    <StyledVariableElement
      {...attributes}
      data-slate-value={element.value}
      onClick={getHandler(onClick, element)}
      selected={selected}
      focused={focused}
      {...rootProps}
      {...nodeProps}
    >
      {children}
    </StyledVariableElement>
  );
};
