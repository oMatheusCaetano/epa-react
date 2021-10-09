import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
    font: ${({ theme }) => theme.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
