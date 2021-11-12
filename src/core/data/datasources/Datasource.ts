export interface DatasourceParams {
  onFinally?: (() => void);
}

export default abstract class Datasource<Params> {
  protected params = {} as Params;

  protected abstract endpoint(params: Params): string;

  abstract execute(params: Params): Promise<void>;

  exec(params: Params): Promise<void> {
    this.params = params;
    return this.execute(params);
  }

  refresh(): Promise<void> {
    return this.execute(this.params);
  }

  protected handleQueryParam(params: string, param: string) {
    if (!param.length) return params;
    return params.startsWith('?') ? `${params}&${param}` : `?${param}`;
  }
}
