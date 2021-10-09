import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

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
      background: ${({ theme }) => theme.colors.light};
      border-radius: ${({ theme }) => theme.radius.small};
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => darken(0.1, theme.colors.light)};
      border-radius: ${({ theme }) => theme.radius.small};
    }
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
`;
