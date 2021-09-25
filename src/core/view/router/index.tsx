import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import GrossInternalHappiness from '~/features/GrossInternalHappiness/view/router';
import CorporateWall from '~/features/CorporateWall/view/router';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <GrossInternalHappiness />
    </Switch>
    <Switch>
      <CorporateWall />
    </Switch>
  </BrowserRouter>
);

export default Router;
