import React from 'react';

import * as Styled from './styles';

interface Props {
  className?: string;
  fromEpa?: boolean;
}

const Image: React.FC<Props & React.HTMLProps<HTMLImageElement>> = ({
  className,
  src,
  alt,
  fromEpa = true,
}) => {
  const placeholderImage = 'https://via.placeholder.com/150';
  let targetSrc = src?.length === 0 ? placeholderImage : src;

  if (targetSrc !== placeholderImage && fromEpa) {
    targetSrc = `http://localhost/epa/${src}`;
  }

  return (
    <Styled.StyledImage className={className} src={targetSrc} alt={alt} />
  );
};

export default Image;
