import React from 'react';

import EpaThemeProvider from '~/core/view/components/misc/EpaThemeProvider';
import Measure from './features/GrossInternalHappiness/pages/Measure';

const App: React.FC = () => (
  <EpaThemeProvider>
    <Measure />
  </EpaThemeProvider>
);

export default App;
