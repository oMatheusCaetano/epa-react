import React from 'react';

type Props = JSX.IntrinsicElements['button'] & {
  className?: string;
  size?: string;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  className,
  children,
  size = 'sm',
  title,
  loading = false,
  ...rest
}) => (
  (
    <button
      className={`btn btn-${size} ${className}`}
      title={title}
      disabled={loading}
      {...rest}
    >
      {children}
    </button>
  )
);

export default Button;
