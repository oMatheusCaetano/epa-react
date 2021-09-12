import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const Label = styled.label`
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 5px;
  margin: 3px 4px;
  background: ${({ theme }) => theme.colors.light};
  transition: .3s;

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.light)};
  }
`;

export const LabelText = styled.span`
  font-weight: 400 !important;
`;
