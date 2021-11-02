import React from 'react';

import { URL } from '~/core/helpers';

import * as Styled from './styles';

export interface IProps {
  to?: string;
  href?: string;
  className?: string;
  toLegacyEpa?: boolean;
}

const Link: React.FC<IProps> = ({ to, href, className, toLegacyEpa, children }) => {
  if (toLegacyEpa && href) {
    return (
      <Styled.HrefLink href={URL.makeEPAPageUrl(href)} className={className}>
        {children}
      </Styled.HrefLink>
    );
  }

  return (
    to && to.length
      ? (
        <Styled.ReactLink to={to} className={className}>{children}</Styled.ReactLink>
      ) : (
        <Styled.HrefLink href={href} className={className}>{children}</Styled.HrefLink>
      )
  );
};

export default Link;
