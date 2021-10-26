import React from 'react';
import { Form } from '~/core/view/components';

import * as Styled from './styles';

const CorporateWall: React.FC = () => (
  <Styled.Container className="p-5">
    <Form onSubmit={(data) => console.log(data)}>
      <Form.Input name="ids" label="Código" type="number" />
      <Form.Input name="hasText" label="Contendo o texto" />
      <Form.Date name="startDate" label="Data inicial" />
      <Form.Date name="finalDate" label="Data final" />
      <button type="submit">submit</button>
    </Form>
  </Styled.Container>
);

export default CorporateWall;
