import React from 'react';
import { Button, ActionButton } from '~/core/view/components';

import * as Styled from './styles';

const Todo: React.FC = () => (
  <Styled.Container>
    <Styled.Todo>
      To-do
      <Styled.Counter>5</Styled.Counter>
    </Styled.Todo>

    <Styled.TodosContainer>
      <Styled.Header>
        <h6>To-Do List</h6>
      </Styled.Header>

      <Styled.TodosList>
        <Styled.TodoItem>
          <input type="checkbox" />
          <div contentEditable>
            loremloremloremloremloremloremv loremloremlorssemloremloremloremloremlor
            emloremloremloremloremloremloremloremv lore
          </div>
        </Styled.TodoItem>

        <Styled.TodoItem>
          <input type="checkbox" />
          <div contentEditable>
            loremloremloremloremloremloremv loremloremloremloremloremloremloremlor
            emloremloremloremloremloremloremloremv lore
          </div>
        </Styled.TodoItem>
      </Styled.TodosList>

      <Styled.Footer>
        <ActionButton>a</ActionButton>

        <Button>Em andamento</Button>
        <Button>Concluídas</Button>
      </Styled.Footer>
    </Styled.TodosContainer>
  </Styled.Container>

);

export default Todo;
