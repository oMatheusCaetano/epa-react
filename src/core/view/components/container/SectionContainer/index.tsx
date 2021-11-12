import React from 'react';
import * as C from '~/core/view/components';

export interface SectionContainerProps {
  show?: boolean;
  className?: string;
  id?: string;
  title?: string;
  actions?: React.ReactNode;
  subTitle?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = (props) => (
  <C.CollapsibleContainer {...props} show={props.show ?? true}>
    <C.SectionHeader title={props.title} subTitle={props.subTitle} actions={props.actions} />
    <div className="px-2 py-1">
      {props.children}
    </div>
  </C.CollapsibleContainer>
);

export default SectionContainer;
