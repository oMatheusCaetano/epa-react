import React from 'react';
import { Form } from '@unform/web';
import { SubmitHandler } from '@unform/core';

import { ManagementUnitSelect, PageContainer, SectionContainer } from '~/core/view/components';
import { ManagementUnitSelectTypes } from '~/core/view/components/input/ManagementUnitSelect';

const CorporateWall: React.FC = () => {
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <PageContainer>
      <SectionContainer title="Lista de Mensagens" className="mt-2">
        <Form onSubmit={onFormSubmit}>
          <ManagementUnitSelect name="managementUnit" collapsible multiple type={ManagementUnitSelectTypes.COMMUNICATES} defaultValue={['661', '848', '6']} />
          <button>Submit</button>
        </Form>
      </SectionContainer>
    </PageContainer>
  );
};

export default CorporateWall;
