import { RouterType } from '~/core/view/router';
import CreateGoalAndBallOut from '~/features/GoalAndBallOut/view/pages/CreateGoalAndBallOut';

const GoalAndBallOutRoutes: RouterType = {
  name: 'GoalAndBallOutRoutes',
  routes: [
    {
      path: '/goal-and-ball-out/create',
      component: CreateGoalAndBallOut,
      exact: true,
    },
    {
      path: '/goal-and-ball-out/:id',
      component: CreateGoalAndBallOut,
      exact: true,
    },
  ],
};

export default GoalAndBallOutRoutes;
