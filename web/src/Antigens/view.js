import React, { useState } from 'react';
import {
  Button,
  Section,
  Container,
  Box,
  Hero,
  Heading,
  Form,
  Columns,
  Content
} from 'react-bulma-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import arrayMove from 'array-move';

function App() {
  return (
    <div>
      <Section>
        <Container>
          <Heading>SugarSnap</Heading>
          <Columns>
            <Columns.Column>
              <Form.Field>
                <Form.Label>Stats</Form.Label>
                <Form.Control>
                  Mettaur
                </Form.Control>
              </Form.Field>
            </Columns.Column>
            <Columns.Column>
              <Form.Label>Scores</Form.Label>
              <Content>
                <p><strong>Mind</strong> 3</p>
                <p><strong>Body</strong> 2</p>
                <p><strong>Soul</strong> 1</p>
              </Content>

            </Columns.Column>
            <Columns.Column>
              <Form.Label>Calculations</Form.Label>
              <Content>
                <p><strong>Folder</strong> 9</p>
                <p><strong>Health</strong> 4</p>
                <p><strong>Capacity</strong> 2</p>
              </Content>

            </Columns.Column>
          </Columns>
          <Columns>
            <Columns.Column>
              Chips Equipped
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
            </Columns.Column>
            <Columns.Column>
              AddOns Equipped
              <Box></Box>
              <Box></Box>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </div>
  );
}

export default App;
