import React from 'react';
import { DATE } from '~/core/domain/helpers';

export interface DateProps {
  date?: string;
  withTime?: boolean;
}

const Date: React.FC<DateProps> = ({ date, withTime = false }) => (
  <div>{DATE.formatToDisplay(date ?? '', withTime)}</div>
);

export default Date;
