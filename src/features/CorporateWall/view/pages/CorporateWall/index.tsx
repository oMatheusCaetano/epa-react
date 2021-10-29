import React, { useState } from 'react';

import { GetPosts, Withes, IListApiDatasourceFilters } from '~/features/CorporateWall/data/datasources/post';
import { IPost } from '~/features/CorporateWall/domain/models';
import { DATE } from '~/core/helpers';
import {
  Button,
  Datatable,
  FiltersContainer,
  Form,
  FormSubmit,
  ManagementUnitSelectType,
  PageContainer,
  SectionSeparator,
  TitleWithActions,
  ActionButtonType,
  ButtonType,
} from '~/core/view/components';

const CorporateWall: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState(initialFilters(true));

  function initialFilters(fromUseState = false): IListApiDatasourceFilters[] {
    const filters = [{
      column: 'orderBy',
      value: 'createdAt:desc',
    }];

    return !fromUseState
      ? filters
      : filters.concat([{
        column: 'createdAt',
        value: `${DATE.firstDayOfMonth()}to${DATE.today()}`,
      }]);
  }

  const onFilter: FormSubmit = (data) => {
    const newFilters: IListApiDatasourceFilters[] = initialFilters();

    for (const [column, value] of Object.entries(data)) {
      switch (column) {
        case 'startDate':
        case 'endDate':
          break;

        case 'dateType':
          newFilters.push({
            column: value === 'CREATED' ? 'createdAt' : 'publishedAt',
            value: `${data.startDate}to${data.endDate}`,
          });
          break;

        default:
          newFilters.push({ column, value });
      }
    }

    setFilters(newFilters);
  };

  return (
    <PageContainer>
      <TitleWithActions
        title="Mural Corporativo"
        actions={[
          {
            styleAs: ActionButtonType.FILTER,
            open: showFilters,
            onClick: () => setShowFilters(!showFilters),
          },
          {
            styleAs: ActionButtonType.CREATE,
            href: '/corporate-wall/create',
          },
        ]}
      />

      <FiltersContainer show={showFilters}>
        <Form
          className="p-2"
          onSubmit={onFilter}
          initialData={{
            startDate: DATE.firstDayOfMonth(),
            endDate: DATE.today(),
          }}
        >
          <div className="d-flex justify-content-between mb-4">
            <Form.Input name="ids" label="Código" type="number" className="col-1" />
            <Form.Input name="hasText" label="Contendo o texto" className="col-4" />
            <Form.Select
              className="col-3"
              name="category"
              label="Categoria"
              hideSearchInput
              options={[
                { value: 5, label: 'Geral' },
              ]}
            />
            <Form.ManagementUnit
              className="col-3"
              name="managementUnits"
              type={ManagementUnitSelectType.COMMUNICATES}
              multiple
            />
          </div>

          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex">
              <Form.Select
                className="col-4"
                name="dateType"
                label="Tipo de data"
                options={[
                  { value: 'CREATED', label: 'Data de Inclusão', selected: true },
                  { value: 'PUBLISHED', label: 'Data de Publicação' },
                ]}
              />
              <Form.Date name="startDate" label="Data inicial" className="mx-4" />
              <Form.Date name="endDate" label="Data final" />
            </div>

            <Button styleAs={ButtonType.SEARCH} />
          </div>
        </Form>
      </FiltersContainer>

      <Datatable
        title="Lista de postagens"
        datasource={new GetPosts()}
        // datasourceParams={{
        //   filters,
        //   with: { value: [Withes.CREATED_BY, Withes.CATEGORY] },
        // }}
        columns={[
          {
            name: 'Ações',
            data: 'id',
            width: '100px',
            selector: (post: IPost) => <button className="btn btn-primary btn-sm">Ações</button>,
          },
          {
            name: 'Código',
            data: 'id',
            width: '80px',
            selector: (post: IPost) => post.id,
          },
          {
            name: 'Título',
            data: 'description',
            width: '300px',
            selector: (post: IPost) => post.description,
          },
          {
            name: 'Categoria',
            data: 'category.description',
            width: '200px',
            selector: (post: IPost) => post.category?.description,
          },
          {
            name: 'Data de Inclusão',
            data: 'createdAt',
            width: '170px',
            selector: (post: IPost) => <Datatable.Date date={post.createdAt} withTime />,
          },
          {
            name: 'Data de Publicação',
            data: 'publishedAt',
            width: '170px',
            selector: (post: IPost) => <Datatable.Date date={post.publishedAt} />,
          },
          {
            name: 'Criada Por',
            data: 'createdBy.name',
            width: '250px',
            selector: (post: IPost) => <Datatable.User user={post.createdBy} />,
          },
        ]}
      />
    </PageContainer>
  );
};

export default CorporateWall;
