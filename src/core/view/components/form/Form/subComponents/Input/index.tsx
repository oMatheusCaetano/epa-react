import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import InputMask, { ReactInputMask } from 'react-input-mask';

import { SmallText, ISmallTextProps, Label, ILabelProps } from '~/core/view/components';

type ComponentsTypes = ISmallTextProps & ILabelProps;
export interface IFormInputProps extends ComponentsTypes {
  placeholder?: string;
  mask?: string;
  type?: string;
  name: string;
}

const FormInput: React.FC<IFormInputProps> = ({
  headerAside,
  placeholder = '',
  mask = '',
  label,
  subLabel,
  error,
  message,
  required,
  icon,
  type = 'text',
  name,
}) => {
  const [notEmpty, setNotEmpty] = useState(false);
  const inputRef = useRef<ReactInputMask>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
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

      <InputMask
        type={type}
        mask={mask}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`form-input-style ${notEmpty ? 'not-empty' : ''}`}
        onChange={(e) => { setNotEmpty(!!e.target.value.length); }}
      />

      <SmallText
        error={error}
        message={message}
      />
    </div>
  );
};

export default FormInput;
