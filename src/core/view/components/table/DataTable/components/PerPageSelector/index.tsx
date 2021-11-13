import React from 'react';

import * as S from './styles';

interface PerPageSelectorParams {
  total: string | number;
  onChange(perPage: number): void;
}

const PerPageSelector: React.FC<PerPageSelectorParams> = ({ total, onChange }) => (
  <div>
    <S.Select onChange={({ target }) => (target.value === 'ALL'
      ? onChange(Number(total))
      : onChange(Number(target.value)))}
    >
      <option>10</option>
      <option>20</option>
      <option>30</option>
      <option value="ALL">Todos</option>
    </S.Select>
    <label>resultados por página</label>
  </div>
);

export default PerPageSelector;
