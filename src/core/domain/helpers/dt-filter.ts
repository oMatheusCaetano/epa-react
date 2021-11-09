import { DATE } from '.';

export interface IFilterItem<T> {
  column: string;
  value: T;
}

export const DT_FILTER = {
  /**
   * @returns IFilterItem: { column: "orderBy", value }
   */
  orderBy(value: string): IFilterItem<string> {
    return { column: 'orderBy', value };
  },

  /**
   * @returns IFilterItem: {
   *  column,
   *  value: '{currentYear}-{currentMonth}-01to{currentYear}-{currentMonth}-{currentDay}'
   * }
   */
  currentMonthPeriod(column: string): IFilterItem<string> {
    return { column, value: `${DATE.firstDateOfMonth()}to${DATE.today()}` };
  },

  /**
   * @returns IFilterItem: {
   *  column,
   *  value: '{startDate}to{finalDate}'
   * }
   */
  datePeriod(column: string, startDate?: string, finalDate?: string): IFilterItem<string> {
    return { column, value: `${startDate ?? ''}to${finalDate ?? ''}` };
  },
};
