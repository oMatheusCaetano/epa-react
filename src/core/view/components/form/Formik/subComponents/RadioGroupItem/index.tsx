import React from 'react';
import { IconType } from 'react-icons';

import * as S from './styles';

export interface RadioGroupItemProps {
  name: string;
  id?: string;
  className?: string;
  label?: string | boolean | number;
  value?: string | boolean | number;
  style?: React.CSSProperties
  icon?: IconType;
  onClick?: () => void;
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  name,
  id,
  className,
  label,
  value,
  style,
  children,
  icon,
  onClick,
}) => {
  const Icon = icon;

  return (
    <S.Container className={className} id={id} style={style}>
      <S.Radio type="radio" name={name} value={value ?? label} onClick={onClick} />
      {Icon && <Icon fill="#fff" className="me-2" />}
      {label ?? children}
    </S.Container>
  );
};

export default RadioGroupItem;
