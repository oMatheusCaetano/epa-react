export interface IDatasourceParams {
  onFinally?: (() => void);
}

export default abstract class Datasource<Model, ApiData> {
  abstract getEndpoint(): string;

  abstract fromApi(data: ApiData): Model;

  abstract exec(params: IDatasourceParams): Promise<void>;

  protected convertFieldName(fieldName: string) {
    switch (fieldName.toLocaleUpperCase()) {
      case 'CREATEDAT':
      case 'CREATED_AT':
        return 'data_inclusao';

      case 'CREATEDBY':
      case 'CREATED_BY':
        return 'usuario_inclusao';

      case 'CATEGORY':
        return 'categoria';

      case 'DESCRIPTION':
        return 'descricao';

      case 'MANAGEMENTUNIT':
      case 'MANAGEMENT_UNIT':
        return 'unidade_gerencial';

      case 'MANAGEMENTUNITS':
      case 'MANAGEMENT_UNITS':
        return 'unidades_gerenciais';

      case 'NAME':
        return 'nome';

      case 'UPDATEDAT':
      case 'UPDATED_AT':
        return 'data_alteracao';

      case 'UPDATEDBY':
      case 'UPDATED_BY':
        return 'usuario_alteracao';

      case 'TITLE':
        return 'titulo';

      default:
        return fieldName;
    }
  }
}
