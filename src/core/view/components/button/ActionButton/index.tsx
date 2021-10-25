import React from 'react';
import { IconType } from 'react-icons';
import { FaFilter, FaPlus, FaAngleDoubleUp } from 'react-icons/fa';

import * as Styled from './styles';

export enum ActionButtonType { FILTER, CREATE }

export interface IProps {
  type?: ActionButtonType,
  show?: boolean,
  icon?: IconType;
  iconSize?: number;
  className?: string;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ActionButton: React.FC<IProps> = (props) => {
  const Icon = props.icon;

  function handleIconColor(): string {
    if (!props.className) return '#222';

    if (
      props.className.includes('btn-primary')
      || props.className.includes('btn-secondary')
      || props.className.includes('btn-danger')
      || props.className.includes('btn-warning')
      || props.className.includes('btn-info')
    ) {
      return 'white';
    }

    return '#222';
  }

  if (props.type === ActionButtonType.FILTER) {
    return (
      <Styled.Container className={`${props.className} btn btn-light`} onClick={props.onClick}>
        {
          props.show
            ? <FaAngleDoubleUp size={props.iconSize ?? 17} fill={handleIconColor()} />
            : <FaFilter size={props.iconSize ?? 17} fill={handleIconColor()} />
        }
      </Styled.Container>
    );
  }

  if (props.type === ActionButtonType.CREATE) {
    return (
      <Styled.OuterLinkContainer className={`${props.className} btn btn-primary`} href={props.href}>
        <FaPlus size={props.iconSize ?? 17} fill="white" />
      </Styled.OuterLinkContainer>
    );
  }

  if (props.href && props.href.length) {
    return (
      <Styled.OuterLinkContainer className={`${props.className} btn`} href={props.href} target={props.target}>
        {Icon && <Icon size={props.iconSize ?? 17} fill={handleIconColor()} />}
      </Styled.OuterLinkContainer>
    );
  }

  return (
    <Styled.Container className={`${props.className} btn`} onClick={props.onClick}>
      {Icon && <Icon size={props.iconSize ?? 17} fill={handleIconColor()} />}
    </Styled.Container>
  );
};

export default ActionButton;
