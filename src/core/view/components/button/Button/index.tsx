import React from 'react';
import { IconType } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import * as Styled from './styles';

export enum ButtonType {
  SEARCH,
  DELETE,
}

export interface IButtonProps {
  styleAs?: ButtonType;
  disabled?: boolean;
  className?: string;
  icon?: IconType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<IButtonProps> = ({ children,
  styleAs,
  icon,
  disabled,
  className,
  onClick,
}) => {
  const theme = useTheme();

  function render(color: string, background: string, text: string, buttonIcon?: IconType|null) {
    const Icon = buttonIcon;

    return (
      <Styled.Button
        onClick={onClick}
        disabled={disabled}
        className={className}
        style={{ backgroundColor: background, color }}
      >
        {Icon && <Icon className="button-icon" fill={color} />}
        {children ?? text}
      </Styled.Button>
    );
  }

  switch (styleAs) {
    case ButtonType.SEARCH:
      return render(theme.colors.textInSuccess, theme.colors.success, 'Pesquisar', icon ?? FaSearch);

    case ButtonType.DELETE:
      return render(theme.colors.textInDanger, theme.colors.danger, 'Pesquisar', icon ?? FaSearch);

    default:
      return render(theme.colors.textInLight, theme.colors.light, '');
  }
};

export default Button;
