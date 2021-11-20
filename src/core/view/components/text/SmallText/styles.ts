import styled from 'styled-components';

export const Message = styled.small`
  font-weight: 500;
  font-size: 13px;
  margin: 7px 7px 0 7px;
  color: #9e9ea7;
`;

export const Error = styled(Message)`
  color: ${({ theme }) => theme.colors.danger};
`;
