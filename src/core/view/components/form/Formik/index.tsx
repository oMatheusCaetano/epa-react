import React from 'react';
import { Formik as FormikForm, Form, FormikValues, FormikConfig } from 'formik';
import RadioGroup, { RadioGroupProps } from './subComponents/RadioGroup';
import RadioGroupItem, { RadioGroupItemProps } from './subComponents/RadioGroupItem';
import GoalAndBallOutRadioGroup, { GoalAndBallOutRadioGroupProps } from './subComponents/GoalAndBallOutRadioGroup';
import ClienteInput, { ClienteInputProps } from './subComponents/ClienteInput';
import ManagementUnitSelect, { ManagementUnitSelectProps } from './subComponents/ManagementUnitSelect';
import RichText, { RichTextProps } from './subComponents/RichText';
import Input, { InputProps } from './subComponents/Input';
import Select, { SelectProps } from './subComponents/Select';
import Submit from './subComponents/Submit';
import Search from './subComponents/Search';
import { ButtonProps } from '../..';

interface FormikSubComponents {
  RadioGroup: React.FC<RadioGroupProps>;
  RadioGroupItem: React.FC<RadioGroupItemProps>;
  GoalAndBallOutRadioGroup: React.FC<GoalAndBallOutRadioGroupProps>;
  ClienteInput: React.FC<ClienteInputProps>;
  ManagementUnitSelect: React.FC<ManagementUnitSelectProps>;
  RichText: React.FC<RichTextProps>;
  Input: React.FC<InputProps>;
  Select: React.FC<SelectProps>;
  Submit: React.FC<ButtonProps>;
  Search: React.FC<ButtonProps>;
}

const Formik: React.FC<FormikConfig<FormikValues>> & FormikSubComponents = ({
  children,
  enableReinitialize = true,
  ...rest
}) => (
  <FormikForm {...rest} enableReinitialize={enableReinitialize}>
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
Formik.ManagementUnitSelect = ManagementUnitSelect;
Formik.RichText = RichText;
Formik.Submit = Submit;
Formik.Search = Search;
Formik.Input = Input;
Formik.Select = Select;
export default Formik;
