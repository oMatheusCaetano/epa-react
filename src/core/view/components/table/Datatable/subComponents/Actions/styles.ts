import styled from 'styled-components';

export const Container = styled.div`
`;

export const Button = styled.button`
  padding: 5% 7%;
  outline: none;
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  transition: .3s;

  &:hover, &:active, &:focus {
    color: ${({ theme }) => theme.colors.textInPrimary};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
