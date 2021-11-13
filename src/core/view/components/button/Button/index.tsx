import React from 'react';
import { IconType } from 'react-icons';
import { FaSearch, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import { useTheme } from 'styled-components';

export enum ButtonStyle {
  SEARCH,
  DELETE,
  PDF,
  CSV,
}

export interface ButtonProps {
  styleAs?: ButtonStyle;
  disabled?: boolean;
  className?: string;
  icon?: IconType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ children,
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
      <button
        onClick={onClick}
        disabled={disabled}
        className={`default-button ${className}`}
        style={{ backgroundColor: background, color }}
      >
        {Icon && <Icon className="button-icon" fill={color} />}
        {children ?? text}
      </button>
    );
  }

  switch (styleAs) {
    case ButtonStyle.SEARCH:
      return render(theme.colors.textInSuccess, theme.colors.success, 'Pesquisar', icon ?? FaSearch);

    case ButtonStyle.DELETE:
      return render(theme.colors.textInDanger, theme.colors.danger, 'Remover', icon ?? FaSearch);

    case ButtonStyle.PDF:
      return render('white', '#C90000DD', 'PDF', icon ?? FaFilePdf);

    case ButtonStyle.CSV:
      return render('white', '#005225CC', 'Excel', icon ?? FaFileCsv);

    default:
      return render(theme.colors.textInLight, theme.colors.light, '');
  }
};

export default Button;
