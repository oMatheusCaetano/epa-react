import React, { useEffect, useState } from 'react';

export interface IProps {
  date?: string;
  withTime?: boolean;
}

const DateMoment: React.FC<IProps> = ({ date, withTime = false }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (!date) return;
    setFormattedDate(withTime ? `${handleDate(date)} às ${handleTime(date)}` : handleDate(date));
  }, []);

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

  return (
    <div>{formattedDate}</div>
  );
};

export default DateMoment;
