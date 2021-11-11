import React from 'react';

import { URL } from '~/core/domain/helpers';

import * as Styled from './styles';

export interface LinkProps {
  to?: string;
  href?: string;
  target?: string;
  className?: string;
  toLegacyEpa?: boolean;
}

const Link: React.FC<LinkProps> = ({ to, href, target, className, toLegacyEpa, children }) => {
  if (toLegacyEpa && href) {
    return (
      <Styled.HrefLink href={URL.makeEPAPageUrl(href)} className={className} target={target}>
        {children}
      </Styled.HrefLink>
    );
  }

  return (
    to && to.length
      ? (
        <Styled.ReactLink to={to} target={target} className={className}>
          {children}
        </Styled.ReactLink>
      ) : (
        <Styled.HrefLink href={href} target={target} className={className}>
          {children}
        </Styled.HrefLink>
      )
  );
};

export default Link;
