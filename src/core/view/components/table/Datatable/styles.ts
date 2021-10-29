import styled from 'styled-components';
import { Input } from '~/core/view/components';

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
