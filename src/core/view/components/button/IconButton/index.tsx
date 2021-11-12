import React from 'react';
import { IconType } from 'react-icons';
import { FaPlus, FaFilter, FaAngleUp } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import * as S from './styles';

export enum IconButtonIconSize {
  default = 16,
}

export enum IconButtonType {
  FILTER = 'FILTER',
  CREATE = 'CREATE',
}

export interface IconButtonProps {
  styleAs?: IconButtonType,
  className?: string;
  icon?: IconType;
  iconSize?: IconButtonIconSize;
  disabled?: boolean,
  showFilters?: boolean;
  type?: 'button' | 'submit' | 'reset',
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const IconButton: React.FC<IconButtonProps> = ({
  styleAs,
  icon,
  onClick,
  disabled,
  className,
  iconSize = IconButtonIconSize.default,
  showFilters,
  type = 'button',
  ...rest
}) => {
  const theme = useTheme();

  function renderButton(
    background: string,
    color: string,
    buttonIcon?: IconType|null,
  ) {
    const Icon = icon ?? buttonIcon;

    return (
      <S.Button
        onClick={onClick}
        disabled={disabled}
        className={`default-button ${className}`}
        style={{ backgroundColor: background }}
        type={type}
        {...rest}
      >
        {!!Icon && <Icon size={iconSize} fill={color} />}
      </S.Button>
    );
  }

  switch (styleAs) {
    case IconButtonType.CREATE:
      return renderButton(theme.colors.primary, theme.colors.textInPrimary, FaPlus);

    case IconButtonType.FILTER:
      return renderButton(
        theme.colors.light, theme.colors.textInLight, showFilters ? FaAngleUp : FaFilter,
      );

    default:
      return renderButton(theme.colors.light, theme.colors.textInLight);
  }
};
export default IconButton;
