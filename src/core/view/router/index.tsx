import React from 'react';
import { BrowserRouter, Switch, Route, RouteProps } from 'react-router-dom';

import PageNotFound from '~/core/view/pages/PageNotFound';

import CorporateWallRoutes from '~/features/CorporateWall/view/router';
import GoalAndBallOutRoutes from '~/features/GoalAndBallOut/view/router';

export interface RouterType {
  name: string;
  routes: RouteProps[];
}

const Router: React.FC = () => (
  <>
    <BrowserRouter>
      <Switch>
        {CorporateWallRoutes.routes.map((route, index) => (
          <Route key={`${CorporateWallRoutes.name}--${index}`} {...route} />
        ))}

        {GoalAndBallOutRoutes.routes.map((route, index) => (
          <Route key={`${GoalAndBallOutRoutes.name}--${index}`} {...route} />
        ))}

        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
