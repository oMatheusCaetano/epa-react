/* eslint-disable no-alert */
import React, { useState } from 'react';
import { QueryParams } from '~/core/data/datasources/GetDatasource';
import { URL } from '~/core/domain/helpers';

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

  function deletePost() {
    alert('Deletar post');
  }

  function printPost() {
    alert('Imprimir post');
  }

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
              render: (row: Post) => (
                <C.DataTable.Actions
                  actions={[
                    {
                      label: 'Editar',
                      onClick: () => URL.openToEpaPage(`comunicacao_mural.php?codigo=${row.codigo}&action=2`),
                    },
                    { label: 'Excluir', onClick: deletePost },
                    { label: 'Imprimir', onClick: printPost },
                  ]}
                />
              ),
            },
            {
              title: 'Código',
              render: (row: Post) => row.codigo,
            },
            {
              title: 'Título',
              render: (row: Post) => row.titulo,
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
              render: (row: Post) => <C.DataTable.Date date={row.data_inclusao} />,
            },
            {
              title: 'Data de Publicação',
              render: (row: Post) => <C.DataTable.Date date={row.data_publicacao} />,
            },
            {
              title: 'Criado Por',
              render: (row: Post) => <C.DataTable.User user={row.usuario_inclusao as User} />,
            },
          ]}
        />
      </C.SectionContainer>
    </C.PageContainer>
  );
};

export default CorporateWall;
