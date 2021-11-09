import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PageNotFound from '~/core/view/pages/PageNotFound';

import CorporateWallRoutes from '~/features/CorporateWall/view/router';

const Router: React.FC = () => (
  <>
    <BrowserRouter>
      <Switch>
        {CorporateWallRoutes.map((route, index) => (
          <Route key={`corporate-wall-${index}`} {...route} />
        ))}

        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
