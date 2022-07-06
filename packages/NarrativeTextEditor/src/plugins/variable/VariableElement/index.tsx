import React from 'react';
import { getHandler, Value } from '@udecode/plate-core';
import { getRootProps, StyledElementProps } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import styled from 'styled-components';
import { Phrase } from '@antv/narrative-text-vis';
import { VariableNode, VariableNodeData } from '../types';

interface VariableElementStyleProps<V extends Value> extends VariableElementProps<V> {
  selected?: boolean;
  focused?: boolean;
}

const StyledVariableElement = styled.span<VariableElementStyleProps<Value>>`
  vertical-align: baseline;
  display: inline-block;
  background-color: ${({ selected, focused }) => selected && focused && 'rgba(176,209,255,1)'};
`;

// renderElement props
export interface VariableElementProps<V extends Value> extends Omit<StyledElementProps<V, VariableNode>, 'onClick'> {
  /**
   * Prefix rendered before variable
   */
  prefix?: string;
  onClick?: (variableNode: VariableNode) => void;
  renderLabel?: (variableable: VariableNodeData) => string;
  element: VariableNode; // make type clearly
}

export const VariableElement = <V extends Value>(props: VariableElementProps<V>) => {
  const { attributes, children, nodeProps, element, prefix, onClick, renderLabel } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();

  return (
    <StyledVariableElement
      {...attributes}
      data-slate-value={element.value}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      selected={selected}
      focused={focused}
      {...rootProps}
      {...nodeProps}
    >
      {prefix}
      {renderLabel ? (
        renderLabel(element)
      ) : (
        <Phrase
          spec={{
            type: element?.metadata ? 'entity' : 'text',
            value: element.value,
            metadata: element?.metadata,
          }}
        />
      )}
      {children}
    </StyledVariableElement>
  );
};
