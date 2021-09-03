import api from '~/services/apis/epa';

import * as dto from '~/features/CorporateWall/data/DTOs/ipost.dto';
import IPost from '~/features/CorporateWall/data/models/IPost.model';

export interface IPaginatedPosts { posts: IPost[], perPage: number, page: number, total: number }

interface IGetPostsParams {
  pagination?: { perPage?: number; page?: number; }
  onSuccess(data: IPaginatedPosts): void;
  onError(errorMessage?: string): void;
}

export async function getPosts({
  pagination = { perPage: 10, page: 1 },
  onError,
  onSuccess,
}: IGetPostsParams): Promise<void> {
  let apiResponseData = null;
  try {
    const paginationParams = `paginated=true&page=${pagination.page}`;
    const withParams = 'with=usuario_inclusao,usuario_alteracao,categoria';
    const { data } = await api.get(`comunicacao-mural?${paginationParams}&${withParams}`);
    apiResponseData = data;
  } catch ({ response }) {
    onError(response?.data?.error);
    return;
  }

  console.log(apiResponseData.data[0]);
  const posts = apiResponseData.data.map((post: object) => dto.fromApiResponse(post));

  onSuccess({
    posts,
    perPage: apiResponseData.per_page,
    page: apiResponseData.current_page,
    total: apiResponseData.total,
  });
}
