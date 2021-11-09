import { RouteProps } from 'react-router-dom';

import CorporateWall from '~/features/CorporateWall/view/pages/CorporateWall';

const CorporateWallRoutes: RouteProps[] = [
  {
    path: '/corporate-wall',
    component: CorporateWall,
    exact: true,
  },
];

export default CorporateWallRoutes;
