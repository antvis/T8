import { TemplateEditor } from './TemplateEditor';
import { NarrativeTextEditor as InnerNarrativeTextEditor } from './editor';

type NarrativeTextEditor = typeof InnerNarrativeTextEditor & {
  Template: typeof TemplateEditor;
};

export const NarrativeTextEditor = InnerNarrativeTextEditor as NarrativeTextEditor;
NarrativeTextEditor.Template = TemplateEditor;

export { CustomBlockToolbarButton, CustomInlineToolbarButton } from './plugins/custom';

export type { NarrativeTextEditorProps, TemplateEditorProps } from './types';
export type { CustomElementComponent } from './plugins/custom';
