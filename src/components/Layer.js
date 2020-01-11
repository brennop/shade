import React, {useContext} from 'react';
import styled from 'styled-components';
import {Button} from './styles';
import {LayersContext} from '../context/Layers';
import {Uniform} from './uniforms';

const Container = styled.div`
  width: 100%;
  margin-top: 0.8rem;
  min-height: 2rem;
  background-color: #313139;
`;

const Bar = styled.div`
  background: #31e2bf;
  padding: 0.2rem;
  display: flex;
  justify-content: flex-end;
  height: 0.8rem;
`;

const Layer = ({index}) => {
  const {state, dispatch} = useContext(LayersContext);

  return (
    <Container>
      <Bar onClick={() => dispatch({type: 'CHANGE_CURRENT', value: index})}>
        <Button>x</Button>
      </Bar>
      {state.layers[index].uniforms.map(({name, type}) => (
        <Uniform name={name} type={type} index={index} />
      ))}
    </Container>
  );
};
export default Layer;
