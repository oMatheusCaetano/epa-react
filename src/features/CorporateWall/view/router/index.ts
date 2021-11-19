import { RouterType } from '~/core/view/router';

import CorporateWall from '~/features/CorporateWall/view/pages/CorporateWall';

const CorporateWallRoutes: RouterType = {
  name: 'CorporateWallRoutes',
  routes: [
    {
      path: '/corporate-wall',
      component: CorporateWall,
      exact: true,
    },
  ],
};

export default CorporateWallRoutes;
