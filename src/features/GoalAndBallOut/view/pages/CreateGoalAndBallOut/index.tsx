import React from 'react';

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
          picked: '',
          unidade_gerencial: '1',
          clientes: '',
        }}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('FORM VALUES', values);
        }}
      >
        <C.Formik.GoalAndBallOutRadioGroup name="picked" />
        <br />
        <br />
        <S.Middle>
          <C.Formik.ClienteInput className="col-4 me-4" name="unidade_gerencial" label="Quem marcou o gol?" multiple />
          {/* <C.Formik.ClienteInput className="col-4"
          name="clientes" label="Quem marcou o gol?" multiple /> */}
        </S.Middle>
        <br />
        <br />
        <C.Formik.Submit />
      </C.Formik>
    </C.SectionContainer>
  </C.PageContainer>
);

export default CreateGoalAndBallOut;
