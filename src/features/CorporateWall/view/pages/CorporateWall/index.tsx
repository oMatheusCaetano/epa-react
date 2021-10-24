import React, { useEffect } from 'react';

import Datatable from '~/core/view/components/table/Datatable';
import GetPosts, { GetPostsWithes } from '~/features/CorporateWall/data/datasources/post/get-posts';
import IPost from '~/features/CorporateWall/domain/models/IPost';

const CorporateWall: React.FC = () => (
  <>
    <h1>asad</h1>
    <Datatable
      datasource={new GetPosts()}
      datasourceParams={{ with: { value: [GetPostsWithes.CREATED_BY] } }}
      columns={[
        {
          name: 'Id',
          width: '50px',
          selector: (post: IPost) => post.id,
        },
        {
          name: 'Descrição',
          width: '200px',
          selector: (post: IPost) => post.description,
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
          name: 'Criado por',
          selector: (post: IPost) => <Datatable.User user={post.createdBy} />,
        },
      ]}
    />
  </>
);

export default CorporateWall;
