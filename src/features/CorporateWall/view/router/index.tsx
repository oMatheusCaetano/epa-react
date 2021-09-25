import React from 'react';
import { Route } from 'react-router-dom';

import CorporateWall from '~/features/CorporateWall/view/pages/CorporateWall';

const Router: React.FC = () => (
  <>
    <Route path="/corporate-wall">
      <CorporateWall />
    </Route>
  </>
);

export default Router;
