import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatusCode = styled.img`
  max-height: 50vh;
  max-width: 60vw;
  object-fit: cover;
`;

export const Message = styled.p`
  margin: 30px 0;
  font-size: 3vh;
`;

export const RedirectButton = styled.button`
  padding: 20px 30px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(
    7deg,
    ${({ theme }) => theme.colors.success},
    ${({ theme }) => darken(0.15, theme.colors.success)}
  );
  color: ${({ theme }) => theme.colors.textInSuccess};
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  font-weight: 500;
  transition: .3s;

  &:hover {
    background: linear-gradient(
      10deg,
      ${({ theme }) => darken(0.15, theme.colors.success)},
      ${({ theme }) => theme.colors.success}
    );
  }
`;
