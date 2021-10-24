import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 5px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
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
