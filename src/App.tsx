import React from 'react';
import { Provider } from 'react-redux';

import store from '~/core/domain/store';

import EpaThemeProvider from '~/core/view/components/misc/EpaThemeProvider';
import Measure from '~/features/GrossInternalHappiness/view/pages/Measure';

const App: React.FC = () => (
  <Provider store={store}>
    <EpaThemeProvider>
      <Measure />
    </EpaThemeProvider>
  </Provider>
);
export default App;
