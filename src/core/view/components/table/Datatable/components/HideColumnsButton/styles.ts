import styled from 'styled-components';
import { Button as ButtonComp } from '~/core/view/components';
import { IDatatableColumn } from '../..';

interface ListItemProps {
  column: IDatatableColumn;
}

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Button = styled(ButtonComp)`

`;

export const List = styled.ul`
  position: absolute;
  top: 105%;
  background: white;
  min-width: 120px;
  max-width: 200px;
  padding: 10px 0;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  border-radius: ${({ theme }) => theme.radius.default};
  z-index: 999999999999999;
`;

export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  padding: 5px 20px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${({ column }) => (column.hide ? 'line-through' : 'none')};
  color: ${({ column, theme }) => (column.hide ? 'grey' : theme.colors.text)};
  transition: color .2s;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`;
