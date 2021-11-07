/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { FaSearch, FaPlus, FaMobileAlt, FaCog } from 'react-icons/fa';
import { useAppStore } from '~/core/hooks';

import { CompanyLogo, WikiLogo, EpaLogo, Dropdown, Image, Link, IFrame } from '~/core/view/components';
import { getLastAccessedMenus, getMenusList } from '~/features/System/domain/store/menu';
// import Todo from './components/Todo';

import * as Styled from './styles';

const Navbar: React.FC = () => {
  const { store, dispatch } = useAppStore();

  useEffect(() => {
    dispatch(getMenusList());
    dispatch(getLastAccessedMenus());
  }, []);

  useEffect(() => { console.log(store.MENU.menusList); }, [store.MENU.menusList]);

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
              {store.MENU.menusList.map((menu, index) => (
                <li className="nav-item" key={index}>
                  <Dropdown items={menu.children ?? []}>
                    {menu.label !== 'Parametrização' ? menu.label : <FaCog />}
                  </Dropdown>
                </li>
              ))}

              <li className="nav-item">
                <Styled.NewOs>
                  <FaPlus size={10} fill="white" />
                  <span>SOL</span>
                </Styled.NewOs>
              </li>

              <li className="nav-item">
                {/* <Todo /> */}
              </li>

              <li className="nav-item">
                <Styled.SearchUser>
                  <FaSearch />
                </Styled.SearchUser>
              </li>

              <li className="nav-item">
                <Styled.QrCode
                  fromLegacyEpa
                  href="qr-code-app.php"
                  id="iframe-qrcode"
                >
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

              {store.MENU.lastAccessedMenus.map((menu, index) => (
                <Styled.LastAccessedMenuItem className="nav-item" key={index}>
                  <Link href={menu.link} toLegacyEpa>{menu.label}</Link>
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
