import React from 'react';
import Title from '~/core/view/components/text/Title';
import ActionButton, { IProps as ActionButtonProps } from '~/core/view/components/button/ActionButton';

import * as Styled from './styles';

type IAction = ActionButtonProps

interface IProps {
  title?: string;
  actions?: IAction[]
}

const TitleWithActions: React.FC<IProps> = ({ title, actions }) => (
  <Styled.Container>
    <div>
      <Title>{title}</Title>
    </div>

    <Styled.ActionsContainer>
      {actions && actions.map((action, key) => (
        <ActionButton {...action} className={`${action.className} ms-2`} key={key} />
      ))}
    </Styled.ActionsContainer>
  </Styled.Container>
);

export default TitleWithActions;
