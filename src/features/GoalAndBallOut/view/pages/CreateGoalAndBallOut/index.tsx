import React, { useState } from 'react';
import * as Yup from 'yup';

import { useRoute, useDialog } from '~/core/view/hooks';
import { ManagementUnitHierarchyType } from '~/features/ManagementUnits/domain/stores/management-unit';

import * as C from '~/core/view/components';
import * as S from './styles';
import { URL } from '~/core/domain/helpers';

const CreateGoalAndBallOut: React.FC = () => {
  const route = useRoute();
  const dialog = useDialog();
  const goalValue = URL.get('cbotipo') === '0' ? '0' : '1';
  const [showClienteSelector, setShowClienteSelector] = useState(!!goalValue);

  function handleInitialValues() {
    return {
      gol: '',
      unidades_gerenciais: '',
      clientes: '',
      descricao: '',
    };
  }

  function handleValidationSchema() {
    const message = 'Este campo é obrigatório';
    return Yup.object({
      gol: Yup.string().required(message),
      unidades_gerenciais: Yup.string().required(message),
      clientes: Yup.string().required(message),
      descricao: Yup.string().required(message),
    });
  }

  async function handleDelete() {
    dialog.confirm({ title: 'Excluir?' });
  }

  async function handleUpdate(data: C.FormikValues) {
    dialog.confirm({ text: JSON.stringify(data) });
  }

  async function handleCreate(data: C.FormikValues) {
    dialog.confirm({ text: JSON.stringify(data) });
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
          initialValues={handleInitialValues()}
          validationSchema={handleValidationSchema}
          onSubmit={(values) => { route.id ? handleUpdate(values) : handleCreate(values); }}
        >
          <C.Formik.GoalAndBallOutRadioGroup
            name="gol"
            className="mt-2"
            onGoal={() => setShowClienteSelector(true)}
            onBallOut={() => setShowClienteSelector(false)}
          />

          <S.Middle>
            <C.Formik.ManagementUnitSelect
              all
              multiple
              className="col-4"
              name="unidades_gerenciais"
              unitType={ManagementUnitHierarchyType.STRATEGY}
            />

            {showClienteSelector && (
              <C.Formik.ClienteInput
                className="col-4 ms-4"
                name="clientes"
                label="Quem marcou o gol?"
                multiple
              />
            )}
          </S.Middle>

          <C.Formik.RichText
            name="descricao"
            label="Descreva o chute"
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
