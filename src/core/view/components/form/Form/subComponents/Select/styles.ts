import styled, { css } from 'styled-components';
import { darken } from 'polished';

export interface IListItemLabelProps {
  tabIndex: number;
}

export const Container = styled.div`
  position: relative;

  .list_container--active {
    max-height: auto;
    padding: 10px 0;
    opacity: 1;
  }

  .list_container--inactive {
    max-height: 0px;
    padding: 0;
    opacity: 0;
  }

  .upside-arrow--up {
    transform: rotate(180deg);
    transition: .3s;
  }

  .upside-arrow--down {
    transform: rotate(0);
    transition: .3s;
  }
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
`;

export const ListContainer = styled.div`
  position: absolute;
  z-index: 9999999999999999999;
  box-shadow: 1px 1px 5px #888;
  border-radius: ${({ theme }) => theme.radius.small};
  min-width: 100%;
  background: white;
  overflow: hidden;
  transition: .2s;
`;

export const ListContainerInput = styled.input`
  width: 97%;
  margin: 0 auto;
`;

export const ButtonsContainer = styled.div`
  margin: 10px 0 0 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`;

const buttonsStyle = css`
  background: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  height: 32px;
  width: 49%;
  transition: .3s;

  &:hover {
    background: ${({ theme }) => darken(0.05, theme.colors.light)};
  }
`;

export const LeftButton = styled.button`
  ${buttonsStyle};
`;

export const RightButton = styled.button`
  ${buttonsStyle};
`;

export const List = styled.ul`
  margin: 10px 0 0 0;
  max-height: 60vh;
  overflow: auto;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 10px;
  
  &:hover {
    background: ${({ theme }) => darken(0.05, theme.colors.light)};
  }
`;

export const ListItemButton = styled.button`
  display: inline-block;
  height: 27px;
  width: 27px;
  margin-right: 5px;
  background: transparent;
  border: none;
`;

export const ListItemLabel = styled.button<IListItemLabelProps>`
  display: inline-block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  height: 27px;
  padding-left: ${({ tabIndex }) => `${15 * tabIndex}px`};
`;
