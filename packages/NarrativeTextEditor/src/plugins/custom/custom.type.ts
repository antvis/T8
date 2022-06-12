import { StyledElementProps } from '@udecode/plate-styled-components';

interface CustomElementComponentProps {
  onChange: (value: any) => void;
  element: StyledElementProps['element'];
}

export type CustomElementComponent = React.FC<CustomElementComponentProps>;

export type CustomPlugin = {
  key: string;
  isInline: boolean;
  component: CustomElementComponent;
};
