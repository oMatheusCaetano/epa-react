export interface DatasourceParams {
  onFinally?: (() => void);
}

export default abstract class Datasource {
  protected abstract endpoint(): string;
}
