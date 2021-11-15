import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 15px;
  margin: 15px 0;
`;

export const Left = styled.aside`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const Aside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 26px;
  margin: 0;
  margin-bottom: -6px;
  font-family: Poppins;
`;

export const SubTitle = styled.h6`
  margin: 0;
  margin-left: 10px;
  margin-bottom: -2px;
  color: ${({ theme }) => lighten(0.3, theme.colors.text)};
`;
