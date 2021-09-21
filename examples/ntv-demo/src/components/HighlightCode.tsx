import { useEffect } from 'react';
import Prism from 'prismjs';

interface Props {
  langType: string;
  code: string;
}

export default function HighlightCode({ langType, code }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre className={`language-${langType}`}>
      <code className={`language-${langType}`}>{code.trim()}</code>
    </pre>
  );
}
