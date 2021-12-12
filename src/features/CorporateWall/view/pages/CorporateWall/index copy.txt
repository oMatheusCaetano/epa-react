/* eslint-disable no-alert */
import React, { useState } from 'react';
import { QueryParams } from '~/core/data/datasources/GetDatasource';
import { URL } from '~/core/domain/helpers';

import * as C from '~/core/view/components';
import { GetPosts } from '~/features/CorporateWall/data/datasources/post';
import { Post, PostCategory } from '~/features/CorporateWall/domain/models';
import { User } from '~/features/Users/domain/models';

const CorporateWall: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [getPostsDatasourceParams, setGetPostsDatasourceParams] = useState<QueryParams>({
    with: ['usuario_inclusao', 'categoria'],
  });

  function deletePost() {
    alert('Deletar post');
  }

  function printPost() {
    alert('Imprimir post');
  }

  function onFilter(values: C.FormikValues) {
    setGetPostsDatasourceParams({
      ...getPostsDatasourceParams,
      filters: [
        { field: 'unidades_gerenciais', value: values.unidades_gerenciais },
        { field: 'text', value: values.text },
        { field: 'codigo', value: values.codigo },
        { field: values.tipo_data, value: values.codigo },
      ],
    });
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
          onSubmit={onFilter}
          initialValues={{
            text: '',
            codigo: '',
            unidades_gerenciais: '',
            tipo_data: 'data_inclusao',
          }}
        >
          {/* <C.Formik.ManagementUnitSelect
            multiple
            name="unidades_gerenciais"
            unitType={ManagementUnitHierarchyType.STRATEGY}
          /> */}

          <div className="d-flex justify-content-between mt-2">
            <div className="input-append date" id="dp3" data-date="12-02-2012" data-date-format="dd-mm-yyyy">
              <input className="span2" size={16} type="text" value="12-02-2012" />
              <span className="add-on"><i className="icon-th" /></span>
            </div>
            <C.Formik.Input
              className="col-1"
              label="Código"
              name="codigo"
              type="number"
            />

            <C.Formik.Select
              multiple
              className="col-3"
              label="Categoria"
              name="categoria"
              options={[
                { value: '', label: 'Todas' },
              ]}
            />

            <C.Formik.Select
              multiple
              className="col-3"
              label="Categoria"
              name="categoria"
              options={[
                { value: '', label: 'Todas' },
              ]}
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
                { value: 'data_inclusao', label: 'Data de Inclusão' },
                { value: 'data_publicacao', label: 'Data de Publicação' },
              ]}
            />

            <C.Formik.Select
              className="me-4"
              label="Tipo de Data"
              name="tipo_data"
              options={[
                { value: 'data_inclusao', label: 'Data de Inclusão' },
                { value: 'data_publicacao', label: 'Data de Publicação' },
              ]}
            />

            <C.Formik.Select
              label="Tipo de Data"
              name="tipo_data"
              options={[
                { value: 'data_inclusao', label: 'Data de Inclusão' },
                { value: 'data_publicacao', label: 'Data de Publicação' },
              ]}
            />
          </div>

          <C.Formik.Search className="ms-auto my-2" />
        </C.Formik>
    )}
    >
      <C.SectionContainer title="Lista de postagens">
        <C.DataTable
          datasource={new GetPosts()}
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
