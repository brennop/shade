import React, {useContext} from 'react';
import styled from 'styled-components';
import {Button} from './styles';
import {LayersContext} from '../context/Layers';

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

const Layer = ({index}) => {
  const {state, dispatch} = useContext(LayersContext);

  return (
    <Container>
      <Bar onClick={() => dispatch({type: 'CHANGE_CURRENT', value: index})}>
        <Button>x</Button>
      </Bar>
    </Container>
  );
};
export default Layer;
