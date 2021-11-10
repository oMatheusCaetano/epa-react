import React from 'react';
import { Provider } from 'react-redux';

import Router from '~/core/view/router';
import store from '~/core/domain/stores';

import EpaThemeProvider from '~/core/view/components/misc/EpaThemeProvider';

const App: React.FC = () => (
  <Provider store={store}>
    <EpaThemeProvider>
      <Router />
    </EpaThemeProvider>
  </Provider>
);
export default App;
