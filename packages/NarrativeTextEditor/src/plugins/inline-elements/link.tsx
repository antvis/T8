/**
 * create <a>
 */
import React from 'react';
import { createLinkPlugin, LinkToolbarButton } from '@udecode/plate';
import { LinkOutlined } from '@ant-design/icons';

export const linkPlugin = createLinkPlugin();

export const LinkToolBarButton = () => <LinkToolbarButton icon={<LinkOutlined />} />;
