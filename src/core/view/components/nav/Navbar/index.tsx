/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { FaSearch, FaPlus, FaRegTimesCircle, FaMobileAlt } from 'react-icons/fa';
import { useAppStore } from '~/core/hooks';

import { CompanyLogo, WikiLogo, EpaLogo, Dropdown, Image } from '~/core/view/components';
import { IMenuItem } from '~/features/System/domain/models';
import { getLastAccessedMenus } from '~/features/System/domain/store/menu';

import * as Styled from './styles';

const mitems: IMenuItem[] = [
  {
    label: 'Item 1',
    children: [
      {
        label: 'Item 1.1',
        children: [
          {
            label: 'Item 1.1.1',
            children: [
              { label: 'Item 1.1.1.1' },
              { label: 'Item 1.1.1.2' },
            ],
          },
          { label: 'Item 1.1.2' },
        ],
      },
    ],
  },

  {
    label: 'Item 2',
  },

  {
    label: 'Item 3',
    children: [
      {
        label: 'Item 3.1',
      },
    ],
  },
];

const Navbar: React.FC = () => {
  const { store, dispatch } = useAppStore();

  useEffect(() => { dispatch(getLastAccessedMenus()); }, []);

  return (
    <Styled.Container className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <CompanyLogo />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <section className="mx-auto">
            <Styled.MiddleTop className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <Dropdown items={mitems} />
              </li>

              <li className="nav-item">
                <Styled.NewOs>
                  <FaPlus size={10} fill="white" />
                  <span>SOL</span>
                </Styled.NewOs>
              </li>

              <li className="nav-item">
                <Styled.Todo>
                  To-do
                  <span>5</span>
                </Styled.Todo>
              </li>

              <li className="nav-item">
                <Styled.SearchUser>
                  <FaSearch />
                </Styled.SearchUser>
              </li>

              <li className="nav-item">
                <Styled.QrCode>
                  <FaMobileAlt size={15} />
                </Styled.QrCode>
              </li>

              <li className="nav-item">
                <Image
                  fromEpa
                  style={{ maxHeight: '30px' }}
                  alt={store.AUTH.authUser.login}
                  src={store.AUTH.authUser.image}
                />
              </li>
            </Styled.MiddleTop>

            <Styled.MiddleBottom className="navbar-nav  mb-2 mb-lg-0">
              <Image fromEpa src="figuras/maisAcessados.png" alt="+ Acessados" />
              {store.MENU.lastAccessedMenus.map((menu) => (
                <Styled.LastAccessedMenuItem className="nav-item">
                  <a>
                    {menu.label}
                  </a>
                </Styled.LastAccessedMenuItem>
              ))}
            </Styled.MiddleBottom>
          </section>

          <EpaLogo />
          <WikiLogo className="ms-4" />
        </div>
      </div>
    </Styled.Container>
  );
};

export default Navbar;
