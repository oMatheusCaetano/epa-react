interface IFibEmotion {
  id: number;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  _permissions: {
    edit: boolean;
    delete: boolean;
  }
}

export default IFibEmotion;
