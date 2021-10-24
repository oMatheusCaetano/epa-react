import React from 'react';

import * as Styled from './styles';

export interface IProps {
  disabled?: boolean;
  lastPage: number;
  currentPage: number;
  onPageChange: ((page: number) => void);
}

const Pagination: React.FC<IProps> = ({ disabled, currentPage, lastPage, onPageChange }) => (
  <section>
    <Styled.Button
      disabled={disabled || currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Anterior
    </Styled.Button>

    {
      currentPage > 1
      && (
        <Styled.Button disabled={disabled} onClick={() => onPageChange(1)}>
          1
        </Styled.Button>
      )
    }

    {currentPage > 5 && <Styled.Ellipsis>...</Styled.Ellipsis>}

    {
      (currentPage - 3 > 1)
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(currentPage - 3)}
        >
          {currentPage - 3}
        </Styled.Button>
      )
    }
    {
      (currentPage - 2 > 1)
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(currentPage - 2)}
        >
          {currentPage - 2}
        </Styled.Button>
      )
    }
    {
      (currentPage - 1 > 1)
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </Styled.Button>
      )
    }

    <Styled.ActiveButton disabled>{currentPage}</Styled.ActiveButton>

    {
      currentPage + 1 < lastPage
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </Styled.Button>
      )
    }

    {
      currentPage + 2 < lastPage
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(currentPage + 2)}
        >
          {currentPage + 2}
        </Styled.Button>
      )
    }

    {
      currentPage + 3 < lastPage
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(currentPage + 3)}
        >
          {currentPage + 3}
        </Styled.Button>
      )
    }

    {currentPage < (lastPage - 4) && <Styled.Ellipsis>...</Styled.Ellipsis>}

    {
      currentPage < lastPage
      && (
        <Styled.Button
          disabled={disabled}
          onClick={() => onPageChange(lastPage)}
        >
          {lastPage}
        </Styled.Button>
      )
    }

    <Styled.Button
      disabled={disabled || currentPage >= lastPage}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Próxima
    </Styled.Button>
  </section>
);

export default Pagination;
