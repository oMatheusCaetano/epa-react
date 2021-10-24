import React from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { PageContainer, TitleWithActions, SectionSeparator, Datatable } from '~/core/view/components';
import GetPosts, { GetPostsWithes } from '~/features/CorporateWall/data/datasources/post/get-posts';
import IPost from '~/features/CorporateWall/domain/models/IPost';

const CorporateWall: React.FC = () => (
  <PageContainer>
    <TitleWithActions
      title="Mural Corporativo"
      actions={[
        { icon: FaFilter, className: 'btn-light' },
        { icon: FaPlus, className: 'btn-primary ml-2' },
      ]}
    />
    <SectionSeparator title="Lista de Postagens" className="my-2" />
    <Datatable
      datasource={new GetPosts()}
      datasourceParams={{ with: { value: [GetPostsWithes.CREATED_BY, GetPostsWithes.CATEGORY] } }}
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

export default CorporateWall;
