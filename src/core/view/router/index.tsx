import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import GrossInternalHappiness from '~/features/GrossInternalHappiness/view/router';
import CorporateWall from '~/features/CorporateWall/view/router';

const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      <GrossInternalHappiness />
    </Switch>
    <Switch>
      <CorporateWall />
    </Switch>
  </HashRouter>
);

export default Router;
