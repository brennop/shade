import React, {useContext} from 'react';
import styled from 'styled-components';
import Layer from './Layer';
import {LayersContext} from '../context/Layers'
import {Button} from './styles'

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  width: 12rem;
  height: 100%;
  float: right;
  background-color: #2f2f2f;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
` 

const Sidebar = ({shader}) => {
  const {state, dispatch} = useContext(LayersContext);

  return (
    <Container>
      <Button onClick={() => dispatch({type: 'ADD_LAYER', shader: shader}) }>
        +
      </Button>
      {state.layers &&
        state.layers.map((layer, index) => (
          <Layer key={layer.name} index={index}/>
        ))}
    </Container>
  );
};

export default Sidebar;
