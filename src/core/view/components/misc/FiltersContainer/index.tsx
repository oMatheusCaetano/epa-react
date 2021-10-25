import React from 'react';
import SectionSeparator from '../SectionSeparator';

import * as Styled from './styles';

export interface IProps {
  show?: boolean;
}

const FiltersContainer: React.FC<IProps> = ({ children, show = false }) => (
  <Styled.Container className={show ? 'active' : ''}>
    <SectionSeparator title="Filtros" className="my-2" />
    {children}
  </Styled.Container>
);

export default FiltersContainer;
