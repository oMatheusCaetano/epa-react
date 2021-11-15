import styled from 'styled-components';

export const Th = styled.th`
  cursor: pointer;
  background: red;

  &:first-of-type {
    border-radius: ${({ theme }) => theme.radius.small} 0 0 ${({ theme }) => theme.radius.small};
  }

  &:last-of-type {
    border-radius: 0 ${({ theme }) => theme.radius.small} ${({ theme }) => theme.radius.small} 0;
  }

  span {
    font-weight: 500;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;
