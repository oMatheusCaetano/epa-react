import React from 'react';
import { Formik as FormikForm, Form, FormikValues, FormikConfig } from 'formik';
import RadioGroup, { RadioGroupProps } from './subComponents/RadioGroup';
import RadioGroupItem, { RadioGroupItemProps } from './subComponents/RadioGroupItem';
import GoalAndBallOutRadioGroup, { GoalAndBallOutRadioGroupProps } from './subComponents/GoalAndBallOutRadioGroup';
import ClienteInput, { ClienteInputProps } from './subComponents/ClienteInput';
import Submit from './subComponents/Submit';
import { ButtonProps } from '../..';

interface FormikSubComponents {
  RadioGroup: React.FC<RadioGroupProps>;
  RadioGroupItem: React.FC<RadioGroupItemProps>;
  GoalAndBallOutRadioGroup: React.FC<GoalAndBallOutRadioGroupProps>;
  ClienteInput: React.FC<ClienteInputProps>;
  Submit: React.FC<ButtonProps>;
}

const Formik: React.FC<FormikConfig<FormikValues>> & FormikSubComponents = ({
  children,
  ...rest
}) => (
  <FormikForm {...rest}>
    <Form>
      {children}
    </Form>
  </FormikForm>
);

export * from 'formik';

Formik.RadioGroup = RadioGroup;
Formik.RadioGroupItem = RadioGroupItem;
Formik.GoalAndBallOutRadioGroup = GoalAndBallOutRadioGroup;
Formik.ClienteInput = ClienteInput;
Formik.Submit = Submit;
export default Formik;
