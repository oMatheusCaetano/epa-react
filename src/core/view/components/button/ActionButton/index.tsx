import React from 'react';
import { IconType } from 'react-icons';

import * as Styled from './styles';

export interface IProps {
  icon: IconType;
  iconSize?: number;
  className?: string;
  href?: string;
  target?: string;
}

const ActionButton: React.FC<IProps> = (props) => {
  const Icon = props.icon;

  function handleIconColor(): string {
    if (!props.className) return 'black';

    if (
      props.className.includes('btn-primary')
      || props.className.includes('btn-secondary')
      || props.className.includes('btn-danger')
      || props.className.includes('btn-warning')
      || props.className.includes('btn-info')
    ) {
      return 'white';
    }

    return 'black';
  }

  if (props.href && props.href.length) {
    return (
      <Styled.OuterLinkContainer className={`${props.className} btn`} href={props.href} target={props.target}>
        <Icon size={props.iconSize ?? 17} fill={handleIconColor()} />
      </Styled.OuterLinkContainer>
    );
  }

  return (
    <Styled.Container className={`${props.className} btn`}>
      <Icon size={props.iconSize ?? 17} fill={handleIconColor()} />
    </Styled.Container>
  );
};

export default ActionButton;
