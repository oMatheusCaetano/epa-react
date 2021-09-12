interface IFibEmotion extends IFibEmotionData {
  id: number;
}

export interface IFibEmotionData {
  description: string;
  active?: boolean;
}

export default IFibEmotion;
