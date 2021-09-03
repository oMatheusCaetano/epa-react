import React from 'react';
import { ThemeProvider } from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import GlobalStyle from '~/styles/global';
import LightTheme from '~/styles/themes/light';

const EpaThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={LightTheme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default EpaThemeProvider;
