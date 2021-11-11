import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { PageContainer, IconButton, IconButtonType, Link } from '~/core/view/components';

const CorporateWall: React.FC = () => (
  <PageContainer
    title="Mural Corporativo"
    pageActions={(
      <>
        <IconButton icon={FaFilter} />
        <Link href="comunicacao_mural.php" toLegacyEpa>
          <IconButton styleAs={IconButtonType.CREATE} className="ms-2" />
        </Link>
      </>
    )}
  />
);

export default CorporateWall;
