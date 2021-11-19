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
  * Ex: 17 Mai 2019 às 17:32
  */
  formatToDisplay: (date: string, withTime = true) => {
    function handleDate(dateToFormat: string) {
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const newDate = new Date(dateToFormat);
      const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
      return `${day} ${meses[(newDate.getMonth())]} ${newDate.getFullYear()}`;
    }

    function handleTime(dateToFormat: string) {
      const newDate = new Date(dateToFormat);
      const hours = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
      const minutes = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
      return `${hours}:${minutes}`;
    }

    return withTime ? `${handleDate(date)} às ${handleTime(date)}` : handleDate(date);
  },

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
