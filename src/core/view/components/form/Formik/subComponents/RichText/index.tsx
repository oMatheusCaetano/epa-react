/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';

export interface RichTextProps extends C.RichTextProps {
  name: string;
}

const RichText: React.FC<RichTextProps> = (props) => {
  function getErrorMessage(form: any) {
    let error = '';

    if (form.touched[props.name] && form.errors[props.name]) {
      error = form.errors[props.name];
    }

    return error ?? props.error;
  }

  return (
    <Field name={props.name}>
      {({ field, form }: any) => (
        <C.RichText
          {...props}
          {...field}
          error={getErrorMessage(form)}
          onBlur={() => { form.setFieldTouched(props.name, true); }}
          onChange={(richTextValue) => {
            form.setFieldValue(props.name, richTextValue);
          }}
        />
      )}
    </Field>
  );
};

export default RichText;
