import React from 'react';

import { StyledTitle } from './styles';

export enum Size { LARGE, NORMAL, SMALL }

type Props = JSX.IntrinsicElements['h1'] & { size?: Size };

const Title: React.FC<Props> = ({ className, size, children }) => (
  <StyledTitle className={className} size={size}>{children}</StyledTitle>
);

export default Title;
