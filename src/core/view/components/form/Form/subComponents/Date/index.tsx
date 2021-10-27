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
  className,
  icon,
  name,
  ...rest
}) => {
  const datePickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datePickerRef.current,
      clearValue: (ref) => {
        ref.clear();
      },
      setValue: (_, value) => {
        setDate(new Date(String(value)));
      },
      getValue: (ref) => ref.props.value,
    });
  }, [fieldName, registerField]);
  return (
    <div className={className}>
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
        locale="pt-BR"
        ref={datePickerRef}
        value={date}
        onChange={setDate}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/aaaa"
        {...rest}
      />

      <SmallText
        error={error}
        message={message}
      />
    </div>
  );
};

export default FormDate;
