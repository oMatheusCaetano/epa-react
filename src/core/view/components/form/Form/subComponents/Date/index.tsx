import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';
import { Label, SmallText, ISmallTextProps, ILabelProps } from '~/core/view/components';
import { DATE, DateFormat } from '~/core/helpers';

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
        // setDate(value);
      },
      getValue: (ref) => (typeof ref.props.value === 'string'
        ? ref.props.value
        : DATE.extractDate(ref.props.value, DateFormat.PT_BR)
      ),
    });
  }, [fieldName, registerField]);

  function onChange(value: Date | null) {
    setDate(value);
    // setDate(value ? DATE.extractDate(value as Date, DateFormat.PT_BR) : null);
  }

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
        onChange={(value: Date | null) => onChange(value)}
        // dateFormat="dd/MM/yyyy"
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
