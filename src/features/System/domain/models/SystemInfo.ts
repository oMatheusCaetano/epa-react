interface SystemInfo {
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

export default SystemInfo;
