import React, { useState } from 'react';
import { QueryParams } from '~/core/data/datasources/GetDatasource';
import { URL } from '~/core/domain/helpers';

import { ManagementUnitHierarchyType } from '~/features/ManagementUnits/domain/stores/management-unit';

// import { Container } from './styles';
import * as C from '~/core/view/components';
import { GetPosts } from '~/features/CorporateWall/data/datasources/post';
import { Post, PostCategory } from '~/features/CorporateWall/domain/models';
import { User } from '~/features/Users/domain/models';

const CorporateWall: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [getPostsDatasourceParams, setGetPostsDatasourceParams] = useState<QueryParams>({
    with: ['usuario_inclusao', 'categoria'],
  });

  function onFilter(values: C.FormikValues) {
    setGetPostsDatasourceParams({
      ...getPostsDatasourceParams,
      filters: [
        { field: 'codigo', value: values.codigo },
        { field: 'unidades_gerenciais', value: values.unidades_gerenciais },
        { field: 'text', value: values.text },
        { field: values.tipo_data, value: values.codigo },
      ],
    });
  }

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
      filters={(
        <C.Formik
          initialValues={{
            codigo: '',
            text: '',
            tipo_data: 'data_inclusao',
          }}
          onSubmit={onFilter}
        >

          <div className="d-flex">
            <C.Formik.Input
              className="col-1"
              label="C??digo"
              name="codigo"
              type="number"
            />

            <C.Formik.ManagementUnitSelect
              multiple
              name="unidades_gerenciais"
              unitType={ManagementUnitHierarchyType.STRATEGY}
            />

            <C.Formik.Input
              className="col-4"
              label="Contendo o texto"
              name="text"
            />
          </div>

          <div className="d-flex mt-3">
            <C.Formik.Select
              className="me-4"
              label="Tipo de Data"
              name="tipo_data"
              options={[
                { value: 'data_inclusao', label: 'Data de Inclus??o' },
                { value: 'data_publicacao', label: 'Data de Publica????o' },
              ]}
            />

            <C.Formik.Select
              className="me-4"
              label="Tipo de Data"
              name="tipo_data"
              options={[
                { value: 'data_inclusao', label: 'Data de Inclus??o' },
                { value: 'data_publicacao', label: 'Data de Publica????o' },
              ]}
            />

            <C.Formik.Select
              label="Tipo de Data"
              name="tipo_data"
              options={[
                { value: 'data_inclusao', label: 'Data de Inclus??o' },
                { value: 'data_publicacao', label: 'Data de Publica????o' },
              ]}
            />
          </div>

          <C.Formik.Search className="my-2 ms-auto" />
        </C.Formik>
    )}
    >
      <C.SectionContainer title="Lista de Postagens">
        <C.DataTable
          datasource={new GetPosts()}
          datasourceParams={getPostsDatasourceParams}
          columns={[
            {
              title: 'A????es',
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
              title: 'C??digo',
              render: (row: Post) => row.codigo,
            },
            {
              title: 'T??tulo',
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
              title: 'Data de Inclus??o',
              render: (row: Post) => <C.DataTable.Date date={row.data_inclusao} />,
            },
            {
              title: 'Data de Publica????o',
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
