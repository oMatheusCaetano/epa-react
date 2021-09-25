import React from 'react';
import { Route } from 'react-router-dom';

import Measure from '~/features/GrossInternalHappiness/view/pages/Measure';

const Router: React.FC = () => (
  <>
    <Route path="/measure">
      <Measure />
    </Route>
  </>
);

export default Router;
