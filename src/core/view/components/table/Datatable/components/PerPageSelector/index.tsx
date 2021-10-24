import React, { useRef, useEffect } from 'react';

import * as Styled from './styles';

interface IPerPageSelectorParams {
  loading: boolean;
  onChange: ((perPage: number) => void);
}

const PerPageSelector: React.FC<IPerPageSelectorParams> = ({ loading, onChange }) => {
  const perPageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    perPageRef.current?.addEventListener('change', () => onChange(Number(perPageRef.current?.value)));
  }, []);

  return (
    <div>
      <Styled.PerPageSelector className="form-control" ref={perPageRef} disabled={loading}>
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </Styled.PerPageSelector>
      <label>Resultados por página</label>
    </div>
  );
};
export default PerPageSelector;
