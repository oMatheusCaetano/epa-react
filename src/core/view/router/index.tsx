import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import GrossInternalHappiness from '~/features/GrossInternalHappiness/view/router';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <GrossInternalHappiness />
    </Switch>
  </BrowserRouter>
);

export default Router;
