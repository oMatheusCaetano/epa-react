import styled from 'styled-components';
import { Input, Button } from '~/core/view/components';

export const TableHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TableHeaderRight = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableHeaderSearch = styled(Input)`
  margin-right: 15px;
`;

export const TableHeaderHideColumns = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

export const TableHeaderExportButton = styled(Button)`
  margin-left: 10px;
`;

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

export const TBody = styled.tbody`
`;
