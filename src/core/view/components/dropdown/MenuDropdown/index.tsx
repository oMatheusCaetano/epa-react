/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

import { MenuItem } from '~/features/System/domain/models';

import * as Styled from './styles';

export interface MenuDropdownProps {
  items: MenuItem[];
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ children, items }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  function renderItems(items: MenuItem[]) {
    return (
      <>
        {items.map((item, index) => {
          if (!item.children?.length && item.link?.length) {
            return (
              <Styled.ListItem key={`${item.menu}--${index}`}>
                <Styled.ListItemLink href={item.link} toLegacyEpa>
                  {item.menu}

                  {!!item.children?.length && <FaAngleRight />}
                </Styled.ListItemLink>

                {!!item.children?.length && (
                  <Styled.SubList>
                    {renderItems(item.children)}
                  </Styled.SubList>
                )}

              </Styled.ListItem>
            );
          }

          return (
            <Styled.ListItem key={`${item.menu}--${index}`}>
              <Styled.ListItemNotLink>
                {item.menu}

                {!!item.children?.length && <FaAngleRight />}
              </Styled.ListItemNotLink>

              {!!item.children?.length && (
                <Styled.SubList>
                  {renderItems(item.children)}
                </Styled.SubList>
              )}

            </Styled.ListItem>
          );
        })}
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
        <span>{children}</span>

        <FaAngleDown />
      </Styled.Button>

      <Styled.List hidden={!show}>
        {renderItems(items)}
      </Styled.List>
    </Styled.Container>
  );
};

export default MenuDropdown;
