import { createGlobalStyle } from 'styled-components';
import { darken, transparentize } from 'polished';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
    font: ${({ theme }) => theme.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::-webkit-scrollbar {
      width: 10px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => darken(0.1, theme.colors.light)};
      border-radius: ${({ theme }) => theme.radius.small};
    }
  }

  body, #root {
    min-height: 100vh;
  }

  h2 {
    margin: 0;
  }

  label {
    cursor: pointer;
    margin-left: 5px;
  }

  ul {
    list-style: none;
  }

  .form-input-style {
    width: 100%;
    height: 32px;
    padding: 5px 10px;
    border-radius: ${({ theme }) => theme.radius.default};
    outline: none;
    background-color: #fff;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid rgba(0,0,0,0.1);
    transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease;

    &:placeholder-shown, &[value=""], &:not([value]) {
      background-color: ${({ theme }) => theme.colors.light};
      border: 1px solid transparent;
    }


    &.not-empty {
      background-color: #fff;
      border: 1px solid rgba(0,0,0,0.1);
    }

    &:hover {
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease;
      border: 1px solid transparent;
      border-color: rgba(0,0,0,0.1);
      background-color: #fff;
      box-shadow: 0 0 0 4px ${({ theme }) => transparentize(0.9, theme.colors.primary)};
    }

    &:active, &:focus {
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease;
      border: 1px solid transparent;
      border-color: ${({ theme }) => transparentize(0.6, theme.colors.primary)};
      background-color: #fff;
      box-shadow: 0 0 0 4px ${({ theme }) => transparentize(0.9, theme.colors.primary)};
    }

  }

  .default-button {
    height: 32px;
    padding: 0 16px;
    transition: .2s;
    border: none;
    border-radius: ${({ theme }) => theme.radius.default};
    outline: none;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    & .button-icon {
      margin-right: 10px;
      margin-bottom: 1px;
    }
  }
`;
