import React, { useEffect } from 'react';
import { FaSearch, FaPlus, FaMobileAlt, FaCog, FaRegTimesCircle } from 'react-icons/fa';
import { STORAGE, URL } from '~/core/helpers';
import { useAppStore } from '~/core/hooks';

import { Dropdown, Image, Link } from '~/core/view/components';
import { getLastAccessedMenus, getMenusList } from '~/features/System/domain/store/menu';

import * as Styled from './styles';

const Navbar: React.FC = () => {
  const { store, dispatch } = useAppStore();

  useEffect(() => {
    dispatch(getMenusList());
    dispatch(getLastAccessedMenus());
  }, []);

  function logout() {
    STORAGE.clearAll();
    URL.getToEpaPage('login.php');
  }

  return (
    <Styled.Container className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" href="principal.php" toLegacyEpa>
          {!!store.SYSTEM.systemInfo.companyLogo?.length && (
          <Image
            fromEpa
            style={{ maxHeight: '50px', maxWidth: '100px' }}
            alt={store.SYSTEM.systemInfo.companyCode}
            src={store.SYSTEM.systemInfo.companyLogo}
          />
          )}
        </Link>

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
                <Styled.Radar href="radar_gerencial.php" toLegacyEpa>Radar</Styled.Radar>
              </li>

              <li className="nav-item">
                <Styled.NewOs
                  fromLegacyEpa
                  href="incluir_solicitacao.php"
                  id="iframe-new-os"
                >
                  <FaPlus size={7} fill="white" />
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
                {!!store.AUTH.authUser.id && (
                  <Styled.Profile
                    fromLegacyEpa
                    href={`informacoesusuario.php?codigo=${store.AUTH.authUser.id}`}
                    id="iframe-profile"
                  >
                    <Image
                      fromEpa
                      style={{ maxHeight: '30px' }}
                      alt={store.AUTH.authUser.login}
                      src={store.AUTH.authUser.image}
                    />
                  </Styled.Profile>
                )}

              </li>

              <li>
                <Styled.Logout onClick={logout}>
                  <FaRegTimesCircle size={15} />
                </Styled.Logout>
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

          <Image
            title={`Versão: ${store.SYSTEM.systemInfo.version}`}
            fromEpa
            style={{ maxHeight: '40px', maxWidth: '100px' }}
            alt={store.SYSTEM.systemInfo.version}
            src="figuras/styles/logo-epa.png"
          />

          <a
            className="navbar-brand ms-4"
            href="https://wiki.simeon.com.br/"
            target="_blank"
            title="Base de conhecimento"
          >
            <Image
              fromEpa
              style={{ maxHeight: '30px', maxWidth: '30px' }}
              src="figuras/knowledge.png"
            />
          </a>
        </div>
      </div>
    </Styled.Container>
  );
};

export default Navbar;
