import styled from 'styled-components';
import IFrame from '~/core/view/components/iframe/IFrame';
import Link from '~/core/view/components/link/Link';

export const Container = styled.nav`
  box-shadow: 0px 5px 15px rgb(0 0 0 / 5%);
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
`;

export const MiddleTop = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchUser = styled.button`
  margin-left: 5px;
  border-radius: 50%;
  padding: 6px 7px;
  background: transparent;
  border: none;
  transition: .3s;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`;

export const Radar = styled(Link)`
  font-weight: 500;
  color: #555;
  margin-left: 3px;
`;

export const NewOs = styled(IFrame)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background: #2D6987;
  border: none;
  padding: 4px 6px;
  transition: .3s;
  margin-left: 10px;

  span {
    color: white;
    font-size: 9px;
    margin-left: 5px;
  }
`;

export const QrCode = styled(IFrame)`
  margin: 0 10px;
  margin-left: 0;
  border-radius: 50%;
  padding: 6px 7px;
  background: transparent;
  border: none;
  transition: .3s;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`;

export const Profile = styled(IFrame)`
  outline: none;
  border: none;
`;

export const Logout = styled.button`
  margin: 0 10px;
  margin-left: 10px;
  border-radius: 50%;
  padding: 6px 7px;
  background: transparent;
  border: none;
  transition: .3s;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`;

export const MiddleBottom = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LastAccessedMenuItem = styled.li`
  text-decoration: none;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    height: 15px;
    width: 1px;
    margin: 0 5px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;
