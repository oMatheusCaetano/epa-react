import React from 'react';
import * as C from '~/core/view/components';

export interface FiltersContainerProps {
  show?: boolean;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  subTitle?: string;
  id?: string;
}

const FiltersContainer: React.FC<FiltersContainerProps> = (props) => (
  <C.SectionContainer {...props} title={props.title ?? 'Filtros'}>
    {props.children}
  </C.SectionContainer>
);

export default FiltersContainer;
