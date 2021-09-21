import React from 'react';
import { Divider } from 'antd';

interface Props {
  id: string;
  title: string;
}

const ContentBlock: React.FC<Props> = ({ id, title, children }) => {
  return (
    <div id={id} className="content-block">
      <Divider orientation="left">{title}</Divider>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default ContentBlock;
