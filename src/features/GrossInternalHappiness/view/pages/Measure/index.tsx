/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useHelpers } from '~/core/hooks';

import IFibEmotion from '~/features/GrossInternalHappiness/domain/models/IFibEmotion';
import IUser from '~/core/domain/models/IUser';
import IPersonalGoal from '~/features/PersonalGoals/domain/models/IPersonalGoal';

import GetPersonalGoals from '~/features/PersonalGoals/data/datasources/personal-goals/get-personal-goals';
import GetAuthenticatedUser from '~/core/data/datasources/auth/get-authenticated-user';
import UpdatePersonalGoal from '~/features/PersonalGoals/data/datasources/personal-goals/update-personal-goal';
import DeletePersonalGoal from '~/features/PersonalGoals/data/datasources/personal-goals/delete-personal-goal';
import GetFibEmotions from '~/features/GrossInternalHappiness/data/datasources/fib-emotions/get-fib-emotions';

import Button from '~/core/view/components/button/Button';
import Image from '~/core/view/components/img/Image';
import Title from '~/core/view/components/text/Title';

import * as Styled from './styles';
import Input from '~/core/view/components/input/Input';
import CreatePersonalGoal, { IPersonalGoalData } from '~/features/PersonalGoals/data/datasources/personal-goals/create-personal-goal';

