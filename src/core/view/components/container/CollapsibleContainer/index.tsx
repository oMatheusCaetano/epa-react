import React from 'react';

export interface CollapsibleContainerProps {
  show?: boolean;
  className?: string;
  id?: string;
}

const CollapsibleContainer: React.FC<CollapsibleContainerProps> = ({
  show = false,
  className,
  id,
  children,
  ...rest
}) => (
  <div className={`collapse ${show ? 'show' : ''} ${className}`} id={id} {...rest}>
    {children}
  </div>
);

export default CollapsibleContainer;
