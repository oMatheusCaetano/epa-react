import React from 'react';

import { Title, ActionButton, IActionButtonProps } from '~/core/view/components';

import * as Styled from './styles';

interface IProps {
  className?: string;
  title?: string;
  actions?: IActionButtonProps[]
}

const TitleWithActions: React.FC<IProps> = ({ className, title, actions }) => (
  <Styled.Container className={className}>
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
