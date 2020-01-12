import React, {useContext} from 'react';
import styled from 'styled-components';
import Layer from './Layer';
import {LayersContext} from '../context/Layers';
import {Button} from './styles';
import {IoIosAddCircle as Add, IoIosSettings as Cog} from 'react-icons/io';

const Container = styled.div`
  box-sizing: border-box;
  padding: 0.6rem;
  width: 12rem;
  height: 100%;
  float: right;
  background-color: #44444f;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Sidebar = ({openSettings}) => {
  const {state, dispatch} = useContext(LayersContext);

  return (
    <Container>
      <Icons>
        <Button onClick={openSettings}>
          <Cog />
        </Button>
        <Button onClick={() => dispatch({type: 'ADD_LAYER'})}>
          <Add />
        </Button>
      </Icons>
      {state.layers &&
        state.layers.map((layer, index) => (
          <Layer key={layer.name} index={index} />
        ))}
    </Container>
  );
};

export default Sidebar;
