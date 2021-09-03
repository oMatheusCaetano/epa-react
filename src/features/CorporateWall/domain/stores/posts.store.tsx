import React, { createContext, useState } from 'react';
import * as postDatasource from '~/features/CorporateWall/data/datasources/post.datasource';

interface IGetPostsParams {
  page?: number;

}

export interface IPostsContextState {
  paginatedPosts: postDatasource.IPaginatedPosts | null;
  error: string;
  getPosts(params: IGetPostsParams): Promise<void>;
}

const PostsContext = createContext({} as IPostsContextState);
export default PostsContext;

export const PostsProvider: React.FC = ({ children }) => {
  const [error, setError] = useState('');
  const [paginatedPosts, setPaginatedPosts] = useState({} as postDatasource.IPaginatedPosts);

  async function getPosts({ page = 1 }: IGetPostsParams) {
    await postDatasource.getPosts({
      pagination: { page },
      onSuccess: setPaginatedPosts,
      onError: (errorMessage) => setError(errorMessage || 'Houve um erro ao carregar a lista de postagens'),
    });
  }

  return (
    <PostsContext.Provider value={{ paginatedPosts, error, getPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
