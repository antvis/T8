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
export { useEditorRef } from '@udecode/plate-core';
