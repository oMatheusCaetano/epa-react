import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PageNotFound from '~/core/view/pages/PageNotFound';

const Router: React.FC = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
