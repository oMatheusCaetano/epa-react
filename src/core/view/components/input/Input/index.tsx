import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

type InputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  label?: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ name, label, errorMessage = '', ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

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
    <>
      {label && <label className="form-label" htmlFor={fieldName}>{label}</label>}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      <div className="ms-2 mt-1 mb-2">
        <small className="text-danger">{error ?? errorMessage}</small>
      </div>
    </>
  );
};

export default Input;
