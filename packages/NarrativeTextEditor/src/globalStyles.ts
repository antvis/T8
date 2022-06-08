import { createGlobalStyle } from 'styled-components';

export const POP_TOOLBAR_CLS = 'nte-pop-toolbar';

export const GlobalStyle = createGlobalStyle`
  .${POP_TOOLBAR_CLS} {
    .ant-tooltip-arrow {
      display: none;
    }
    .ant-tooltip-inner{
      transform: translateY(-18px);
      background-color: #fff;
      box-shadow: 0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05);
      border-radius: 4px;
      color: #595959;
      padding: 6px 12px;
    }
    .ant-form-item{
      margin-bottom: 12px;
    }
  }
`;
