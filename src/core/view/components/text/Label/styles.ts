import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 600;
`;

export const RequiredStar = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export const SubLabel = styled.label`
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 13px;
  margin-left: 7px;
  color: #9e9ea7;
`;
