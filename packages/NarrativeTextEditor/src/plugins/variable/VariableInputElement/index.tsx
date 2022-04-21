import React from 'react';
import { getHandler } from '@udecode/plate-core';
import { getRootProps, StyledElementProps, createStyles } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import { css } from 'styled-components';
import tw from 'twin.macro';
import { VariableNode, VariableNodeData } from '../types';

interface VariableInputElementStyleProps extends VariableInputElementProps {
  selected?: boolean;
  focused?: boolean;
}

const getVariableInputElementStyles = (props: VariableInputElementStyleProps) =>
  createStyles(
    { prefixClassNames: 'VariableInputElement', ...props },
    {
      root: [
        tw`my-0 mx-px align-baseline inline-block`,
        props.selected && props.focused && tw`boxShadow[0 0 0 2px #B4D5FF]`,
        css`
          padding: 3px 3px 2px;
          border-radius: 4px;
          background-color: #eee;
          font-size: 0.9em;
        `,
      ],
    },
  );

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
  const { attributes, children, nodeProps, element, as, onClick } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();

  const styles = getVariableInputElementStyles({
    ...props,
    selected,
    focused,
  });

  return (
    <span
      {...attributes}
      as={as}
      aria-hidden
      data-slate-value={element.value}
      className={styles.root.className}
      css={styles.root.css}
      onClick={getHandler(onClick, element)}
      {...rootProps}
      {...nodeProps}
    >
      {children}
    </span>
  );
};
