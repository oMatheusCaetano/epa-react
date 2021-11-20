import React from 'react';

import * as C from '~/core/view/components';
import * as S from './styles';

export interface RadioGroupProps {
  id?: string;
  className?: string;
  label?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ id, className, label, children, ...rest }) => (
  <div className={className} id={id} role="group" aria-labelledby={id} {...rest}>
    <C.Label label={label} />
    <S.ChildrenContainer>
      {children}
    </S.ChildrenContainer>
  </div>
);

export default RadioGroup;
