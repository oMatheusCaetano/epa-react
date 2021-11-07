import React from 'react';
import { Form as UnForm } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import FormInput, { IFormInputProps } from './subComponents/Input';
import FormDate, { IFormDateProps } from './subComponents/Date';
import FormSelect, { IFormSelectProps } from './subComponents/Select';
import FormManagementUnit, { IFormManagementUnitProps } from './subComponents/ManagementUnit';

export type FormRef = FormHandles;
export type FormSubmit = SubmitHandler;

interface IFormSubComponents {
  Input: React.FC<IFormInputProps>;
  Date: React.FC<IFormDateProps>;
  Select: React.FC<IFormSelectProps>;
  ManagementUnit: React.FC<IFormManagementUnitProps>;
}

export interface IFormProps {
  initialData: object;
  onSubmit?: SubmitHandler<FormData>;
  innerRef?: React.Ref<FormRef>;
  className?: string;
}

const Form: React.FC<IFormProps> & IFormSubComponents = ({
  children,
  innerRef,
  onSubmit,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const mockedOnSubmit: FormSubmit = () => {};

  return (
    <UnForm onSubmit={onSubmit ?? mockedOnSubmit} ref={innerRef} {...rest}>
      {children}
    </UnForm>
  );
};

Form.Input = FormInput;
Form.Date = FormDate;
Form.Select = FormSelect;
Form.ManagementUnit = FormManagementUnit;
export default Form;