const Measure: React.FC = () => {
  const helpers = useHelpers();
  const userGoalForm = useRef<FormHandles>(null);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userGoals, setUserGoals] = useState<IPersonalGoal[]>([]);
  const [fibEmotions, setFibEmotions] = useState<IFibEmotion[]>([]);
  const [showGoals, setShowGoals] = useState(true);

  useEffect(() => {
    loadAuthenticatedUserData();
    loadFibEmotions();
  }, []);

  useEffect(() => { if (user.id) loadPersonalGoals(); }, [user.id]);

  function loadAuthenticatedUserData() {
    new GetAuthenticatedUser({
      onSuccess: setUser,
      onError: (error) => console.log('ERRO AO BUSCAR DADOS DO USUÁRIO AUTENTICADO', error.message),
    }).exec();
  }

  function loadFibEmotions() {
    new GetFibEmotions({
      onSuccess: setFibEmotions,
      onError: (error) => console.log('ERRO AO BUSCAR LISTA DE EMOÇÕES', error.message),
      filters: { active: true },
    }).exec();
  }

  function loadPersonalGoals() {
    new GetPersonalGoals({
      onSuccess: setUserGoals,
      onError: (error) => console.log('ERRO AO BUSCAR LISTA DE METAS', error.message),
      filters: { user_id: user.id },
    }).exec();
  }

  function createUserGoal(data: IPersonalGoalData) {
    helpers.DIALOG.await({ text: 'Criando meta...' });
    new CreatePersonalGoal({
      personalGoal: { ...data, user_id: user.id },
      onError: (error) => {
        switch (error.status) {
          case 422:
            userGoalForm.current?.setErrors({
              description: error.data.data.meta.errors.descricao[0],
            });
            break;
          default:
            helpers.DIALOG.error({ text: 'Não possível criar esta meta. Tente novamente mais tarde.' });
        }
      },
      onfinally: () => {
        loadPersonalGoals();
        helpers.DIALOG.close();
      },
    }).exec();
  }

  async function deleteUserGoal(personalGoal: IPersonalGoal) {
    const wantsToDelete = await helpers.DIALOG.confirm({
      title: 'Excluir meta?',
      text: `Tem certeza que deseja excluir a meta: '${personalGoal.description}'?`,
    });

    if (!wantsToDelete) return;

    setUserGoals(userGoals.filter(((goal) => goal.id !== personalGoal.id)));

    new DeletePersonalGoal({
      personalGoalId: personalGoal.id,
      onError: () => helpers.DIALOG.error({
        text: `Não possível excluir a meta: '${personalGoal.description}'. Tente novamente mais tarde.`,
      }),
      onfinally: loadPersonalGoals,
    }).exec();
  }

  function concludeUserGoal(personalGoal: IPersonalGoal) {
    personalGoal.done = true;
    personalGoal.finished_at = helpers.DATE.today();

    setUserGoals(userGoals.map(((goal) => (goal.id === personalGoal.id ? personalGoal : goal))));

    new UpdatePersonalGoal({
      personalGoal,
      onError: () => helpers.DIALOG.error({
        text: `Não possível concluir a meta: '${personalGoal.description}'. Tente novamente mais tarde.`,
      }),
      onfinally: loadPersonalGoals,
    }).exec();
  }

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
        <Title>FIB - Felicidade Interna Bruta</Title>
      </Styled.Header>

      <Styled.Main>
        <Styled.Left>
          <Styled.LeftHeader title="Foto e humor">
            <main>
              <Styled.UserHumor>
                <div className="user-humor__main">
                  <div className="user-humor__image">
                    <Image src={user.image} />
                  </div>
                  <div className="user-humor__measure-humor">
                    <span>Olá, </span>
                    <span className="user-humor__measure-humor__name">{user.name}</span>
                    <div className="user-humor__measure-humor__selector">
                      <span>Como se sente?</span>
                      <div className="user-humor__measure-humor__selector__humors">
                        <Styled.AngryIcon size={25} title="Com raiva" />
                        <Styled.SadIcon size={25} title="Triste" />
                        <Styled.NormalIcon size={25} title="Normal" />
                        <Styled.HappyIcon size={25} title="Feliz" />
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
                  {fibEmotions.map((emotion) => (
                    <div key={emotion.id}>
                      <input type="radio" id={`fib-emotion-${emotion.id}`} />
                      <label htmlFor={`fib-emotion-${emotion.id}`}>{emotion.description}</label>
                    </div>
                  ))}
                </main>
                <Button className="btn-success">Acessar o EPA</Button>
              </Styled.UserHumorIdentification>
            </main>
          </Styled.LeftHeader>

          <Styled.UserGoal title={`Em ${helpers.DATE.currentYear()} eu VOU`}>
            <Form className="form-group" ref={userGoalForm} onSubmit={createUserGoal}>
              <Input className="form-control" name="description" label="Meta" />

              <footer className="goal-footer">
                <div>
                  <Button className="btn-primary">Página inicial</Button>
                </div>
                <div className="goal-footer__right">
                  <Button className="btn-success">Incluir meta</Button>
                  <Button className="btn-info" onClick={toggleGoals}>
                    {showGoals ? 'Esconder metas' : 'Minhas metas'}
                  </Button>
                </div>
              </footer>
            </Form>

          </Styled.UserGoal>

          <Styled.UserSpace title="Esse espaço é seu!">
            <p>
              Tenha disciplina ao acompanhar o desenrolar de suas metas.
              Metas não foram feitas apenas pra serem escritas num papel mas pra serem alcançadas.
              Seja aquele regime que você sempre diz que vai começar,
              seja a busca pelo emprego dos sonhos.
              Não importa qual seja a sua meta, faça. Todos nós temos desejos e nada
              melhor do que ir atrás daquilo que tanto almejamos.
            </p>
          </Styled.UserSpace>
        </Styled.Left>

        <Styled.Right>
          <Styled.RightGoals title="Metas definidas" className={!showGoals ? 'd-none' : ''}>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {userGoals.filter((goal) => !goal.done).map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.description}</td>
                    <td>
                      <Button title="Concluir meta" onClick={() => concludeUserGoal(goal)}>
                        <FaCheckCircle style={{ fill: 'green' }} />
                      </Button>
                      <Button title="Excluir meta" onClick={() => deleteUserGoal(goal)}>
                        <FaTrash style={{ fill: 'red' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Styled.RightGoals>

          <Styled.RightAchievedGoals title="Metas alcançadas" className={!showGoals ? 'd-none' : ''}>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Concluída em</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {userGoals.filter((goal) => goal.done).map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.description}</td>
                    {
                      goal.finished_at
                      && <td>{helpers.DATE.formatToDisplay(goal.finished_at, false)}</td>
                    }
                    <td>
                      <Button onClick={() => deleteUserGoal(goal)}>
                        <FaTrash style={{ fill: 'red' }} title="Excluir meta" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Styled.RightAchievedGoals>

          <Styled.RightFib title="Felicidade interna bruta">
            <Image src={`figuras/img_fib/dica_${helpers.MATH.random(1, 44)}.jpg`} />
            <p>
              <strong>Felicidade Interna Bruta (FIB)</strong>
              {' '} É um indicador sistêmico desenvolvido no Butão, um pequeno país do Himalaia.
              O conceito nasceu em 1972, elaborado pelo rei butanês Jigme Singya WangChuck.
              Desde então, o reino de Butão , com o apoio do PNUD começou a colocar esse
              conceito em prática, e atraiu a atenção do resto do mundo com sua nova
              fórmula para medir o progresso de uma comunidade ou nação.
              Assim, o cálculo da 'riqueza' deve considerar outros aspectos
              além do desenvolvimento econômico, como a conservação do
              meio ambiente e qualidade da vida das pessoas.
            </p>
          </Styled.RightFib>
        </Styled.Right>
      </Styled.Main>
    </Styled.Container>
  );
};

export default Measure;
