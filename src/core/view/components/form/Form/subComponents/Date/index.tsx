import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';
import { Label, SmallText, ISmallTextProps, ILabelProps } from '~/core/view/components';

type ComponentsTypes = ISmallTextProps & ILabelProps & Omit<ReactDatePickerProps, 'onChange'>;
export interface IFormDateProps extends ComponentsTypes {
  name: string;
}

registerLocale('pt-BR', ptBR);

const FormDate: React.FC<IFormDateProps> = ({
  headerAside,
  label,
  subLabel,
  error,
  message,
  required,
  icon,
  name,
}) => {
  const datePickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datePickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <div>
      <Label
        icon={icon}
        htmlFor={fieldName}
        label={label}
        required={required}
        subLabel={subLabel}
        headerAside={headerAside}
      />

      <ReactDatePicker
        className="form-input-style"
        scrollableMonthYearDropdown
        scrollableYearDropdown
        dateFormat="Pp"
        locale="pt-BR"
        ref={datePickerRef}
        selected={date}
        showTimeSelect
        onChange={setDate}
      />

      <SmallText
        error={error}
        message={message}
      />
    </div>
  );
};

export default FormDate;
