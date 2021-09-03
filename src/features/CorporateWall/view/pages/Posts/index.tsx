import React, { useState, useEffect, useContext } from 'react';
// import { FaPlus, FaFilter } from 'react-icons/fa';

import DataTable from '~/core/view/components/table/Datatable';
import PostsContext from '~/features/CorporateWall/domain/stores/posts.store';

import SectionSeparator from '~/core/view/components/misc/SectionSeparator';
import TitleWithActions from '~/core/view/components/misc/TitleWithActions';
import IPost from '~/features/CorporateWall/data/models/IPost.model';

const App: React.FC = () => {
  const store = useContext(PostsContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    store.getPosts({ page });
  }, [page]);

  if (!store.paginatedPosts?.posts) {
    return <h1>Sem posts</h1>;
  }

  return (
    <div className="p-2">
      <TitleWithActions title="Mural Corporativo" />
      <SectionSeparator title="Lista de Mensagens" />
      <DataTable
        data={store.paginatedPosts.posts}
        total={store.paginatedPosts.total}
        perPage={store.paginatedPosts.perPage}
        onChangePage={(page: number) => setPage(page)}
        columns={[
          {
            name: 'Código',
            sortable: true,
            cell: ({ id }: IPost) => id,
          },
          {
            name: 'Título',
            sortable: true,
            cell: ({ title }: IPost) => title,
          },
          {
            name: 'Categoria',
            sortable: true,
            cell: ({ category }: IPost) => category.name,
          },
          {
            name: 'Usuário Inclusão',
            sortable: true,
            cell: ({ createdBy }: IPost) => createdBy.name,
          },
        ]}
      />
    </div>
  );
};

export default App;
