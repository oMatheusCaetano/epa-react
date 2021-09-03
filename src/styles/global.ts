import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font: ${({ theme }) => theme.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
