export enum DateFormat {
  EN = 'Y-m-d',
  PT_BR = 'd/m/Y',
}

export const DATE = {
  /**
  * Ex: 2021-09-07
  */
  today(format = DateFormat.EN) {
    switch (format) {
      case DateFormat.PT_BR:
        return `${DATE.currentDay()}/${DATE.currentMonth()}/${DATE.currentYear()}`;

      default:
        return `${DATE.currentYear()}-${DATE.currentMonth()}-${DATE.currentDay()}`;
    }
  },

  /**
  * Ex: 2021-10-01
  */
  firstDateOfMonth(format = DateFormat.EN) {
    switch (format) {
      case DateFormat.PT_BR:
        return `01/${DATE.currentMonth()}/${DATE.currentYear()}`;

      default:
        return `${DATE.currentYear()}-${DATE.currentMonth()}-01`;
    }
  },

  /**
  * Ex: 2021
  */
  currentYear: () => DATE.extractYear(new Date()),

  /**
  * Ex: 09
  */
  currentDay: () => DATE.extractDay(new Date()),

  /**
  * Ex: 08
  */
  currentMonth: () => DATE.extractMonth(new Date()),

  /**
  * Ex: 3 de fevereiro de 2021 04:06 OR 3 de fevereiro de 2021 (withTime = false)
  */
  formatToDisplay: (date: string, withTime = true) => (withTime
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date))
    : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(date))),

  handleZero(value: string|number) {
    return String(value).length === 1 ? `0${value}` : value;
  },

  extractDate(date: Date, format = DateFormat.EN) {
    switch (format) {
      case DateFormat.PT_BR:
        return `${DATE.extractDay(date)}/${DATE.extractMonth(date)}/${DATE.extractYear(date)}`;

      default:
        return `${DATE.extractYear(date)}/${DATE.extractMonth(date)}/${DATE.extractDay(date)}`;
    }
  },
  extractYear: (date: Date) => date.getFullYear(),

  extractMonth: (date: Date) => DATE.handleZero(Number(date.getMonth()) + 1),

  extractDay: (date: Date) => DATE.handleZero(date.getDate()),
};
