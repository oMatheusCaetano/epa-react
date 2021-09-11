interface IUser {
  id: number;
  login: string;
  name: string;
  email?: string;
  image?: string;
}

export default IUser;
