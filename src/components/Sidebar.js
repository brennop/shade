import React, {useContext} from 'react';
import styled from 'styled-components';
import Layer from './Layer';
import {LayersContext} from '../context/Layers'

const Container = styled.div`
  padding: 1rem;
  width: 12rem;
  height: 100%;
  float: right;
  background-color: var(--dark);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
` 

const Sidebar = ({shader}) => {
  const {state, dispatch} = useContext(LayersContext);

  return (
    <Container>
      <button className="btn" onClick={() => dispatch({type: 'ADD_LAYER', shader: shader}) }>
        +
      </button>
      {state.layers &&
        state.layers.map((layer, index) => (
          <Layer key={layer.name}/>
        ))}
    </Container>
  );
};

export default Sidebar;
