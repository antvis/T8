/**
 * create <a>
 */
import React from 'react';
import { createLinkPlugin } from '@udecode/plate-link';
import { LinkToolbarButton } from '@udecode/plate-ui';
import { LinkOutlined } from '@ant-design/icons';

export const linkPlugin = createLinkPlugin();

export const LinkToolBarButton = () => <LinkToolbarButton icon={<LinkOutlined />} />;
