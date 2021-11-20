/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';
import { Cliente } from '~/features/Users/domain/models';

export interface ClienteInputProps extends C.ClienteInputProps {
  name: string;
}

const ClienteInput: React.FC<ClienteInputProps> = (props) => (
  <Field name={props.name}>
    {({ field, form }: any) => {
      console.log('FIELD', field);
      console.log('FORM', form);

      return (
        <C.ClienteInput
          {...props}
          {...field}
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
      );
    }}
  </Field>
);

export default ClienteInput;
