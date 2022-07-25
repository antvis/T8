import TemplateEditor from './TemplateEditor';
import InnerNarrativeTextEditor from './editor';

type NarrativeTextEditor = typeof InnerNarrativeTextEditor & {
  Template: typeof TemplateEditor;
};

export const NarrativeTextEditor = InnerNarrativeTextEditor as NarrativeTextEditor;
NarrativeTextEditor.Template = TemplateEditor;

export { ELEMENT_VARIABLE, ELEMENT_VARIABLE_INPUT } from './plugins/variable';
export { CustomBlockToolbarButton, CustomInlineToolbarButton } from './plugins/custom';

export type { NarrativeTextEditorProps, NarrativeTextEditorRef, TemplateEditorProps } from './types';
export type { CustomElementComponent } from './plugins/custom';
// TODO 不知道为啥，项目里 install plate，再 import 就不行，都从 t8 里 import 就可以
// 也许它们创建了不同的上下文🤔，先从 T8 里面 export 出去满足业务更灵活的使用编辑器 api
export { useEditorRef } from '@udecode/plate-core';
export * from './locale';
export { default as ConfigProvider } from './components/ConfigProvider';
export { BLOCK_KEYS } from './constants';
