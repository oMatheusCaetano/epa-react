import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  background: transparent;
  transition: .3s;

  &:hover, &:focus, &:active {
    background: ${({ theme }) => theme.colors.light};

    & span {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  & span {
    margin-right: 5px;
    color: #555;
    transition: .3s;
    font-weight: 500;
  }
`;

const listStyled = css`
  list-style: none;
  min-width: 170px;
  position: absolute;
  background: white;
  padding: 10px 0;
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  z-index: 99999999999999;
`;

export const List = styled.ul`
  top: 100%;
  ${listStyled};
`;

export const SubList = styled.ul`
  ${listStyled};
  display: none;
  top: -20%;
  left: 100%;

`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 7px 20px;
  cursor: pointer;
  min-width: max-content;

  &:hover {
    background: ${({ theme }) => theme.colors.light};

    & > ul {
      display: block;
    }
  }
`;
