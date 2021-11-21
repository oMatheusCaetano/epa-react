/* eslint-disable no-console */
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
          console.log('FORM VALUES', values);
        }}
      >
        <C.Formik.GoalAndBallOutRadioGroup name="picked" />
        <S.Middle>
          <C.Select
            multiple
            collapsible
            all
            label="Unidade Gerencial"
            onChange={(e) => console.log(e)}
            options={[
              { label: 'Hello World 1.1', value: 'Hello World 1' },
              { label: 'Hello World 2',
                value: 'Hello World 2',
                children: [
                  { label: 'Hello World 2.1', value: 'Hello World 2.1', selected: true },
                  {
                    label: 'Hello World 2.2',
                    value: 'Hello World 2.2',
                    children: [
                      { label: 'Hello World 2.2.1', value: 'Hello world 2.2.1', selected: true },
                      { label: 'Hello World 2.2.2', value: 'Hello world 2.2.2' },
                    ],
                  },
                ],
              },
            ]}
          />
          <C.Formik.ClienteInput className="col-4 me-4" name="unidade_gerencial" label="Quem marcou o gol?" multiple />
        </S.Middle>
        <C.Formik.Submit />
      </C.Formik>
    </C.SectionContainer>
  </C.PageContainer>
);

export default CreateGoalAndBallOut;
