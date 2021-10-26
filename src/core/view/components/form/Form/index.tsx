import React from 'react';
import { Form as UnForm } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import FormInput, { IFormInputProps } from './subComponents/Input';
import FormDate, { IFormDateProps } from './subComponents/Date';

export type FormRef = FormHandles;
export type FormSubmit = SubmitHandler;

interface IFormSubComponents {
  Input: React.FC<IFormInputProps>;
  Date: React.FC<IFormDateProps>;
}

export interface IFormProps {
  onSubmit?: SubmitHandler<FormData>;
  ref?: React.Ref<FormHandles>;
  className?: string;
}

const Form: React.FC<IFormProps> & IFormSubComponents = ({ children, onSubmit, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const mockedOnSubmit: SubmitHandler = () => {};

  return (
    <UnForm onSubmit={onSubmit ?? mockedOnSubmit} {...rest}>
      {children}
    </UnForm>
  );
};

Form.Input = FormInput;
Form.Date = FormDate;
export default Form;
