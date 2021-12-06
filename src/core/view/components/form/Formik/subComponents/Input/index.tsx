/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';

export interface InputProps extends C.InputProps {
  name: string;
}

const Input: React.FC<InputProps> = (props) => {
  function getErrorMessage(form: any, err?: string) {
    let error = '';

    if (form.touched[props.name] && form.errors[props.name]) {
      error = form.errors[props.name];
    }

    return error || err;
  }

  return (
    <Field name={props.name}>
      {({ field, form }: any) => (
        <C.Input
          {...props}
          {...field}
          error={getErrorMessage(form, props.error)}
        />
      )}
    </Field>
  );
};

export default Input;
