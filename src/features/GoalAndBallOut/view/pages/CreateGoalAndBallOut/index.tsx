import React, { useEffect, useState } from 'react';

import { useRoute, useDialog } from '~/core/view/hooks';
import { ManagementUnitHierarchyType } from '~/features/ManagementUnits/domain/stores/management-unit';

import * as C from '~/core/view/components';
import * as S from './styles';
import { URL } from '~/core/domain/helpers';
import { CreateKick, GetKick } from '~/features/GoalAndBallOut/data/datasources/kick';
import { DataError } from '~/core/data/datasources/Datasource';

const CreateGoalAndBallOut: React.FC = () => {
  const route = useRoute();
  const dialog = useDialog();
  const goalValue = URL.get('kick-type') === '0' ? '0' : '1';
  const [showClienteSelector, setShowClienteSelector] = useState(!!goalValue);
  const [errors, setErrors] = useState({} as DataError);
  const [kick, setKick] = useState({
    gol: goalValue,
    unidades_gerenciais: '',
    clientes: '',
    descricao: '',
  });

  useEffect(() => {
    if (!route.id) return;
    dialog.await({ text: 'Recuperando dados do chute..' });
    new GetKick().exec({
      id: route.id,
      with: ['rUnidadesGerenciais', 'rUsuarios'],
      onSuccess: (kick) => {
        const getIds = (key: string, items?: any[]) => items?.map((item) => item[key]).join(',') ?? '';

        setKick({
          gol: String(kick.gol),
          descricao: kick.mensagem,
          unidades_gerenciais: getIds('codigo', kick.r_unidades_gerenciais),
          clientes: getIds('codigo_cliente', kick.r_usuarios),
        });

        if (String(kick.gol) === '0') {
          setShowClienteSelector(false);
        }
      },
      onFinally: () => dialog.close(),
    });
  }, []);

  async function handleDelete() {
    dialog.confirm({ title: 'Excluir?' });
  }

  async function handleUpdate(data: C.FormikValues) {
    dialog.confirm({ text: JSON.stringify(data) });
  }

  async function handleCreate(data: C.FormikValues) {
    dialog.await({ text: 'Salvando chute..' });
    new CreateKick().exec({
      data,
      onFinally: () => dialog.close(),
      onError: (error) => setErrors(error.errors ?? {}),
    });
    dialog.close();
  }

  return (
    <C.PageContainer
      title="Qual foi o chute de hoje?"
      actions={(
        <C.Link href="pesquisa_gol.php?cbotipo=1" toLegacyEpa>
          <C.IconButton styleAs={C.IconButtonType.RETURN} />
        </C.Link>
        )}
    >
      <C.SectionContainer title="Descreva o chute">
        <C.Formik
          initialValues={kick}
          onSubmit={(values) => { route.id ? handleUpdate(values) : handleCreate(values); }}
        >
          <C.Formik.GoalAndBallOutRadioGroup
            name="gol"
            className="mt-2"
            error={errors.gol?.length ? errors.gol[0] : ''}
            onGoal={() => setShowClienteSelector(true)}
            onBallOut={() => setShowClienteSelector(false)}
          />

          <S.Middle>
            <C.Formik.ManagementUnitSelect
              all
              multiple
              className="col-4"
              name="unidades_gerenciais"
              error={errors.unidades_gerenciais?.length ? errors.unidades_gerenciais[0] : ''}
              unitType={ManagementUnitHierarchyType.STRATEGY}
            />

            {showClienteSelector && (
              <C.Formik.ClienteInput
                className="col-4 ms-4"
                name="clientes"
                error={errors.clientes?.length ? errors.clientes[0] : ''}
                label="Quem marcou o gol?"
                multiple
              />
            )}
          </S.Middle>

          <C.Formik.RichText
            name="descricao"
            label="Descreva o chute"
            error={errors.mensagem?.length ? errors.mensagem[0] : ''}
          />

          <footer className="d-flex mt-4 justify-content-end">
            {route.id && (
              <C.Button
                className="mx-3"
                styleAs={C.ButtonStyle.DELETE}
                onClick={handleDelete}
              />
            )}
            <C.Formik.Submit />
          </footer>
        </C.Formik>
      </C.SectionContainer>
    </C.PageContainer>
  );
};

export default CreateGoalAndBallOut;
