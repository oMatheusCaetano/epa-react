import React from 'react';

import * as Styled from './styles';

const Actions: React.FC = () => (
  <Styled.Container className="dropdown">
    <Styled.Button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      Ações
    </Styled.Button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a className="dropdown-item" href="#">Action</a></li>
      <li><a className="dropdown-item" href="#">Another action</a></li>
      <li><a className="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </Styled.Container>
);

export default Actions;
