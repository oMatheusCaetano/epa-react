import React, { useEffect, memo } from 'react';
import { FaRegTimesCircle, FaCog, FaPlus, FaSearch, FaMobileAlt } from 'react-icons/fa';

import { useAppStore } from '~/core/view/hooks';

import * as C from '~/core/view/components';
import * as S from './styles';
import { getMenusList, getRecentlyAccessedMenus } from '~/features/System/domain/stores/menu';
import { getSystemInfo } from '~/features/System/domain/stores/system';
import { STORAGE, URL } from '~/core/domain/helpers';

const Navbar: React.FC = () => {
  const { store, dispatch } = useAppStore();

  useEffect(() => {
    dispatch(getMenusList());
    dispatch(getRecentlyAccessedMenus());
    dispatch(getSystemInfo());
  }, []);

  function logout() {
    STORAGE.clearAll();
    URL.replaceToEpaPage('login.php');
  }

  function handleUnavailableFeatures() {
    // eslint-disable-next-line no-alert
    alert('Volte à página inicial e tente novamente.');
  }

  return (
    <S.Container className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <C.Link className="navbar-brand" href="principal.php" toLegacyEpa>
          {!!store.SYSTEM.systemInfo.companyLogo?.length && (
          <C.Image
            fromEpa
            style={{ maxHeight: '50px', maxWidth: '100px' }}
            src={store.SYSTEM.systemInfo.companyLogo}
          />
          )}
        </C.Link>

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
            <S.MiddleTop className="navbar-nav  mb-2 mb-lg-0">
              {store.MENU.menusList.map((menu, index) => (
                <li className="nav-item" key={index}>
                  <C.MenuDropdown items={menu.children ?? []}>
                    {menu.menu !== 'Parametrização' ? menu.menu : <FaCog />}
                  </C.MenuDropdown>
                </li>
              ))}

              <li className="nav-item">
                <S.Radar href="radar_gerencial.php" toLegacyEpa>Radar</S.Radar>
              </li>

              <li className="nav-item">
                <S.Todo onClick={handleUnavailableFeatures}>To-do</S.Todo>
              </li>

              <li className="nav-item">
                <S.NewOs
                  fromLegacyEpa
                  href="incluir_solicitacao.php"
                  id="iframe-new-os"
                >
                  <FaPlus size={7} fill="white" />
                  <span>SOL</span>
                </S.NewOs>
              </li>

              <li className="nav-item">
                <S.SearchUser onClick={handleUnavailableFeatures}>
                  <FaSearch />
                </S.SearchUser>
              </li>

              <li className="nav-item">
                <S.QrCode
                  fromLegacyEpa
                  href="qr-code-app.php"
                  id="iframe-qrcode"
                >
                  <FaMobileAlt size={15} />
                </S.QrCode>
              </li>

              <li className="nav-item">
                {!!store.AUTH.user.codigo_cliente && (
                  <S.Profile
                    fromLegacyEpa
                    href={`informacoesusuario.php?codigo=${store.AUTH.user.codigo_cliente}`}
                    id="iframe-profile"
                  >
                    {!store.AUTH.user.cliente?.foto ? (
                      <C.Image
                        fromEpa
                        style={{ maxHeight: '30px' }}
                        alt={store.AUTH.user.login}
                        src={store.AUTH.user.cliente?.foto}
                      />
                    ) : store.AUTH.user.login}

                  </S.Profile>
                )}
              </li>

              <li>
                <S.Logout onClick={logout}>
                  <FaRegTimesCircle size={15} />
                </S.Logout>
              </li>
            </S.MiddleTop>

            <S.MiddleBottom className="navbar-nav  mb-2 mb-lg-0">
              <C.Image fromEpa src="figuras/maisAcessados.png" alt="+ Acessados" />

              {store.MENU.recentlyAccessedMenus.map((menu, index) => (
                <S.LastAccessedMenuItem className="nav-item" key={index}>
                  <C.Link href={menu.link} toLegacyEpa>{menu.nome_menu}</C.Link>
                </S.LastAccessedMenuItem>
              ))}
            </S.MiddleBottom>
          </section>

          <C.Image
            title={`Versão: ${store.SYSTEM.systemInfo.version}`}
            fromEpa
            style={{ maxHeight: '40px', maxWidth: '100px' }}
            alt="{store.SYSTEM.systemInfo.version}"
            src="figuras/styles/logo-epa.png"
          />

          <a
            className="navbar-brand ms-4"
            href="https://wiki.simeon.com.br/"
            target="_blank"
            title="Base de conhecimento"
          >
            <C.Image
              fromEpa
              style={{ maxHeight: '30px', maxWidth: '30px' }}
              src="figuras/knowledge.png"
            />
          </a>
        </div>
      </div>
    </S.Container>
  );
};

export default memo(Navbar);
