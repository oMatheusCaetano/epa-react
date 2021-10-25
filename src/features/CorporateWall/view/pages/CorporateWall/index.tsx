import React, { useState } from 'react';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { IListApiDatasourceFilters } from '~/core/data/datasources/api/list-api-datasource';
import { DATE } from '~/core/helpers';
import { PageContainer, TitleWithActions, SectionSeparator, Datatable, FiltersContainer, Input, Button, Select, ManagementUnitSelect } from '~/core/view/components';
import { ActionButtonType } from '~/core/view/components/button/ActionButton';
import { ManagementUnitSelectTypes } from '~/core/view/components/input/ManagementUnitSelect';
import { GetPosts, Withes } from '~/features/CorporateWall/data/datasources/post';
import { IPost } from '~/features/CorporateWall/domain/models';

const CorporateWall: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(initialFilters(true));

  function initialFilters(firstTime = false): IListApiDatasourceFilters[] {
    const filters = [{
      column: 'orderBy',
      value: 'createdAt:desc',
    }];

    return !firstTime
      ? filters
      : filters.concat([{
        column: 'createdAt',
        value: `${DATE.firstDayOfMonth()}to${DATE.today()}`,
      }]);
  }

  const onFilter: SubmitHandler = (data) => {
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
            type: ActionButtonType.FILTER,
            onClick: () => setShowFilters(!showFilters),
          },
          { type: ActionButtonType.CREATE },
        ]}
      />

      <FiltersContainer show={showFilters}>
        <Form onSubmit={onFilter}>
          <Input name="id" label="Código" type="number" />
          <Input name="hasText" label="Contendo o Texto" />
          <ManagementUnitSelect name="managementUnit" type={ManagementUnitSelectTypes.COMMUNICATES} />
          <Select
            name="category"
            label="Categoria"
            options={[
              {
                selected: true,
                label: 'Geral',
                value: '1',
              },
            ]}
          />
          <Select
            hideSearchInput
            name="dateType"
            label="Tipo de Data"
            options={[
              {
                selected: true,
                label: 'Data de Inclusão',
                value: 'CREATED',
              },
              {
                label: 'Data de Publicação',
                value: 'PUBLISH',
              },
            ]}
          />
          <Input name="startDate" label="Data Inicial" type="date" />
          <Input name="endDate" label="Data Final" type="date" />
          <Button type="submit" className="btn-primary">asdas</Button>
        </Form>
      </FiltersContainer>

      <SectionSeparator title="Lista de Postagens" className="my-2" />
      <Datatable
        datasource={new GetPosts()}
        datasourceParams={{
          filters,
          with: { value: [Withes.CREATED_BY, Withes.CATEGORY] },
        }}
        columns={[
          {
            name: 'Ações',
            width: '100px',
            selector: (post: IPost) => <button className="btn btn-primary btn-sm">Ações</button>,
          },
          {
            name: 'Código',
            width: '80px',
            selector: (post: IPost) => post.id,
          },
          {
            name: 'Título',
            width: '300px',
            selector: (post: IPost) => post.description,
          },
          {
            name: 'Categoria',
            width: '200px',
            selector: (post: IPost) => post.category?.description,
          },
          {
            name: 'Data de Inclusão',
            width: '170px',
            selector: (post: IPost) => <Datatable.Date date={post.createdAt} withTime />,
          },
          {
            name: 'Data de Publicação',
            width: '170px',
            selector: (post: IPost) => <Datatable.Date date={post.publishedAt} />,
          },
          {
            name: 'Criada Por',
            width: '250px',
            selector: (post: IPost) => <Datatable.User user={post.createdBy} />,
          },
        ]}
      />
    </PageContainer>
  );
};

export default CorporateWall;
