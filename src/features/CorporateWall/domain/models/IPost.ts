import IUser from '~/features/Users/domain/models/IUser';
import IPostCategory from './IPostCategory';

interface IPost extends IPostData {
  id: number;
  createdAt: string;
  createdBy?: IUser;
}

export interface IPostData {
  title?: string;
  description?: string;
  publishedAt?: string;
  category?: IPostCategory;
}

export default IPost;
