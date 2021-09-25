import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { FaFilter, FaPlus } from 'react-icons/fa';

import { PageContainer, TitleWithActions, SectionContainer, Input, Button, ManagementUnitSelect } from '~/core/view/components';

const CorporateWall: React.FC = () => {
  const filterForm = useRef<FormHandles>(null);

  const handleFilter: SubmitHandler = async (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <TitleWithActions
        title="Mural Corporativo"
        actions={[
          { icon: FaFilter, className: 'btn-light' },
          { icon: FaPlus, className: 'btn-info', href: 'comunicacao_mural.php', target: '_blank' },
        ]}
      />
      <SectionContainer title="Filtros" className="mt-2">
        <Form ref={filterForm} onSubmit={handleFilter}>
          <ManagementUnitSelect />
          <Input name="codigo" label="Código" type="number" />
          <Input name="hasText" label="Contendo o texto" />
          <Input name="initialDate" label="Data inicial" type="date" />
          <Input name="finalDate" label="Data final" type="date" />
          <Button className="btn-success">Pesquisar</Button>
        </Form>
      </SectionContainer>
      <SectionContainer title="Lista de Mensagens" className="mt-2">
        Datatable aqui
      </SectionContainer>
    </PageContainer>
  );
};

export default CorporateWall;
