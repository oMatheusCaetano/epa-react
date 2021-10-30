/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useAppStore } from '~/core/hooks';
import { Image } from '~/core/view/components';

const CompanyLogo: React.FC = () => {
  const { store } = useAppStore();

  return (
    <a className="navbar-brand" href="#">
      <Image
        fromEpa
        style={{ maxHeight: '50px', maxWidth: '100px' }}
        alt={store.SYSTEM.systemInfo.companyCode}
        src={store.SYSTEM.systemInfo.companyLogo}
      />
    </a>
  );
};

export default CompanyLogo;
