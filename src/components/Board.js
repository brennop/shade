import React, {useContext} from 'react';
import {LayersContext} from '../context/Layers';
import {Board as Wrapper} from './styles';

const Board = ({_ref}) => {
  const {state, dispatch} = useContext(LayersContext);
  return (
    <Wrapper>
      <canvas
        ref={_ref}
        width={state.settings.width}
        height={state.settings.height}
      />
    </Wrapper>
  );
};

export default Board;
