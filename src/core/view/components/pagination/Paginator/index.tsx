import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import * as S from './styles';

export interface PaginatorProps {
  className?: string;
  page: number;
  lastPage: number;
  onPageChange?: (nextPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  className,
  page,
  lastPage,
  onPageChange,
}) => {
  const pagesAsideCurrent = 3;

  function goToPage(nextPage: number) {
    if (onPageChange) {
      onPageChange(nextPage);
    }
  }

  return (
    <div className={className}>
      <S.Button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
        <FaAngleLeft /> Anterior
      </S.Button>

      <S.Button type="button" hidden={page <= 1} onClick={() => goToPage(1)}>1</S.Button>

      <span hidden={(page - 1) < (pagesAsideCurrent + 2)}>...</span>

      {
        [...Array(pagesAsideCurrent).keys()].reverse().map((cPage) => (
          <S.Button
            type="button"
            key={cPage}
            hidden={(page - cPage - 1) <= 1}
            onClick={() => goToPage(page - cPage - 1)}
          >
            {page - cPage - 1}
          </S.Button>
        ))
      }

      <S.Button type="button" className="selected" disabled>{page}</S.Button>

      {
        [...Array(pagesAsideCurrent).keys()].map((cPage) => (
          <S.Button
            type="button"
            key={cPage}
            hidden={(page + cPage + 1) >= lastPage}
            onClick={() => goToPage(page + cPage + 1)}
          >
            {page + cPage + 1}
          </S.Button>
        ))
      }

      <span hidden={(lastPage - page) < (pagesAsideCurrent + 2)}>...</span>

      <S.Button type="button" hidden={page >= lastPage} onClick={() => goToPage(lastPage)}>
        {lastPage}
      </S.Button>

      <S.Button type="button" disabled={page >= lastPage} onClick={() => goToPage(page + 1)}>
        Próxima <FaAngleRight />
      </S.Button>
    </div>

  );
};

export default Paginator;
