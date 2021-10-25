export const DATE = {
  /**
  * Ex: 2021-09-07
  */
  today: () => `${DATE.currentYear()}-${DATE.currentMonth()}-${DATE.currentDay()}`,

  /**
  * Ex: 2021-10-01
  */
  firstDayOfMonth: () => `${DATE.currentYear()}-${DATE.currentMonth()}-01`,

  /**
  * Ex: 2021
  */
  currentYear: () => new Date().getFullYear(),

  /**
  * Ex: 09
  */
  currentDay: () => DATE.handleZero(new Date().getDate()),

  /**
  * Ex: 08
  */
  currentMonth: () => DATE.handleZero(new Date().getMonth()),

  /**
  * Ex: 3 de fevereiro de 2021 04:06 OR 3 de fevereiro de 2021 (withTime = false)
  */
  formatToDisplay: (date: string, withTime = true) => (withTime
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date))
    : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(date))),

  handleZero(value: string|number) {
    return String(value).length === 1 ? `0${value}` : value;
  },
};
