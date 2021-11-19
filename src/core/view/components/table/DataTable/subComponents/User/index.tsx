import React from 'react';
import { User as UserModel } from '~/features/Users/domain/models';

import * as Styled from './styles';

export interface UserProps {
  user?: UserModel;
}

const User: React.FC<UserProps> = ({ user }) => (
  <Styled.Container>
    {!!user?.cliente?.foto && <Styled.Image src={user?.cliente?.foto} />}
    <span>{user?.cliente?.nome ?? ''}</span>
  </Styled.Container>
);

export default User;
