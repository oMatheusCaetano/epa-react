import React from 'react';

interface IProps {
  className?: string;
  title: string;
}

const SectionSeparator: React.FC<IProps> = (props) => (
  <div className={`${props.className} bg-primary text-white rounded px-2 py-1`}>
    <h6>{props.title}</h6>
  </div>
);

export default SectionSeparator;
