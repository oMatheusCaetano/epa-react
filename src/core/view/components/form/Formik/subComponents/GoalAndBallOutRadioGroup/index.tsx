import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import * as S from './styles';

export interface GoalAndBallOutRadioGroupProps {
  name: string;
  error?: string;
  className?: string;
  onGoal?: () => void;
  onBallOut?: () => void;
}

const GoalAndBallOutRadioGroup: React.FC<GoalAndBallOutRadioGroupProps> = ({
  name,
  className,
  error,
  onBallOut,
  onGoal,
}) => (
  <S.Container label="Chute" name={name} className={className} error={error}>
    <S.Item name={name} label="Goool" icon={FaThumbsUp} value="1" onClick={onGoal} />
    <S.Item name={name} label="Bola Fora" icon={FaThumbsDown} value="0" onClick={onBallOut} />
  </S.Container>
);

export default GoalAndBallOutRadioGroup;
