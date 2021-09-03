import styled from 'styled-components';
import { Size } from '.';

interface IStyledTitleProps {size?: Size}

export const StyledTitle = styled.h1<IStyledTitleProps>`
  font-weight: 600;
  height: 30px;

  ${({ size }) => size === Size.LARGE && `
    font-size: 40px;
  `}

${({ size }) => size === Size.SMALL && `
    font-size: 26px;
  `}
`;
