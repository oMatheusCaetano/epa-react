/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import { IMenuItem } from '~/features/System/domain/models';

import * as Styled from './styles';

export interface IDropdownProps {
  items: IMenuItem[];
}

const Dropdown: React.FC<IDropdownProps> = ({ items }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  function renderItems(items: IMenuItem[]) {
    return (
      <>
        {items.map((item, index) => (
          <Styled.ListItem key={`${item.label}--${index}`}>
            {item.label}

            {item.children && <FaAngleRight />}
            {item.children && (
              <Styled.SubList>
                {renderItems(item.children)}
              </Styled.SubList>
            )}
          </Styled.ListItem>
        ))}
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = ({ target }: any) => {
    if (elRef.current && !elRef.current.contains(target)) {
      setShow(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEscKeyPressed = ({ key }: any) => {
    if (key === 'Escape') {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleEscKeyPressed, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscKeyPressed, true);
    };
  });

  return (
    <Styled.Container ref={elRef}>
      <Styled.Button type="button" onClick={() => setShow(!show)}>
        <span>label</span>

        <FaAngleDown />
      </Styled.Button>

      <Styled.List hidden={!show}>
        {renderItems(items)}
      </Styled.List>
    </Styled.Container>
  );
};

export default Dropdown;
