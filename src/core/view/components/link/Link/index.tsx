import React from 'react';

import * as Styled from './styles';

export interface IProps {
  to?: string;
  href?: string;
}

const Link: React.FC<IProps> = ({ to, href, children }) => (
  to && to.length
    ? (
      <Styled.ReactLink to={to}>{children}</Styled.ReactLink>
    ) : (
      <Styled.HrefLink href={href}>{children}</Styled.HrefLink>
    )
);

export default Link;
