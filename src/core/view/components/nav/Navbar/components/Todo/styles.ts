import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  position: relative;
`;

export const Todo = styled.button`
  position: relative;
  border: none;
  background: transparent;
  border-radius: 40px;
  padding: 5px 7px;
  transition: .3s;
  margin-left: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`;

export const Counter = styled.span`
  top: 40%;
  position: absolute;
  background: red;
  color: white;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 50%;
  font-size: 10px;
  background: #2D6987;
`;

export const TodosContainer = styled.div`
  position: absolute;
  right: -50px;
  height: 400px;
  width: 390px;
  background: white;
  z-index: 99999;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  border-radius: ${({ theme }) => theme.radius.default};
`;

export const TodosList = styled.ul`
  flex: 1;
  height: 340px;
  overflow-y: auto;
  padding: 0;
`;

export const TodoItem = styled.li`
  display: flex;
  text-align: left;
  padding: 5px;

  & > input[type="checkbox"] {
    margin-right: 10px;
    margin-top: 3px;

    &:checked + div[contentEditable="true"] {
      text-decoration: line-through;
      color: grey;
    }
  }

  & > div[contentEditable="true"] {
    border: none;
    outline: none;
    flex: 1;
    padding: 2px 5px;
    transition: .3s;

    &:active, &:focus {
      background: ${({ theme }) => theme.colors.light};
    }
  }


`;

export const headerNFooter = css`
  background: ${({ theme }) => theme.colors.light};
  padding: 5px 10px;
`;

export const Header = styled.header`
  ${headerNFooter};
  border-radius: ${({ theme }) => theme.radius.default} ${({ theme }) => theme.radius.default} 0 0;
`;

export const Footer = styled.footer`
  ${headerNFooter};
  border-radius: 0 0 ${({ theme }) => theme.radius.default} ${({ theme }) => theme.radius.default};
`;
