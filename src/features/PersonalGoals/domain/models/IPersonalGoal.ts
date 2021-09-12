interface IPersonalGoal extends IPersonalGoalData {
  id: number;
  description: string;
  done: boolean;
  user_id: number;
}

export interface IPersonalGoalData {
  description: string;
  done: boolean;
  user_id?: number;
  created_at?: string;
  finished_at?: string;
}

export default IPersonalGoal;
