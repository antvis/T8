import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { TLinkElement } from '@udecode/plate-link';
import { get } from 'lodash';

export type LinkFormValue = {
  text: string;
  url: string;
};

interface LinkPopEditOverlayProps {
  element: TLinkElement;
  onChange: (values: LinkFormValue) => void;
}

export const LinkPopEditOverlay: React.FC<LinkPopEditOverlayProps> = ({ element, onChange }) => {
  return (
    <>
      <Form<LinkFormValue>
        colon={false}
        labelAlign="left"
        initialValues={{ text: get(element, 'children[0].text'), url: element.url }}
        onFinish={onChange}
      >
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
    </>
  );
};
