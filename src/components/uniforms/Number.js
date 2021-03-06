import React, {useState, useEffect, useContext} from 'react';
import {LayersContext} from '../../context/Layers';
import styled from 'styled-components';
import {NumberInput as Input} from '../styles'

const Range = styled.input`
  width: 100%;
  margin-right: 0.8rem;
  outline: none;
  -webkit-appearance: none;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 2px solid #525252;
    height: 16px;
    width: 16px;
    border-radius: 100%;
    background: #414141;
    margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    background: #414141;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const Number = ({name, type, index}) => {
  const [value, setValue] = useState(0);
  const {state, dispatch} = useContext(LayersContext);

  useEffect(
    () =>
      dispatch({type: 'CHANGE_VALUE', value: parseFloat(value), name, index}),
    [value, dispatch, index, name],
  );
  const handleChange = event => setValue(event.target.value);

  return (
    <Wrapper>
      <Range
        type="range"
        min={-1}
        max={1}
        step={0.01}
        value={value}
        onChange={handleChange}
      />
      <Input type="text" value={value} onChange={handleChange} />
    </Wrapper>
  );
};

export default Number;
