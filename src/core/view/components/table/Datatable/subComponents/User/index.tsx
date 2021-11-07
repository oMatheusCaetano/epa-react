import React from 'react';
import IUser from '~/features/Users/domain/models/IUser';

import * as Styled from './styles';

export interface IProps {
  user?: IUser;
}

const User: React.FC<IProps> = ({ user }) => (
  <Styled.Container>
    {user?.image && <Styled.Image src={user.image} />}
    <span>{user?.name}</span>
  </Styled.Container>
);

export default User;
