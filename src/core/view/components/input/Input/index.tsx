import React from 'react';

// import { Container } from './styles';

import * as C from '~/core/view/components';

export interface InputProps {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className,
  type = 'text',
  ...rest
}) => (
  <div className={className}>
    <C.Label label={label} htmlFor={id} />
    <input id={id} className="form-input-style" {...rest} type={type} />
    <C.SmallText error={error} />
  </div>
);

export default Input;
