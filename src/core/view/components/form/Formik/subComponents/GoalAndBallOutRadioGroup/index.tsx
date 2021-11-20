import React from 'react';

import * as S from './styles';

export interface GoalAndBallOutRadioGroupProps {
  name: string;
  className?: string;
}

const GoalAndBallOutRadioGroup: React.FC<GoalAndBallOutRadioGroupProps> = ({ name, className }) => (
  <S.Container label="Chute" className={className}>
    <S.Item name={name} label="Goool" value="GOL" />
    <S.Item name={name} label="Bola Fora" />
  </S.Container>
);

export default GoalAndBallOutRadioGroup;
