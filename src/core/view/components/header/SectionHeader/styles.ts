import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 4px 8px;
`;

export const Aside = styled.aside`
  display: flex;
  align-items: center;
`;

export const Title = styled.h5`
  color: ${({ theme }) => theme.colors.textInPrimary};
  margin: 0;
  font-size: 14px;
`;

export const SubTitle = styled.h6`
  color: ${({ theme }) => darken(0.1, theme.colors.textInPrimary)};
  margin: 0;
  margin-left: 7px;
  margin-top: 1px;
  font-size: 12px;
  letter-spacing: .2px;
`;
