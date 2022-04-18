import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import {
  NarrativeTextVis,
  getNarrativeText,
  NarrativeTextSpec,
} from '@antv/narrative-text-vis';
import copy from 'copy-to-clipboard';
import AnchorLayout from '../components/AnchorLayout';
import ContentBlock from '../components/ContentBlock';
import getAnchors from '../utils/get-anchors';
import booking from '../data/booking.json';

const anchors = getAnchors('tool', ['export text']);

export default function EventPage() {
  return (
    <AnchorLayout anchorLinks={anchors}>
      <ContentBlock id={anchors[0].id} title={anchors[0].title}>
        <NarrativeTextVis spec={booking as NarrativeTextSpec} />
        <Button
          type="primary"
          icon={<CopyOutlined />}
          onClick={() => {
            const r = copy(getNarrativeText(booking as NarrativeTextSpec));
            if (r) {
              message.success('copy success!');
            }
          }}
        >
          Copy To Clipboard
        </Button>
      </ContentBlock>
    </AnchorLayout>
  );
}
