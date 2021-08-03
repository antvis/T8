import React, { useCallback, useMemo } from 'react';
import { Editable, withReact, Slate, RenderElementProps } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Leaf } from '../components';
import { ITemplate } from '../types';

type HeadlineTemplate = ITemplate['headline'];

interface Props {
  template: HeadlineTemplate;
  update: (newTemplate: HeadlineTemplate) => void;
}

export const HeadlineEditor: React.FC<Props> = ({ template, update }) => {
  const renderElement = useCallback(
    ({ attributes, children }: RenderElementProps) => <h1 {...attributes}>{children}</h1>,
    [],
  );
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
