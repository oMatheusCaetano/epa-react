import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`

`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.light};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 3px 6px;
  margin: 0 2px;
  color: ${({ theme }) => darken(0.6, theme.colors.light)};
  transition: .2s;

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.light)};
  }

  &.selected {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInPrimary};
  }
`;
