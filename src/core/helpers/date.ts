/** Funções auxiliares para lidar com datas. */
export const DATE = {
  /**
   * Retorna o ano atual.
   * Ex: 2021
   */
  currentYear: () => new Date().getFullYear(),

  /**
   * Formata uma data.
   * Ex: 3 de fevereiro de 2021 04:06 OU 3 de fevereiro de 2021 (se withTime = false)
   * Ex: 2021
   */
  formatToDisplay: (date: string, withTime = true) => (withTime
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date))
    : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(date))),
};