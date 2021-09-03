import React from 'react';
import { IconType } from 'react-icons';

import Title from '~/core/view/components/text/Title';
import ActionButton from '~/core/view/components/button/ActionButton';

interface IAction {
  icon: IconType;
}

interface IProps {
  title?: string;
  actions?: IAction[]
}

const TitleWithActions: React.FC<IProps> = ({ title, actions }) => (
  <div className="flex-between-center mb-3 w-100">
    <div><Title>{title}</Title></div>
    <div>
      {actions && actions.map((action, key) => (
        <ActionButton icon={action.icon} className="ms-1" key={key} />
      ))}
    </div>
  </div>
);

export default TitleWithActions;
