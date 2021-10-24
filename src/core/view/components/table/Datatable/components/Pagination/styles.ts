import styled from 'styled-components';
import { darken } from 'polished';

export const Ellipsis = styled.span`
   color: ${({ theme }) => darken(0.05, theme.colors.light)};
`;

export const ActiveButton = styled.button`
  border: none;
  background: transparent;
  transition: .3s;
  padding: 5px 8px;
  margin: 0 5px;
  border-radius: ${({ theme }) => theme.radius.small};
  background: ${({ theme }) => darken(0.05, theme.colors.light)};
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  transition: .3s;
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.radius.small};

  &:hover {
    background: ${({ theme }) => darken(0.05, theme.colors.light)};
  }
`;
