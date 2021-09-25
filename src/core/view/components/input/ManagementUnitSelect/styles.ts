import styled from 'styled-components';

export interface IOptionProps {
  tabSpace: number;
}

export const Option = styled.option<IOptionProps>`
  padding-left: ${({ tabSpace }) => `${tabSpace * 15}px`};
`;
