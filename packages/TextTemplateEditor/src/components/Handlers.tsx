import React from 'react';
import { Tooltip, Cascader } from 'antd';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { get, isNumber } from 'lodash';
import { getPrefixCls } from '../utils/getPrefixCls';

const options: CascaderOptionType[] = [
  {
    value: 'delete',
    label: 'Delete',
  },
  {
    value: 'turn-into',
    label: 'Turn into',
    children: [
      {
        value: 'heading',
        label: 'Heading 1',
      },
      {
        value: 'heading-two',
        label: 'Heading 2',
      },
      {
        value: 'heading-three',
        label: 'Heading 3',
      },
      {
        value: 'paragraph',
        label: 'Paragraph',
      },
    ],
  },
  {
    value: 'color',
    label: 'Color',
    children: [
      {
        value: 'red',
        label: 'red',
      },
      {
        value: 'green',
        label: 'green',
      },
    ],
  },
  {
    value: 'bg-color',
    label: 'Background Color',
    children: [
      {
        value: 'red',
        label: 'red',
      },
      {
        value: 'green',
        label: 'green',
      },
    ],
  },
];

export const DragMenuHandler: React.FC = () => {
  const editor = useSlate();
  const onChangeType = (type) => {
    Transforms.setNodes(editor, { type });
  };
  const onChangeColor = (color: string) => {
    Transforms.setNodes(editor, { color, backgroundColor: 'unset' });
  };
  const onChangeBgColor = (color: string) => {
    Transforms.setNodes(editor, { color: 'unset', backgroundColor: color });
  };
  const onRemoveElement = () => {
    Transforms.removeNodes(editor);
  };
  const handleChange = (value: CascaderValueType) => {
    switch (value[0]) {
      case 'delete':
        onRemoveElement();
        break;
      case 'turn-into':
        onChangeType(value[1] as string);
        break;
      case 'color':
        onChangeColor(value[1] as string);
        break;
      case 'bg-color':
        onChangeBgColor(value[1] as string);
        break;
      default:
        break;
    }
  };
  return (
    <Cascader options={options} expandTrigger="hover" onChange={handleChange}>
      <MoreOutlined />
    </Cascader>
  );
};

export const AddHandler: React.FC = () => {
  const editor = useSlate();
  const onInsertElement = () => {
    const at = get(editor, 'selection.anchor.path[0]');
    Transforms.insertNodes(
      editor,
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
      { at: isNumber(at) ? [at + 1] : undefined },
    );
    if (isNumber(at)) {
      Transforms.setSelection(editor, {
        anchor: { path: [at + 1, 0], offset: 0 },
        focus: { path: [at + 1, 0], offset: 0 },
      });
    }
  };
  return (
    <Tooltip
      overlay={
        <div className={getPrefixCls('handler-tooltip')}>
          <p>
            <b>Click</b> to add a block below
          </p>
        </div>
      }
      placement="bottom"
    >
      <PlusOutlined onClick={onInsertElement} />
    </Tooltip>
  );
};
