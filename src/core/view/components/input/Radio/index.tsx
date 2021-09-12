/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import * as Styled from './styles';

interface IProps {
  name: string;
  options: IRadioOption[]
}

interface IRadioOption {
  label?: string;
  value: string | number | readonly string[] | undefined
}

const Radio: React.FC<IProps> = ({ name, options }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find((ref: { checked: any; }) => ref.checked);
        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find((ref: { value: unknown; }) => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <Styled.Container>
      {options.map((option, index) => (
        <Styled.Label key={index}>
          <input
            ref={(elRef: never) => { inputRefs.current[index] = elRef; }}
            type="radio"
            name={fieldName}
            value={option.value}
            className="me-1"
            defaultChecked={defaultValue === option.value}
          />
          <Styled.LabelText>{option.label}</Styled.LabelText>
        </Styled.Label>
      ))}
    </Styled.Container>
  );
};

export default Radio;
