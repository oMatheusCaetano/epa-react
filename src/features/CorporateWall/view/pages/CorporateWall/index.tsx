import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler } from '@unform/core';

import { ISelectOption } from '~/core/view/components/input/Select';
import { PageContainer, SectionContainer, Select } from '~/core/view/components';

const CorporateWall: React.FC = () => {
  const [selectData, setSelectData] = useState<ISelectOption[]>([] as ISelectOption[]);

  useEffect(() => {
    // setSelectData([
    //   { value: 1,
    //     label: 'Option 1',
    //     selected: false,
    //   },
    //   { value: 2, label: 'Option 2', selected: true },
    //   { value: 3, label: 'Option 3', selected: false },
    // ]);

    // setTimeout(() => {
    setSelectData([
      { value: 1,
        label: 'Option 1',
        selected: false,
        children: [
          { value: 4, label: 'Option 4', selected: false },
          { value: 5, label: 'Option 5', selected: false, children: [{ value: 6, label: 'Option 6', selected: false }] },
        ] },
      { value: 2, label: 'Option 2', selected: false },
      { value: 3, label: 'Option 3', selected: false },
    ]);
    // }, 1500);
  }, []);

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <PageContainer>
      <SectionContainer title="Lista de Mensagens" className="mt-2">
        <Form onSubmit={onFormSubmit}>
          <Select
            name="select"
            multiple
            collapsible
            options={selectData}
          />
          <button>Submit</button>
        </Form>
      </SectionContainer>
    </PageContainer>
  );
};

export default CorporateWall;
