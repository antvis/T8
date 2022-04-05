import React from 'react';
import { Row, Col } from 'antd';
import ReactJson from 'react-json-view';

const JsonPreview: React.FC<{ json: any }> = ({ json, children }) => {
  return (
    <Row>
      <Col span={12}>
        <ReactJson src={json} />
      </Col>
      <Col span={12}>{children}</Col>
    </Row>
  );
};

export default JsonPreview;
