import React, { useEffect, useState } from 'react';

import { GetPosts, Withes } from '~/features/CorporateWall/data/datasources/post';
import { IPost } from '~/features/CorporateWall/domain/models';
import { DT_FILTER } from '~/core/helpers';
import { useAppStore } from '~/core/hooks';
import { getPostsCategories } from '~/features/CorporateWall/domain/store';
import {
  Button,
  Datatable,
  FiltersContainer,
  Form,
  FormSubmit,
  ManagementUnitSelectType,
  PageContainer,
  TitleWithActions,
  ActionButtonType,
  ButtonType,
} from '~/core/view/components';

const CorporateWall: React.FC = () => {
  const { store, dispatch } = useAppStore();
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState(initialFilters());

  function initialFilters() {
    // return handleFixedFilters().concat([DT_FILTER.currentMonthPeriod('createdAt')]);
    return handleFixedFilters().concat([]);
  }

  function handleFixedFilters() {
    return [DT_FILTER.orderBy('createdAt:desc')];
  }

  const onFilter: FormSubmit = (data) => {
    const newFilters = handleFixedFilters();

    for (const [column, value] of Object.entries(data)) {
      switch (column) {
        case 'dateType':
          newFilters.push(DT_FILTER.datePeriod(
            value === 'CREATED' ? 'createdAt' : 'publishedAt',
            data.startDate,
            data.endDate,
          ));
          break;

        case 'startDate':
        case 'endDate':
          break;

        default:
          newFilters.push({ column, value: String(value) });
      }
    }

    setFilters(newFilters);
  };

  useEffect(() => {
    dispatch(getPostsCategories());
  }, []);

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
            // startDate: DATE.firstDateOfMonth(DateFormat.PT_BR),
            // endDate: DATE.today(DateFormat.PT_BR),
          }}
        >
          <div className="d-flex justify-content-between mb-4">
            <Form.Input name="id" label="Código" type="number" className="col-1" />
            <Form.Input name="text" label="Contendo o texto" className="col-4" />
            <Form.Select
              className="col-3"
              name="category"
              label="Categoria"
              hideSearchInput
              options={store.CORPORATE_WALL.postsCategories.map(({ id, title }) => (
                { value: id, label: title }
              ))}
            />
            <Form.ManagementUnit
              className="col-3"
              name="managementUnits"
              type={ManagementUnitSelectType.COMMUNICATES}
              multiple
            />
          </div>

          <div className="d-flex justify-content-between align-items-end">
            {/* <div className="d-flex">
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
            </div> */}

            <Button styleAs={ButtonType.SEARCH} />
          </div>
        </Form>
      </FiltersContainer>

      <Datatable
        title="Lista de postagens"
        datasource={new GetPosts()}
        datasourceParams={{ filters, with: { value: [Withes.CREATED_BY, Withes.CATEGORY] } }}
        columns={[
          {
            name: 'Ações',
            data: 'id',
            width: '100px',
            selector: () => <Datatable.Actions />,
          },
          {
            name: 'Código',
            data: 'id',
            width: '80px',
            selector: (post: IPost) => post.id,
          },
          {
            name: 'Título',
            data: 'title',
            width: '300px',
            selector: (post: IPost) => post.title,
          },
          {
            name: 'Categoria',
            data: 'category.description',
            width: '200px',
            selector: (post: IPost) => post.category?.title,
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
