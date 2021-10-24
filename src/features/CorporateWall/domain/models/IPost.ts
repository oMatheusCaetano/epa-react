import IUser from '~/features/Users/domain/models/IUser';

interface IPost extends IPostData {
  id: number;
  createdAt: string;
  createdBy?: IUser;
}

export interface IPostData {
  description: string;
  publishedAt?: string;
}

export default IPost;
