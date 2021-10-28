import React, { LegacyRef, useState } from 'react';
import InputMask, { ReactInputMask } from 'react-input-mask';

import { SmallText, ISmallTextProps, Label, ILabelProps } from '~/core/view/components';

type ComponentsTypes = ISmallTextProps & ILabelProps;
export interface IInputProps extends ComponentsTypes {
  placeholder?: string;
  mask?: string;
  className?: string;
  type?: string;
  id?: string;
  name?: string;
  innerRef?: LegacyRef<ReactInputMask>;
  defaultValue?: string|number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({
  headerAside,
  className,
  placeholder = '',
  mask = '',
  label,
  subLabel,
  error,
  message,
  required,
  icon,
  type = 'text',
  id,
  innerRef,
  onChange,
  ...rest
}) => {
  const [notEmpty, setNotEmpty] = useState(false);

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNotEmpty(!!event.target.value.length);
    if (onChange) onChange(event);
  }

  return (
    <div className={className}>
      <Label
        icon={icon}
        htmlFor={id}
        label={label}
        required={required}
        subLabel={subLabel}
        headerAside={headerAside}
      />

      <InputMask
        type={type}
        mask={mask}
        placeholder={placeholder}
        id={id}
        ref={innerRef}
        {...rest}
        className={`form-input-style ${notEmpty ? 'not-empty' : ''}`}
        onChange={onInputChange}
      />

      <SmallText
        error={error}
        message={message}
      />
    </div>
  );
};

export default Input;
