import React from 'react';
import styled from 'styled-components';
import {Button} from './styles';

const Container = styled.div`
  width: 100%;
  margin-top: 0.8rem;
  min-height: 0.8rem;
`;

const Bar = styled.div`
  background: #31e2bf;
  padding: 0.2rem;
  display: flex;
  justify-content: flex-end;
`;

const Layer = ({color, close, select}) => (
  <Container>
    <Bar>
      <Button>x</Button>
    </Bar>
  </Container>
);

export default Layer;
