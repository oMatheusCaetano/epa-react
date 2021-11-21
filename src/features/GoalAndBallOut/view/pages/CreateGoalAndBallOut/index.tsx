/* eslint-disable no-console */
import React from 'react';

import * as C from '~/core/view/components';
import { ManagementUnitHierarchyType } from '~/features/ManagementUnits/domain/stores/management-unit';
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
          picked: '',
          unidade_gerencial: '1',
          clientes: '',
        }}
        onSubmit={async (values) => {
          console.log('FORM VALUES', values);
        }}
      >
        <C.Formik.GoalAndBallOutRadioGroup name="picked" />
        <S.Middle>
          <C.ManagementUnitSelect
            all
            multiple
            unitType={ManagementUnitHierarchyType.STRATEGY}
            onChange={(e) => console.log(e)}
          />
          <C.Formik.ClienteInput className="col-4 me-4" name="unidade_gerencial" label="Quem marcou o gol?" multiple />
        </S.Middle>
        <C.Formik.Submit />
      </C.Formik>
    </C.SectionContainer>
  </C.PageContainer>
);

export default CreateGoalAndBallOut;
