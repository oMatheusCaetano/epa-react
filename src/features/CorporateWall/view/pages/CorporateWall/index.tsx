import React from 'react';
import { FaSearch } from 'react-icons/fa';

import { Button, Form } from '~/core/view/components';
import { ButtonType } from '~/core/view/components/button/Button';

import * as Styled from './styles';

const CorporateWall: React.FC = () => (
  <Styled.Container className="p-5">
    <Form onSubmit={(data) => console.log(data)}>
      <Form.Input name="ids" label="Código" type="number" />
      <Form.Input name="hasText" label="Contendo o texto" />
      <Form.Date name="startDate" label="Data inicial" />
      <Form.Date name="finalDate" label="Data final" />
      <Form.Select
        name="category"
        label="Categoria"
        options={[
          { value: 5, label: 'Geral' },
        ]}
      />
      <Form.Select
        name="dateType"
        label="Tipo de data"
        options={[
          { value: 'create', label: 'Data de Inclusão' },
          { value: 'publish', label: 'Data de Publicação' },
        ]}
      />
      <br />
      <br />
      <Button styleAs={ButtonType.DELETE} onClick={() => alert('asdas')}>Something</Button>
    </Form>
  </Styled.Container>
);

export default CorporateWall;
