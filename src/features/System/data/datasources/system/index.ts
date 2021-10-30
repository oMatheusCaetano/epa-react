import { ISystemInfo } from '~/features/System/domain/models';

export type { default as ISystemInfo } from '~/features/System/domain/models/ISystemInfo';
export * from './get-system-info-datasource';
export { default as GetSystemInfo } from './get-system-info-datasource';

export interface ApiData {
  host: string,
  version: string,
  codigo_empresa_session: string,
  companyLogo: string,
  epaLogo: string,
  wikiLogo: string,
  upload_max_filesize: {
    size: number,
    unity: string,
    symbol: string
  }
}

export function fromApi(data: ApiData): ISystemInfo {
  return {
    ...data,
    companyCode: data.codigo_empresa_session,
    uploadMaxFileSize: data.upload_max_filesize,
  };
}
