import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse:separate;
  border-spacing: 0 5px;
`;

export const THead = styled.thead`
  tr th {
    border: 0;
    font-weight: 500;
    background: ${({ theme }) => theme.colors.light};
    padding: 5px 10px;

    &:first-of-type {
      border-radius: ${({ theme }) => theme.radius.small} 0 0 ${({ theme }) => theme.radius.small};
    }

    &:last-of-type {
      border-radius: 0 ${({ theme }) => theme.radius.small} ${({ theme }) => theme.radius.small} 0;
    }
  }
`;
