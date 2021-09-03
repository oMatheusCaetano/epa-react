import IPostCategory from './IPostCategory.model';
import IUser from './IUser.model';

interface IPost {
  id: number;
  title?: string;
  description?: string;
  release?: string;
  image?: string;
  category: IPostCategory;
  createdBy: IUser;
  updatedBy?: IUser;
}

export default IPost;
