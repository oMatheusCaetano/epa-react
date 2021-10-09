import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler } from '@unform/core';

import { ISelectOption } from '~/core/view/components/input/Select';
import { Input, PageContainer, SectionContainer, Select } from '~/core/view/components';

const CorporateWall: React.FC = () => {
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <PageContainer>
      <SectionContainer title="Lista de Mensagens" className="mt-2">
        <Form onSubmit={onFormSubmit}>
          <Input name="input" />
          <Select
            name="select"
            label="Unidades Gerenciais"
            errorMessage="Este campo é obrigatório"
            collapsible
            options={[
              { value: 1,
                label: 'Option 1',
                selected: true,
                children: [
                  { value: 4, label: 'Option 4', selected: false },
                  { value: 5, label: 'Option 5', selected: false, children: [{ value: 6, label: 'Option 6', selected: true }] },
                ] },
              { value: 2, label: 'Option 2' },
              { value: 3, label: 'Option 3' },
              { value: 7, label: 'Option 7' },
              { value: 8, label: 'Option 8' },
              { value: 9, label: 'Option 9' },
              { value: 10, label: 'Option 10' },
              { value: 11, label: 'Option 11' },
              { value: 12, label: 'Option 12' },
              { value: 13, label: 'Option 13' },
              { value: 14, label: 'Option 14' },
              { value: 15, label: 'Option 15' },
              { value: 16, label: 'Option 16' },
              { value: 17, label: 'Option 17' },
              { value: 18, label: 'Option 18' },
              { value: 19, label: 'Option 19' },

            ]}
          />
          <button>Submit</button>
        </Form>
      </SectionContainer>
    </PageContainer>
  );
};

export default CorporateWall;
