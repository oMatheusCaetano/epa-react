import React from 'react';
import { FaSearch } from 'react-icons/fa';

import * as Styled from './styles';

export enum ButtonType {
  SEARCH,
}

type Props = JSX.IntrinsicElements['button'] & {
  className?: string;
  size?: string;
  loading?: boolean;
  buttonType?: ButtonType;
}

const Button: React.FC<Props> = ({
  className,
  children,
  size = 'sm',
  title,
  loading = false,
  buttonType,
  ...rest
}) => {
  if (buttonType === ButtonType.SEARCH) {
    return (
      <button
        className={`btn btn-success d-flex align-items-center btn-${size} ${className}`}
        title={title}
        disabled={loading}
        {...rest}
      >
        <FaSearch fill="white" className="me-2" />
        {children ?? 'Pesquisar'}
      </button>
    );
  }

  return (
    <button
      className={`btn btn-${size} ${className}`}
      title={title}
      disabled={loading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
