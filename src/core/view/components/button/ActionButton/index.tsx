import React from 'react';
import { IconType } from 'react-icons';

interface IProps {
  className?: string;
  icon: IconType;
}

const ActionButton: React.FC<IProps> = (props) => {
  const Icon = props.icon;

  return (
    <button className={`${props.className} btn btn-danger`}>
      <Icon size={15} />
    </button>
  );
};

export default ActionButton;
