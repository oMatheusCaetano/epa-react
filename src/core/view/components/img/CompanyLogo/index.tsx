/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useAppStore } from '~/core/hooks';
import { Image, Link } from '~/core/view/components';

const CompanyLogo: React.FC = () => {
  const { store } = useAppStore();

  return (
    <Link className="navbar-brand" href="principal.php" toLegacyEpa>
      <Image
        fromEpa
        style={{ maxHeight: '50px', maxWidth: '100px' }}
        alt={store.SYSTEM.systemInfo.companyCode}
        src={store.SYSTEM.systemInfo.companyLogo}
      />
    </Link>
  );
};

export default CompanyLogo;
