import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';

import * as Styled from './styles';

export interface ILabelProps {
  headerAside?: ReactNode;
  htmlFor?: string;
  label?: string;
  subLabel?: string;
  required?: boolean;
  icon?: IconType;
}

const Label: React.FC<ILabelProps> = ({
  headerAside,
  htmlFor,
  label,
  subLabel,
  required,
  icon,
}) => {
  const Icon = icon;

  return (
    <Styled.Container>
      <section>
        {Icon && <Icon className="mb-1" fill="#9e9ea7" />}

        <Styled.Label htmlFor={htmlFor}>
          {label} {required && <Styled.RequiredStar>*</Styled.RequiredStar>}
        </Styled.Label>

        <Styled.SubLabel htmlFor={htmlFor}>{subLabel}</Styled.SubLabel>
      </section>

      <aside>{headerAside}</aside>
    </Styled.Container>
  );
};

export default Label;
