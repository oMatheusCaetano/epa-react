import React from 'react';
import { Field } from 'formik';

import * as C from '~/core/view/components';
import * as S from './styles';

export interface RadioGroupProps {
  id?: string;
  className?: string;
  label?: string;
  error?: string;
  name: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  className,
  label,
  error,
  children,
  name,
  ...rest
}) => {
  function getErrorMessage(form: any, err?: string) {
    let errorMessage = '';

    if (form.touched[name] && form.errors[name]) {
      errorMessage = form.errors[name];
    }

    return errorMessage || err;
  }

  return (
    <div className={className} id={id} role="group" aria-labelledby={id} {...rest}>
      <C.Label label={label} />

      <Field name={name}>
        {({ form }: any) => (
          <>
            <S.ChildrenContainer>
              {children}
            </S.ChildrenContainer>
            <C.SmallText error={getErrorMessage(form, error)} />
          </>
        )}
      </Field>
    </div>
  );
};

export default RadioGroup;
