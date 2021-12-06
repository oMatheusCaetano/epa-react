/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';

export interface ManagementUnitSelectProps extends C.ManagementUnitSelectProps {
  name: string;
}

const ManagementUnitSelect: React.FC<ManagementUnitSelectProps> = (props) => {
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
        <C.ManagementUnitSelect
          {...props}
          {...field}
          error={getErrorMessage(form, props.error)}
          onBlur={() => { form.setFieldTouched(props.name, true); }}
          onChange={(options) => {
            if (!options) {
              form.setFieldValue(props.name, '');
              return;
            }

            if (props.multiple) {
              const list = options as C.SelectOption[];
              form.setFieldValue(props.name, list.map((cliente) => cliente.value).join(','));
              return;
            }

            const item = options as C.SelectOption;
            form.setFieldValue(props.name, item.value ?? '');
            // form.setErrors({ ...form.errors, [props.name]: undefined });
          }}
        />
      )}
    </Field>
  );
};

export default ManagementUnitSelect;
