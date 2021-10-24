import React, { useEffect, useState } from 'react';
import IUser from '~/features/Users/domain/models/IUser';

import * as Styled from './styles';

export interface IProps {
  user?: IUser;
}

const User: React.FC<IProps> = ({ user }) => (
  <Styled.Container>
    {user?.image && <Styled.Image src={user.image} />}
    <Styled.Name>{user?.name}</Styled.Name>
  </Styled.Container>
);

export default User;
