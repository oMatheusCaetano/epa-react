// TODO: Implementar comunicação com a API
import { AxiosError } from 'axios';
import ApiDataSource, { IApiDataSourceClassParams } from '~/core/data/datasources/api/api-datasource';
import IUserHumor, { IUserHumorData } from '~/features/GrossInternalHappiness/domain/models/IUserHumor';

interface ApiData {
  codigo: number;
}

interface ISaveUserHumorParams extends IApiDataSourceClassParams {
  humor: IUserHumorData;
  onSuccess?: ((data: IUserHumor) => void);
}

class SaveUserHumor extends ApiDataSource<IUserHumor, ApiData, ISaveUserHumorParams> {
  protected setEndpoint() { this.endpoint = ''; }

  exec() {
    return this.http.post<ApiData>(this.endpoint, this.convertToSend())
      .then(({ data }) => this.whenSucceed(data))
      .catch((error: AxiosError) => this.whenFail(this.convertError(error)))
      .finally(this.whenFinally);
  }

  protected convertToSend(): object { throw new Error('Method not implemented.'); }

  protected convert(data: ApiData): IUserHumor { throw new Error('Method not implemented.'); }

  protected whenSucceed = (data: ApiData) => {
    if (this.params.onSuccess) {
      this.params.onSuccess(this.convert(data));
    }
  }
}

export default SaveUserHumor;
