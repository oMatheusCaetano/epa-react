import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.small};
`;

export const Left = styled.section`
`;

export const Right = styled.section`
`;

export const Title = styled.h2`
  color: white;
  font-size: 15px;
`;
