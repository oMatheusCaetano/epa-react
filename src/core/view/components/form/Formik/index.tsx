import React from 'react';
import { Formik as FormikForm, Form, FormikValues, FormikConfig } from 'formik';
import RadioGroup, { RadioGroupProps } from './subComponents/RadioGroup';
import RadioGroupItem, { RadioGroupItemProps } from './subComponents/RadioGroupItem';
import GoalAndBallOutRadioGroup, { GoalAndBallOutRadioGroupProps } from './subComponents/GoalAndBallOutRadioGroup';
import Submit from './subComponents/Submit';
import { ButtonProps } from '../..';

interface FormikSubComponents {
  RadioGroup: React.FC<RadioGroupProps>;
  RadioGroupItem: React.FC<RadioGroupItemProps>;
  GoalAndBallOutRadioGroup: React.FC<GoalAndBallOutRadioGroupProps>;
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
Formik.Submit = Submit;
export default Formik;
