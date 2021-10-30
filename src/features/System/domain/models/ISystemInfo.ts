interface ISystemInfo {
  host: string,
  version: string,
  companyCode: string,
  companyLogo: string,
  epaLogo: string,
  wikiLogo: string,
  uploadMaxFileSize: {
    size: number,
    unity: string,
    symbol: string
  }
}

export default ISystemInfo;
