import React from 'react';

import EpaThemeProvider from '~/core/view/components/misc/EpaThemeProvider';
import Measure from './features/GrossInternalHappiness/view/pages/Measure';

const App: React.FC = () => {
  console.log(localStorage.getItem('item'));

  return (
    <EpaThemeProvider>
      <Measure />
    </EpaThemeProvider>
  );
};
export default App;
