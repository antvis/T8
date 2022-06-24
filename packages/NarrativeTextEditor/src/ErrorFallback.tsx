import React from 'react';
import { ErrorBoundaryProps } from 'react-error-boundary';
import { Alert } from 'antd';

export const ErrorFallback: ErrorBoundaryProps['FallbackComponent'] = ({ error }) => {
  return <Alert type="error" message="编辑器出错了" description={error.message} />;
};
