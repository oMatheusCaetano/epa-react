import React from 'react';
import { IconType } from 'react-icons';
import { FaFilter, FaPlus, FaAngleDoubleUp } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import * as Styled from './styles';

export enum ActionButtonType { FILTER, CREATE }

export interface IActionButtonProps {
  styleAs?: ActionButtonType,
  type?: ActionButtonType,
  show?: boolean,
  disabled?: boolean,
  icon?: IconType;
  openIcon?: IconType;
  open?: boolean;
  iconSize?: number;
  className?: string;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  styleAs,
  icon,
  openIcon,
  open,
  iconSize,
  disabled,
  className,
  onClick,
}) => {
  const theme = useTheme();

  function render(
    color: string,
    background: string,
    buttonIcon?: IconType|null,
    buttonOpenIcon?: IconType|null,
  ) {
    const Icon = buttonIcon;
    const OpenIcon = buttonOpenIcon;

    return (
      <Styled.Button
        onClick={onClick}
        disabled={disabled}
        className={`default-button ${className}`}
        style={{ backgroundColor: background }}
      >
        {Icon && !open && <Icon size={iconSize ?? 17} fill={color} />}
        {OpenIcon && open && <OpenIcon size={iconSize ?? 17} fill={color} />}
      </Styled.Button>
    );
  }

  switch (styleAs) {
    case ActionButtonType.FILTER:
      return render(
        theme.colors.textInLight,
        theme.colors.light,
        icon ?? FaFilter,
        openIcon ?? FaAngleDoubleUp,
      );

    case ActionButtonType.CREATE:
      return render(theme.colors.textInPrimary, theme.colors.primary, icon ?? FaPlus);

    default:
      return render(theme.colors.textInLight, theme.colors.light);
  }

  // function handleIconColor(): string {
  //   if (!props.className) return '#222';

  //   if (
  //     props.className.includes('btn-primary')
  //     || props.className.includes('btn-secondary')
  //     || props.className.includes('btn-danger')
  //     || props.className.includes('btn-warning')
  //     || props.className.includes('btn-info')
  //   ) {
  //     return 'white';
  //   }

  //   return '#222';
  // }

  // if (props.type === ActionButtonType.FILTER) {
  //   return (
  //     <Styled.Container className={`${props.className} btn btn-light`} onClick={props.onClick}>
  //       {
  //         props.show
  //           ? <FaAngleDoubleUp size={props.iconSize ?? 17} fill={handleIconColor()} />
  //           : <FaFilter size={props.iconSize ?? 17} fill={handleIconColor()} />
  //       }
  //     </Styled.Container>
  //   );
  // }

  // if (props.type === ActionButtonType.CREATE) {
  //   return (
  //     <Styled.OuterLinkContainer className={`${props.className} btn btn-primary`}
  // href={props.href}>
  //       <FaPlus size={props.iconSize ?? 17} fill="white" />
  //     </Styled.OuterLinkContainer>
  //   );
  // }

  // if (props.href && props.href.length) {
  //   return (
  //     <Styled.OuterLinkContainer className={`${props.className} btn`} href={props.href}
  // target={props.target}>
  //       {Icon && <Icon size={props.iconSize ?? 17} fill={handleIconColor()} />}
  //     </Styled.OuterLinkContainer>
  //   );
  // }

  // return (
  //   <Styled.Container className={`${props.className} btn`} onClick={props.onClick}>
  //     {Icon && <Icon size={props.iconSize ?? 17} fill={handleIconColor()} />}
  //   </Styled.Container>
  // );
};

export default ActionButton;
