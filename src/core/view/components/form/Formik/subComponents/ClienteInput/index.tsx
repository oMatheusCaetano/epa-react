/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';
import { Cliente } from '~/features/Users/domain/models';

export interface ClienteInputProps extends C.ClienteInputProps {
  name: string;
}

const ClienteInput: React.FC<ClienteInputProps> = (props) => {
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
        <C.ClienteInput
          {...props}
          {...field}
          error={getErrorMessage(form, props.error)}
          onBlur={() => { form.setFieldTouched(props.name, true); }}
          onChange={(cliente) => {
            if (!cliente) {
              form.setFieldValue(props.name, '');
              return;
            }

            if (props.multiple) {
              const list = cliente as Cliente[];
              form.setFieldValue(props.name, list.map((cliente) => cliente.codigo).join(','));
              return;
            }

            const item = cliente as Cliente;
            form.setFieldValue(props.name, item.codigo ?? '');
          }}
        />
      )}
    </Field>
  );
};

export default ClienteInput;
