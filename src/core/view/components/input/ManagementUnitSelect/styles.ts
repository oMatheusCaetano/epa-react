import styled, { css } from 'styled-components';

export interface IOptionProps {
  tabSpace?: number;
}

export const Container = styled.div`
  position: relative;
`;

export const SelectButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 8px;
  width: 200px;
  text-align: left;
  /* display: block; */
`;

export const SubContainer = styled.div`
  position: absolute;
  z-index: 99999;
  border-radius: ${({ theme }) => theme.radius.small};
  box-shadow: 1px 1px 5px #AAA;
  padding: 12px 0;
  min-width: 300px;
  max-width: 100%;
  background: white;
`;

export const SearchInput = styled.input`
  width: 95%;
  margin: 0 auto;
`;

export const Actions = styled.div`
  padding: 12px 12px 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = css`
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 8px;
  text-align: center;
  width: 49%;
  background: #DDD;
  transition: .3s;

  &:hover {
    background: #CCC;
  }
`;

export const ActionsLeftButton = styled.button`
  ${ActionButton};
`;

export const ActionsRightButton = styled.button`
  ${ActionButton};
`;

export const List = styled.ul`
  margin: 0;
  margin-top: 12px;
`;

export const ListItem = styled.li<IOptionProps>`
  cursor: pointer;
  padding: 4px 10px;
  padding-left: ${({ tabSpace = 1 }) => `${tabSpace * 12}px`};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
