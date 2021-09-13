import { AxiosError } from 'axios';
import ApiDataSource, { IApiDataSourceClassParams } from '~/core/data/datasources/api/api-datasource';

export type IDeleteApiDataSourceParams = IApiDataSourceClassParams & {
  id: number;
  onSuccess?: (() => void);
}

export default abstract class DeleteApiDataSource
  extends ApiDataSource<null, null, IDeleteApiDataSourceParams> {
  exec(): Promise<void> {
    return this.http.delete(this.endpoint)
      .then(this.whenSucceed)
      .catch((error: AxiosError) => this.whenFail(this.convertError(error)))
      .finally(this.whenFinally);
  }

  protected convertToSend(): object { throw new Error('Method not implemented.'); }

  protected convert(): null { throw new Error('Method not implemented.'); }

  protected handleEndpoint() {
    this.endpoint = `${this.endpoint}/${this.params.id}?${this.queryParams}`;
  }

  protected whenSucceed = () => { if (this.params.onSuccess) this.params.onSuccess(); }
}
