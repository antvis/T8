import { useEffect, useRef } from 'react';
import { Text } from '@t8/text';
import { Typography } from 'antd';

type NarrativeViewerProps = {
  content?: string;
  fallbackText?: string;
};

const NarrativeViewer = ({ content, fallbackText }: NarrativeViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!content || !containerRef.current) {
      return;
    }

    const renderer = new Text(containerRef.current);
    renderer.theme('light').render(content);

    return () => {
      renderer.unmount();
    };
  }, [content]);

  return (
    <div className="narrative-viewer">
      <div ref={containerRef} />
      {!content && fallbackText ? <Typography.Text>{fallbackText}</Typography.Text> : null}
    </div>
  );
};

export default NarrativeViewer;
