import React, {
  useState,
  useReducer,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useEffect,
} from 'react';
import { Plate, usePlateEditorRef, PlateEditor, TDescendant, moveSelection, setSelection } from '@udecode/plate-core';
import { isObject } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ErrorBoundary } from 'react-error-boundary';

import { GlobalStyle } from './globalStyles';
import { safeSlateValue } from './constants';
import getPlugins from './plugins/getPlugins';
import HeadingToolbar from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';
import { ErrorFallback } from './ErrorFallback';
import { NarrativeTextEditorProps, NarrativeTextEditorRef } from './types';

import 'tippy.js/dist/tippy.css';

const NarrativeTextEditor: ForwardRefRenderFunction<NarrativeTextEditorRef, NarrativeTextEditorProps> = (
  {
    id,
    initialValue = safeSlateValue,
    plugins = [],
    platePlugins = [],
    onChange,
    style,
    showHeadingToolbar = true,
    showHoveringToolbar = true,
    readOnly = false,
    draggable = true,
    singleLine = false,
    placeholders,
    children,
  },
  ref,
) => {
  const [editor, setEditor] = useState<PlateEditor>();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const setValue = (newValue: TDescendant[]) => {
    if (editor) {
      // 重置前先把选区移到编辑器开头，避免重置之后选区失效报错
      // move selection to start of editor to avoid throw error
      setSelection(editor, {
        focus: {
          path: [0, 0],
          offset: 0,
        },
      });
      // TODO 暂时不约束编辑器类型定义
      editor.children = newValue as any;
      forceUpdate();
    }
  };

  useImperativeHandle(ref, () => ({
    setValue,
  }));

  return (
    // @ts-ignore @types/react 版本冲突
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GlobalStyle />
      {!readOnly && showHeadingToolbar && (
        <HeadingToolbar {...(isObject(showHeadingToolbar) ? showHeadingToolbar : {})} />
      )}
      <DndProvider backend={HTML5Backend}>
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
              overflow: 'auto',
              // make drag handler visible
              padding: !readOnly && draggable ? '0 18px' : undefined,
              ...style,
            },
          }}
          plugins={getPlugins({ plugins, platePlugins, draggable, placeholders, singleLine })}
        >
          <EditorInsGetter getEditor={setEditor} />
          {!readOnly && showHoveringToolbar && <HoveringToolbar />}
          {children}
        </Plate>
      </DndProvider>
    </ErrorBoundary>
  );
};

export default React.memo(forwardRef(NarrativeTextEditor));

// 只负责获取 editor 实例，不做实际渲染
function EditorInsGetter({ getEditor }: { getEditor: (editor: PlateEditor) => void }) {
  const editor = usePlateEditorRef();
  useEffect(() => {
    getEditor(editor);
  }, [editor]);
  return null;
}
