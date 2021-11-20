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
        }}
        onSubmit={async (values) => {
          console.log(values.picked);
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <C.Formik.GoalAndBallOutRadioGroup name="picked" />
        <br />
        <br />
        <S.Middle>
          <C.ClienteInput className="col-4 me-4" label="Quem marcou o gol?" />
          <C.ClienteInput className="col-4" label="Quem marcou o gol?" multiple />
        </S.Middle>
        <br />
        <br />
        <C.Formik.Submit />
      </C.Formik>
    </C.SectionContainer>
  </C.PageContainer>
);

export default CreateGoalAndBallOut;
