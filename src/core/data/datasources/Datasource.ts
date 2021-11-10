export interface DatasourceParams {
  onFinally?: (() => void);
}

export default abstract class Datasource<Params> {
  protected abstract endpoint(params: Params): string;

  abstract exec(params: Params): Promise<void>;

  protected handleQueryParam(params: string, param: string) {
    if (!param.length) return params;
    return params.startsWith('?') ? `${params}&${param}` : `?${param}`;
  }
}
