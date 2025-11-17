import { useEffect, useRef } from 'react';
import { Text } from '@t8/text';
import type { NarrativeTextSpec } from '@t8/schema';
import { Typography } from 'antd';

type NarrativeViewerProps = {
  spec?: Partial<NarrativeTextSpec>;
  fallbackText?: string;
};

const NarrativeViewer = ({ spec, fallbackText }: NarrativeViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spec || !containerRef.current) {
      return;
    }

    const renderer = new Text(containerRef.current);
    renderer.schema(spec).theme('light');

    renderer.render();

    return () => {
      renderer.unmount();
    };
  }, [JSON.stringify(spec)]);

  return (
    <div className="narrative-viewer">
      <div ref={containerRef} />
      {!spec && fallbackText ? <Typography.Text>{fallbackText}</Typography.Text> : null}
    </div>
  );
};

export default NarrativeViewer;
