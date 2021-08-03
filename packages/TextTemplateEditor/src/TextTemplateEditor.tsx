import React from 'react';
import { map } from 'lodash';
import { HeadlineEditor, SectionEditor } from './editor';
import { useEditor } from './useEditor';

interface TemplateEditorProps {
  editor: ReturnType<typeof useEditor>;
}

const InternalTemplateEditor: React.FC<TemplateEditorProps> = ({ editor }) => {
  const { template, update } = editor;

  return (
    <div className="ntv-editor">
      {template?.headline ? (
        <HeadlineEditor template={template.headline} update={(nt) => update('headline', nt)} />
      ) : null}
      {map(template?.sections, (section, index) => (
        <SectionEditor key={index} template={section} update={(nt) => update(`section`, nt, index)} />
      ))}
    </div>
  );
};

type InternalTemplateEditorType = typeof InternalTemplateEditor;

interface TemplateEditorInterface extends InternalTemplateEditorType {
  useEditor: typeof useEditor;
}

export const TextTemplateEditor = InternalTemplateEditor as TemplateEditorInterface;
TextTemplateEditor.useEditor = useEditor;
