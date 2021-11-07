import styled from 'styled-components';
import ImageComponent from '~/core/view/components/img/Image';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled(ImageComponent)`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
`;
