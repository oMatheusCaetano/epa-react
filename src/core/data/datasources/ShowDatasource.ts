import GetDatasource, { GetDatasourceParams } from '~/core/data/datasources/GetDatasource';

export interface ShowDatasourceParams<Model> extends GetDatasourceParams<Model> {
  id: number;
}

export default abstract class ShowDatasource<Model> extends GetDatasource<Model> {
  exec(params: ShowDatasourceParams<Model>): Promise<void> {
    this.params = params;
    return this.execute(params);
  }
}
