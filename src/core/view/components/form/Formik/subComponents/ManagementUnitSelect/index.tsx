/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';

export interface ManagementUnitSelectProps extends C.ManagementUnitSelectProps {
  name: string;
}

const ManagementUnitSelect: React.FC<ManagementUnitSelectProps> = (props) => (
  <Field name={props.name}>
    {({ field, form }: any) => (
      <C.ManagementUnitSelect
        {...props}
        {...field}
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
        }}
      />
    )}
  </Field>
);

export default ManagementUnitSelect;
