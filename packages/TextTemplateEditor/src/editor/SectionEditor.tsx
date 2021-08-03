import React, { useCallback, useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Element, Leaf } from '../components';
import { ITemplate } from '../types';

type SectionTemplate = ITemplate['sections'][number];

interface Props {
  template: SectionTemplate;
  update: (newTemplate: SectionTemplate) => void;
}

export const SectionEditor: React.FC<Props> = ({ template, update }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const slateEditor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate
      editor={slateEditor}
      value={template}
      onChange={(templateVal) => {
        update(templateVal);
      }}
    >
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};
