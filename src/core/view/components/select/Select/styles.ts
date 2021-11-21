import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListContainer = styled.div`
  position: absolute;
  z-index: 9999999999;
  border-radius: ${({ theme }) => theme.radius.default};
  min-width: 300px;
  width: 100%;
  max-width: 80vw;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  background: white;
  overflow: hidden;
  transition: .2s;
  padding-top: 10px;
`;

export const SearchInput = styled.input`
  width: calc(100% - 20px) !important;
  display: block;
  margin: 0 auto 10px auto;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radius.default};
  background: ${({ theme }) => theme.colors.light};
  width: 49%;
  transition: .3s;

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.light)}
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
`;

export interface ListItemProps {
  tabIndex: number;
}
export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }

  & div:last-of-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 6px 14px 6px 0;
    padding-left: ${({ tabIndex }) => 14 * tabIndex}px;
  }
`;

export const CollapseButton = styled.button`
  border-radius: ${({ theme }) => theme.radius.small};
  background: transparent;
  border: none;
  padding: 3px 3px 3px 4px;
  outline: none;
  transition: .3s;

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.light)};
    border-radius: 50%;
  }

  &:first-of-type {
    margin-left: 14px;
  }
`;
