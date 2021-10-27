import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { ReactInputMask } from 'react-input-mask';

import { Input, IInputProps } from '~/core/view/components';

export interface IFormInputProps extends IInputProps {
  name: string;
}

const FormInput: React.FC<IFormInputProps> = ({ placeholder = '', mask = '', name, ...rest }) => {
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
    <Input
      mask={mask}
      name={name}
      id={fieldName}
      ref={inputRef}
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default FormInput;
