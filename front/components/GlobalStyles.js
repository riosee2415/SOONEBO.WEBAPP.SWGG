import { createGlobalStyle, css } from "styled-components";
import Theme from "./Theme";

const fontStyle = css``;

const GlobalStyles = createGlobalStyle`
  ${fontStyle}

  body {
    font-family: "Pretendard", sans-serif;
    /* font-family: 'Ubuntu', sans-serif; */
  }

  a {
    color : inherit;
    text-decoration : none;
  }

  textarea {
    resize: none;
    outline: none;
  }

  input {
    outline: none;
  }
  
  a:hover {
    color : inherit;
  }

  .ant-drawer-body{
    padding:10px 20px;
  }


  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: 0 0 0 2px rgb(255 72 150 / 20%) !important;
  }

  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${Theme.basicTheme_C} !important;
    border-right-width: 1px !important;
  } 

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${Theme.subTheme2_C} !important;
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
  border-color:${Theme.basicTheme_C} !important;
  }


  

  .ant-input-affix-wrapper:hover {
   border-color:${Theme.basicTheme_C} !important;
  }

  .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
  border-color:${Theme.basicTheme_C} !important;
   box-shadow: 0 0 0 2px rgb(255 72 150 / 20%) !important;
  }
 
  .ant-input-affix-wrapper:focus {
   border-color:${Theme.basicTheme_C} !important;
   box-shadow: 0 0 0 2px rgb(255 72 150 / 20%) !important;
  }

 

  .ant-input-number-focused {
    box-shadow: 0 0 0 2px rgb(255 72 150 / 20%) !important;
  }

  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }

  .ant-picker-panel-container .ant-picker-panels {
    @media (max-width : 900px) {
    display: flex !important;
    flex-direction: column !important;
    }
  }

    /* table */
    .ant-table-pagination-right{
    @media(max-width : 900px) {
      justify-content : flex-start;
    }
  }

  .ant-page-header-heading-title{
    @media (max-width : 900px) {
      width : 100%;
    }
  }

  .ant-page-header-heading-sub-title{
    @media (max-width : 900px) {
      width : 100%;
    }
  }

  .ant-page-header-heading-left{
    @media (max-width : 900px) {
      flex-wrap : wrap;
    }
  }
`;

export default GlobalStyles;
