/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { IconType } from 'react-icons';

export interface ActionsProps {
  actions?: {
    label: string,
    icon?: IconType,
    onClick?: () => void,
  }[];
}

const Actions: React.FC<ActionsProps> = ({ actions, children }) => (
  <div className="dropdown">
    <a
      className="btn btn-primary btn-sm dropdown-toggle"
      href="#"
      role="button"
      id="dropdownMenuLink"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Ações
    </a>

    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      {actions?.map((action, index) => (
        <li
          className="dropdown-item"
          key={index}
          onClick={action.onClick}
          onKeyDown={action.onClick}
        >
          {action.label}
        </li>
      ))}
      {children}
    </ul>
  </div>
);

export default Actions;
