import React from 'react';
import * as Fa from 'react-icons/fa';

import * as C from '~/core/view/components';
import * as S from './styles';

const Navbar: React.FC = () => (
  <S.Container>
    <div className="container-fluid">

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

            <li className="nav-item">
              <S.Radar href="radar_gerencial.php" toLegacyEpa>Radar</S.Radar>
            </li>

            <li className="nav-item">
              <S.Radar>To-do</S.Radar>
            </li>

            <li>
              <S.Logout>
                <Fa.FaRegTimesCircle size={15} />
              </S.Logout>
            </li>
          </S.MiddleTop>

          <S.MiddleBottom className="navbar-nav  mb-2 mb-lg-0">
            <C.Image fromEpa src="figuras/maisAcessados.png" alt="+ Acessados" />
          </S.MiddleBottom>
        </section>

        <C.Image
          title="Versão: store.SYSTEM.systemInfo.version"
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

export default Navbar;
