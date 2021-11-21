/* eslint-disable no-console */
import React from 'react';

import { ManagementUnitHierarchyType } from '~/features/ManagementUnits/domain/stores/management-unit';

import * as C from '~/core/view/components';
import * as S from './styles';

const CreateGoalAndBallOut: React.FC = () => (
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
        initialValues={{
          gol: 'Bola Fora',
          unidades_gerenciais: '661,662,709',
          clientes: '1',
        }}
        onSubmit={async (values) => {
          console.log('FORM VALUES', values);
        }}
      >
        <C.Formik.GoalAndBallOutRadioGroup name="gol" className="mt-2" />

        <S.Middle>
          <C.Formik.ManagementUnitSelect
            all
            multiple
            className="col-4"
            name="unidades_gerenciais"
            unitType={ManagementUnitHierarchyType.STRATEGY}
          />

          <C.Formik.ClienteInput
            className="col-4 ms-4"
            name="clientes"
            label="Quem marcou o gol?"
            multiple
          />
        </S.Middle>

        <C.Formik.Submit />
      </C.Formik>
    </C.SectionContainer>
  </C.PageContainer>
);

export default CreateGoalAndBallOut;
