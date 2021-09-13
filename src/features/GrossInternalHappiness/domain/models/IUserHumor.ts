interface IUserHumor extends IUserHumorData {
  id: number;
  date?: string;
}

export interface IUserHumorData {
  user_id: number;
  humor_id: number;
  emotion_id?: number;
}

export default IUserHumor;
