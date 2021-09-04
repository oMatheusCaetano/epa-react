import React from 'react';

import * as Styled from './styles';

interface Props {
  className?: string;
  size?: string;
}

const Button: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({ className, children, size = 'sm', onClick }) => (
  <Styled.Button className={`btn btn-${size} ${className}`} onClick={onClick}>
    {children}
  </Styled.Button>
);

export default Button;
