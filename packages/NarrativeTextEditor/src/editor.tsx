import React, { useEffect, CSSProperties } from 'react';
import { Plate, usePlateEditorRef, TDescendant, PlateStoreState } from '@udecode/plate-core';

import { safeSlateValue } from './constants';
import getPlugins, { VariableCombobox } from './plugins';
import HeadingToolbar from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';
// import { transferComboboxItemData, updateVariables } from './helpers';
import { MyValue } from './types';

import 'tippy.js/dist/tippy.css';

export interface NarrativeTextEditorProps {
  /** editor key, must unique */
  id: string;

  /** uncontrolled initial value */
  initialValue?: PlateStoreState<MyValue>['value'];

  // TODO 由于 slate 升级后 value 不再作为受控组件生效，暂时不提供受控组件的使用方式
  //  https://github.com/ianstormtaylor/slate/issues/4612
  /** controlled value */
  // value?: TDescendant[];

  /** editor value change */
  onChange?: (val: TDescendant[]) => void;

  /** editor inline style */
  style?: CSSProperties;

  /** enter variables via shortcut keys  */
  // variableMap?: VariableMap;

  /** whether show heading toolbar */
  showHeadingToolbar?: boolean;

  /** whether show hovering toolbar */
  showHoveringToolbar?: boolean;

  /** read only */
  readOnly?: boolean;
}

// Listen variable map changes and update variable
// const VariableListener: React.FC<Pick<NarrativeTextEditorProps, 'variableMap'>> = ({ variableMap }) => {
//   const editor = usePlateEditorRef();
//   useEffect(() => {
//     updateVariables(editor, variableMap);
//   }, [variableMap]);
//   return null;
// };

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({
  id,
  initialValue = safeSlateValue,
  onChange,
  style,
  // variableMap,
  showHeadingToolbar = true,
  showHoveringToolbar = true,
  readOnly = false,
}) => {
  return (
    <>
      <Plate
        id={id}
        initialValue={initialValue}
        onChange={onChange}
        editableProps={{
          autoFocus: false,
          spellCheck: false,
          readOnly,
          style: {
            fontFamily: 'PingFangSC, sans-serif',
            ...style,
          },
        }}
        plugins={getPlugins()}
      >
        {/* {variableMap && <VariableListener variableMap={variableMap} />} */}
        {!readOnly && showHeadingToolbar && <HeadingToolbar />}
        {!readOnly && showHoveringToolbar && <HoveringToolbar />}
        {/* {!readOnly && variableMap && <VariableCombobox items={transferComboboxItemData(variableMap)} />} */}
      </Plate>
    </>
  );
};
