// TODO 完善类型定义
interface CustomElementComponentProps {
  selected: boolean;
  focused: boolean;
  onChange: (value: any) => void;
  element: any;
}

export type CustomElementComponent = React.FC<CustomElementComponentProps>;

export type CustomPlugin = {
  key: string;
  isInline: boolean;
  component: CustomElementComponent;
};
