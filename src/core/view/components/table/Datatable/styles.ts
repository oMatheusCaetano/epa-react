import styled from 'styled-components';
import { darken } from 'polished';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 5px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HeaderRight = styled.aside`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 5px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PerPageSelector = styled.select`
  width: 60px;
  display: inline-block;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 5px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

// Pagination
export const PaginationEllipsis = styled.span`
   color: ${({ theme }) => darken(0.05, theme.colors.light)};
`;

export const PaginationActiveButton = styled.button`
  border: none;
  background: transparent;
  transition: .3s;
  padding: 5px 8px;
  margin: 0 5px;
  border-radius: ${({ theme }) => theme.radius.small};
  background: ${({ theme }) => darken(0.05, theme.colors.light)};
`;

export const PaginationButton = styled.button`
  border: none;
  background: transparent;
  transition: .3s;
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.radius.small};

  &:hover {
    background: ${({ theme }) => darken(0.05, theme.colors.light)};
  }
`;
