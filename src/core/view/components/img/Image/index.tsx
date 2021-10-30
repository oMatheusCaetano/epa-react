import React, { useRef } from 'react';

import * as Styled from './styles';

export interface IImageProps {
  className?: string;
  fromEpa?: boolean;
  editable?: boolean;
  onFileSelection?: ((file: File) => void);
}

const Image: React.FC<IImageProps & React.HTMLProps<HTMLImageElement>> = ({
  className,
  src,
  alt,
  editable,
  fromEpa = true,
  onFileSelection,
  style,
  title,
}) => {
  const ref = useRef<HTMLInputElement>({} as HTMLInputElement);
  const placeholderImage = 'https://via.placeholder.com/500';
  let targetSrc = src?.length === 0 ? placeholderImage : src;

  if (targetSrc !== placeholderImage && fromEpa) {
    targetSrc = `http://localhost/epa/${src}`;
  }

  function openFileSelection() {
    ref.current.click();
  }

  function onInput() {
    const file = extractFile();
    if (file && onFileSelection) onFileSelection(file);
  }

  function extractFile() {
    if (ref.current.files?.length) {
      return ref.current.files[0];
    }

    return null;
  }

  return (
    <Styled.Container>
      <Styled.Image className={className} src={targetSrc} alt={alt} style={style} title={title} />
      {
        editable && (
        <>
          <Styled.Overlay onClick={openFileSelection}>
            <p>Alterar</p>
          </Styled.Overlay>
          <input type="file" ref={ref} onInput={onInput} hidden />
        </>
        )
      }

    </Styled.Container>
  );
};

export default Image;
