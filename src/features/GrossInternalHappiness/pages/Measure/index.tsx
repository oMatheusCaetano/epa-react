import React, { useState } from 'react';
import Button from '~/core/view/components/button/Button';

import * as Styled from './styles';

const Measure: React.FC = () => {
  const otherHumors = [
    'Fé', 'Medo', 'Lealdade', 'Ganância',
    'Felicidade', 'Raive', 'Ciúme', 'Esperança',
    'Otimismo', 'Nervosismo', 'Ciúme', 'Desejo',
  ];

  const [showGoals, setShowGoals] = useState(true);

  function toggleGoals() {
    if (showGoals) {
      setShowGoals(false);
      return;
    }

    setShowGoals(true);
    window.scrollTo(0, 0);
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <p>FIB - Felicidade Interna Bruta</p>
      </Styled.Header>

      <Styled.Main>
        <Styled.Left>
          <Styled.LeftHeader title="Foto e Humor">
            <main>
              <Styled.UserHumor>
                <div className="user-humor__main">
                  <div className="user-humor__image">
                    <img src="https://thispersondoesnotexist.com/image" alt="" />
                  </div>
                  <div className="user-humor__measure-humor">
                    <span>Olá, </span>
                    <span className="user-humor__measure-humor__name">Matheus Caetano</span>
                    <div className="user-humor__measure-humor__selector">
                      <span>Como se sente?</span>
                      <div>
                        <Styled.AngryIcon size={25} />
                        <Styled.SadIcon size={25} />
                        <Styled.NormalIcon size={25} />
                        <Styled.HappyIcon size={25} />
                      </div>
                      <footer>
                        <div />
                        <input type="checkbox" id="make-humor-public" />
                        <label htmlFor="make-humor-public">Tornar público</label>
                      </footer>
                    </div>
                  </div>
                </div>
              </Styled.UserHumor>

              <Styled.UserHumorIdentification>
                <span>
                  Com qual dessas emoções você mais se identifica neste momento?
                </span>
                <main className="user-other-humor">
                  {otherHumors.map((humor) => (
                    <div>
                      <input type="radio" id="feeling-1" />
                      <label htmlFor="feeling-1">{humor}</label>
                    </div>
                  ))}
                </main>
                <Button className="btn-success">Acessar o EPA</Button>
              </Styled.UserHumorIdentification>
            </main>
          </Styled.LeftHeader>

          <Styled.UserSpace title="Esse espaço é seu!">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestias aperiam est nostrum saepe minus.
              Deleniti quasi, adipisci ex voluptatem nostrum blanditiis perferendis
              odio ipsa recusandae dolorum et dignissimos obcaecati perspiciatis!
            </p>
          </Styled.UserSpace>

          <Styled.UserGoal title="Em 2021 eu VOU">
            <form className="form-group">
              <label htmlFor="goal" className="form-label">Meta</label>
              <input className="form-control" id="goal" />
            </form>

            <footer className="goal-footer">
              <div>
                <Button className="btn-primary">Página inicial</Button>
              </div>
              <div className="goal-footer__right">
                <Button
                  className="btn-success"

                >
                  Incluir meta
                </Button>
                <Button className="btn-info" onClick={toggleGoals}>
                  {showGoals ? 'Esconder metas' : 'Minhas metas'}
                </Button>
              </div>
            </footer>
          </Styled.UserGoal>
        </Styled.Left>

        <Styled.Right>
          <Styled.RightGoals title="Metas definidas" className={!showGoals ? 'd-none' : ''}>
            asdasd
          </Styled.RightGoals>

          <Styled.RightAchievedGoals title="Metas alcançadas" className={!showGoals ? 'd-none' : ''}>
            asdasd
          </Styled.RightAchievedGoals>

          <Styled.RightFib title="Felicidade Interna Bruta">
            <img src="https://thispersondoesnotexist.com/image" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestias aperiam est nostrum saepe minus.
              Deleniti quasi, adipisci ex voluptatem nostrum blanditiis perferendis
              odio ipsa recusandae dolorum et dignissimos obcaecati perspiciatis!
            </p>
          </Styled.RightFib>
        </Styled.Right>
      </Styled.Main>
    </Styled.Container>
  );
};

export default Measure;
