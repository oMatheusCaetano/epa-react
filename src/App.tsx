import React from 'react';
import { Provider } from 'react-redux';

import Router from '~/core/view/router';
import store from '~/core/domain/stores';

import { Global, EpaThemeProvider } from '~/core/view/components';

const App: React.FC = () => (
  <Provider store={store}>
    <EpaThemeProvider>
      <Global />
      <Router />
    </EpaThemeProvider>
  </Provider>
);

export default App;
