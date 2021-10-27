import { IManagementUnitHierarchy } from '~/features/ManagementUnits/domain/models';

export * from '~/core/data/datasources/api/list-api-datasource';

export interface ApiData {
  codigo: number,
  descricao: string,
  uen: boolean|number,
  filho: ApiData[],
}

export function fromJson(data: ApiData): IManagementUnitHierarchy {
  return {
    ...data,
    id: data.codigo,
    name: data.descricao,
    uen: !!data.uen,
    children: data.filho.length ? data.filho.map(fromJson) : [],
  };
}
