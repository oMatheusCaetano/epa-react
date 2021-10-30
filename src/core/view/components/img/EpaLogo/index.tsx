/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useAppStore } from '~/core/hooks';
import { Image } from '~/core/view/components';

const EpaLogo: React.FC = () => {
  const { store } = useAppStore();

  return (
    <Image
      title={`Versão: ${store.SYSTEM.systemInfo.version}`}
      fromEpa
      style={{ maxHeight: '40px', maxWidth: '100px' }}
      alt={store.SYSTEM.systemInfo.version}
      src={store.SYSTEM.systemInfo.epaLogo}
    />
  );
};

export default EpaLogo;
