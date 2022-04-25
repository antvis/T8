import { PlateEditor, getPluginType, getNodes, setNodes, insertNodes } from '@udecode/plate-core';
import { Transforms } from 'slate';
import { isEqual } from 'lodash';
import { VariableMap } from '../types';
import { ELEMENT_VARIABLE, VariableNode } from '../plugins/variable';

/** update variable node, recording variableMap */
export function updateVariables(editor: PlateEditor, variableMap: VariableMap): void {
  const nodeEntries = getNodes<VariableNode>(editor, {
    match: { type: getPluginType(editor, ELEMENT_VARIABLE) },
    at: [],
  });

  for (const [node, path] of nodeEntries) {
    const { key, value, metadata } = node;
    if (variableMap?.[key]) {
      const { value: currentValue, metadata: currentMeta } = variableMap[key];
      // variable changed
      if (value !== currentValue || !isEqual(metadata, currentMeta)) {
        setNodes(editor, { key, value: currentValue, metadata: currentMeta } as VariableNode, { at: path });
      }
    } else {
      // variable removed
      Transforms.removeNodes(editor, { at: path });
      insertNodes(editor, { text: '' }, { at: path });
    }
  }
}
