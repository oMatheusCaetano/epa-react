import styled from 'styled-components';
import { Field } from 'formik';

export const Container = styled.label`
  display: flex;
  align-items: center;
  padding: 6px;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radius.default};
  width: max-content;
`;

export const Radio = styled(Field)`
  margin-right: 5px;
`;
