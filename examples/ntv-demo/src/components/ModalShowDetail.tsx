import { useState } from 'react';
import { Spin, Modal } from 'antd';
import { CustomPhraseSpec } from '@antv/narrative-text-vis';

export type ModalShowDetailMeta = {
  interaction: string;
  show: string;
  tableId: string;
};

interface Props {
  phrase: CustomPhraseSpec<ModalShowDetailMeta>;
}

export function ModalShowDetail({ phrase }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(true);
    }, 2000);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <span
        style={{
          borderBottom: '1px solid #000',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {phrase?.value}
      </span>
      {loading ? <Spin /> : null}
      <Modal
        title="数据详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        table id: {phrase.metadata?.tableId}
      </Modal>
    </>
  );
}
