import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const globalStyle = css`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
`;

export const HrefLink = styled.a`
  ${globalStyle};
`;

export const ReactLink = styled(Link)`
  ${globalStyle};
`;
