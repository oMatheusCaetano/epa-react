import React, { useState } from 'react';
import { QueryParams } from '~/core/data/datasources/GetDatasource';

import * as C from '~/core/view/components';
import { GetPosts } from '~/features/CorporateWall/data/datasources/post';
import { Post, PostCategory } from '~/features/CorporateWall/domain/models';
import { User } from '~/features/Users/domain/models';

const CorporateWall: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const getPostsDatasource = new GetPosts();
  const getPostsDatasourceParams: QueryParams = {
    with: ['usuario_inclusao', 'categoria'],
  };

  return (
    <C.PageContainer
      title="Mural Corporativo"
      showFilters={showFilters}
      actions={(
        <>
          <C.IconButton
            showFilters={showFilters}
            styleAs={C.IconButtonType.FILTER}
            onClick={() => setShowFilters(!showFilters)}
          />
          <C.Link href="comunicacao_mural.php" toLegacyEpa>
            <C.IconButton styleAs={C.IconButtonType.CREATE} className="ms-2" />
          </C.Link>
        </>
      )}
    >
      <C.SectionContainer title="Lista de postagens">
        <C.DataTable
          datasource={getPostsDatasource}
          datasourceParams={getPostsDatasourceParams}
          columns={[
            {
              title: 'Ações',
              render: (row: Post) => row.codigo,
            },
            {
              title: 'Código',
              render: (row: Post) => row.codigo,
            },
            {
              title: 'Título',
              render: (row: Post) => <span>{row.titulo}</span>,
            },
            {
              title: 'Categoria',
              render: (row: Post) => {
                const categoria = row.categoria as PostCategory;
                return categoria?.descricao;
              },
            },
            {
              title: 'Data de Inclusão',
              render: (row: Post) => row.data_inclusao,
            },
            {
              title: 'Data de Publicação',
              render: (row: Post) => row.data_inclusao,
            },
            {
              title: 'Criado Por',
              render: (row: Post) => {
                const usuario_inclusao = row.usuario_inclusao as User;
                return usuario_inclusao?.cliente?.nome;
              },
            },
          ]}
        />
      </C.SectionContainer>
    </C.PageContainer>
  );
};

export default CorporateWall;
