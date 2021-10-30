/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useAppStore } from '~/core/hooks';
import { Image } from '~/core/view/components';

export interface IWikiLogoProps {
  className?: string;
}

const WikiLogo: React.FC<IWikiLogoProps> = ({ className }) => {
  const { store } = useAppStore();

  return (
    <a
      className={`navbar-brand ${className}`}
      href="https://wiki.simeon.com.br/"
      target="_blank"
      title="Base de conhecimento"
    >
      <Image
        fromEpa
        style={{ maxHeight: '30px', maxWidth: '30px' }}
        src={store.SYSTEM.systemInfo.wikiLogo}
      />
    </a>
  );
};

export default WikiLogo;
