import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { TLinkElement } from '@udecode/plate-link';
import { get } from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import { LinkOff } from '@styled-icons/material-outlined/LinkOff';
import { BoxArrowInUpRight } from '@styled-icons/bootstrap/BoxArrowInUpRight';

export type LinkFormValue = {
  text: string;
  url: string;
};

interface LinkPopEditOverlayProps {
  visible: boolean;
  element: TLinkElement;
  onChange: (values: LinkFormValue) => void;
  unlink: () => void;
}

export const LinkPopEditOverlay: React.FC<LinkPopEditOverlayProps> = ({ visible, element, onChange, unlink }) => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (visible) {
      setEditing(!element.url);
    }
  }, [visible]);
  useEffect(() => {
    if (visible && editing) {
      form.setFieldsValue({
        text: get(element, 'children[0].text'),
        url: element.url,
      });
    }
  }, [visible, editing]);
  const open = () => {
    window.open(element.url, '’target’');
  };
  const edit = () => {
    setEditing(true);
  };
  return (
    <>
      {editing ? (
        <Form<LinkFormValue> colon={false} form={form} labelAlign="left" onFinish={onChange}>
          <Form.Item label="文本" name="text" rules={[{ required: true }]}>
            <Input size="small" />
          </Form.Item>
          <Form.Item label="链接" name="url" rules={[{ required: true }]}>
            <Input size="small" />
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button size="small" type="primary" htmlType="submit">
                确定
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Space style={{ cursor: 'pointer' }} size="middle">
          <BoxArrowInUpRight width={16} onClick={open} />
          <EditOutlined width={18} onClick={edit} />
          <LinkOff width={16} onClick={unlink} />
        </Space>
      )}
    </>
  );
};
