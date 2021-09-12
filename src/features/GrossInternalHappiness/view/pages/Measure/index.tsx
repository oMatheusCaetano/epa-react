import React, { useState, useEffect, useRef } from 'react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { getFibEmotions } from '~/features/GrossInternalHappiness/domain/store/fib';
import { getAuthenticatedUser } from '~/features/Auth/domain/store/auth/index';
import { getPersonalGoals, deletePersonalGoal, updatePersonalGoal, createPersonalGoal } from '~/features/PersonalGoals/domain/store/personal-goal';

import helpers from '~/core/helpers';

import { useAppStore, useDialog } from '~/core/hooks';

import IPersonalGoal, { IPersonalGoalData } from '~/features/PersonalGoals/domain/models/IPersonalGoal';

import { Button, Image, Title, Input, Radio } from '~/core/view/components';

import * as Styled from './styles';

const Measure: React.FC = () => {
  const DIALOG = useDialog();
  const { store, dispatch } = useAppStore();

  const userGoalForm = useRef<FormHandles>(null);
  const userEmotionForm = useRef<FormHandles>(null);

  const [userHumor, setUserHumor] = useState(0);
  const [makeUserHumorPublic, setMakeUserHumorPublic] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  useEffect(() => {
    dispatch(getAuthenticatedUser());
    dispatch(getFibEmotions({}));
  }, []);

  useEffect(() => {
    if (store.AUTH.authUser.id) {
      dispatch(getPersonalGoals({ filters: { user_id: store.AUTH.authUser.id } }));
    }
  }, [store.AUTH.authUser.id]);

  const updateUserImage = (file: File) => {
    // TODO: Implementa lógica para atualizar a imagem do usuário
    console.log(file);
  };

  const saveUserHumor: SubmitHandler = async (data) => {
    if (!userHumor) {
      DIALOG.warning({ title: 'Informe como você se sente hoje.' });
    }

    // TODO: Implementa lógica para salvar o humor do usuário
    console.log(data);
    console.log(userHumor);
    console.log(makeUserHumorPublic);
  };

  const createUserGoal: SubmitHandler<IPersonalGoalData> = async (data, event) => {
    await dispatch(createPersonalGoal(data, {
      reload: true,
      reloadFilters: { user_id: store.AUTH.authUser.id },
    }));

    if (!store.PERSONAL_GOAL.error.length) {
      event.reset();
    }
  };

  const deleteUserGoal = async (personalGoal: IPersonalGoal) => {
    const wantsToDelete = await DIALOG.confirm({
      title: 'Excluir meta?',
      text: `Tem certeza que deseja excluir a meta: '${personalGoal.description}'?`,
    });

    if (!wantsToDelete) return;

    dispatch(deletePersonalGoal(personalGoal.id, {
      reload: true,
      reloadFilters: { user_id: store.AUTH.authUser.id },
    }));
  };

  const concludeUserGoal = async (personalGoal: IPersonalGoal) => {
    dispatch(updatePersonalGoal({ ...personalGoal, done: true }, {
      reload: true,
      reloadFilters: { user_id: store.AUTH.authUser.id },
    }));
  };

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
                    <Image
                      editable
                      src={store.AUTH.authUser.image}
                      onFileSelection={updateUserImage}
                    />
                  </div>
                  <div className="user-humor__measure-humor">
                    <span>Olá, </span>
                    <span className="user-humor__measure-humor__name">{store.AUTH.authUser.name}</span>
                    <div className="user-humor__measure-humor__selector">
                      <span>Como se sente?</span>
                      <div className="user-humor__measure-humor__selector__humors">
                        <Styled.AngryIcon size={25} title="Com raiva" onClick={() => setUserHumor(4)} humor={userHumor} />
                        <Styled.SadIcon size={25} title="Triste" onClick={() => setUserHumor(3)} humor={userHumor} />
                        <Styled.NormalIcon size={25} title="Normal" onClick={() => setUserHumor(2)} humor={userHumor} />
                        <Styled.HappyIcon size={25} title="Feliz" onClick={() => setUserHumor(1)} humor={userHumor} />
                      </div>
                      <footer>
                        <div />
                        <input type="checkbox" id="make-humor-public" onClick={() => setMakeUserHumorPublic(!makeUserHumorPublic)} />
                        <label htmlFor="make-humor-public">Tornar público</label>
                      </footer>
                    </div>
                  </div>
                </div>
              </Styled.UserHumor>

              <Styled.UserHumorIdentification onSubmit={saveUserHumor} ref={userEmotionForm}>
                <span>Com qual dessas emoções você mais se identifica neste momento?</span>
                <main className="user-other-humor">
                  <Radio
                    name="emotion"
                    options={store.FIB.fibEmotions.map((emotion) => (
                      { label: emotion.description, value: emotion.id }
                    ))}
                  />
                </main>
                <Button className="btn-success">Acessar o EPA</Button>
              </Styled.UserHumorIdentification>
            </main>
          </Styled.LeftHeader>

          <Styled.UserGoal title={`Em ${helpers.DATE.currentYear()} eu VOU`}>
            <Form className="form-group" ref={userGoalForm} onSubmit={createUserGoal}>
              <Input name="description" label="Meta" />

              <footer className="goal-footer">
                <div>
                  <Button className="btn-primary">Página inicial</Button>
                </div>
                <div className="goal-footer__right">
                  <Button className="btn-success" loading={store.PERSONAL_GOAL.loading}>
                    Incluir meta
                  </Button>
                  <Button className="btn-info" type="button" onClick={() => setShowGoals(!showGoals)}>
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
                {store.PERSONAL_GOAL.personalGoals.filter((goal) => !goal.done).map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.description}</td>
                    <td>
                      <Button title="Concluir meta" onClick={() => concludeUserGoal(goal)} loading={store.PERSONAL_GOAL.loading}>
                        <FaCheckCircle style={{ fill: 'green' }} />
                      </Button>
                      <Button title="Excluir meta" onClick={() => deleteUserGoal(goal)} loading={store.PERSONAL_GOAL.loading}>
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
                {store.PERSONAL_GOAL.personalGoals.filter((goal) => goal.done).map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.description}</td>
                    {
                      goal.finished_at
                      && <td>{helpers.DATE.formatToDisplay(goal.finished_at, false)}</td>
                    }
                    <td>
                      <Button
                        onClick={() => deleteUserGoal(goal)}
                        loading={store.PERSONAL_GOAL.loading}
                      >
                        <FaTrash style={{ fill: 'red' }} title="Excluir meta" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Styled.RightAchievedGoals>

          <Styled.RightFib title="Felicidade interna bruta">
            <Image src={store.FIB.fibTodaysImage} />
            <p>
              <strong>Felicidade Interna Bruta (FIB)</strong>
              {' '} É um indicador sistêmico desenvolvido no Butão, um pequeno país do Himalaia.
              O conceito nasceu em 1972, elaborado pelo rei butanês Jigme Singya WangChuck.
              Desde então, o reino de Butão , com o apoio do PNUD começou a colocar esse
              conceito em prática, e atraiu a atenção do resto do mundo com sua nova
              fórmula para medir o progresso de uma comunidade ou nação.
              Assim, o cálculo da &apos;riqueza&apos; deve considerar outros aspectos
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
