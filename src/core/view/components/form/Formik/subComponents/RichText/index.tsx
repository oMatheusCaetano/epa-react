/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';

export interface RichTextProps extends C.RichTextProps {
  name: string;
}

const RichText: React.FC<RichTextProps> = (props) => {
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
        <C.RichText
          {...props}
          {...field}
          error={getErrorMessage(form, props.error)}
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
