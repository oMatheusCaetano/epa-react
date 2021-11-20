import React from 'react';

import * as S from './styles';

export interface RadioGroupItemProps {
  name: string;
  id?: string;
  className?: string;
  label?: string | boolean | number;
  value?: string | boolean | number;
  style?: React.CSSProperties
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  name,
  id,
  className,
  label,
  value,
  style,
  children,
}) => (
  <S.Container className={className} id={id} style={style}>
    <S.Radio type="radio" name={name} value={value ?? label} />
    {label ?? children}
  </S.Container>
);

export default RadioGroupItem;
