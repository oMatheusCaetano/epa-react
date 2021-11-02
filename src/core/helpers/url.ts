export const URL = {
  origin: () => (process.env.REACT_APP_ORIGIN?.length
    ? process.env.REACT_APP_ORIGIN
    : window.location.origin),

  /**
  * @return /epavalidacao/ OR /epa/
  */
  epaEnv: () => (window.location.href.includes('/epavalidacao/') ? '/epavalidacao/' : '/epa/'),

  makeEPAPageUrl: (href: string) => URL.origin() + URL.epaEnv() + href,
};
