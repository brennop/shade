import React, {useState, useEffect, useContext} from 'react';
import {LayersContext} from '../context/Layers';
import styled from 'styled-components';

const CodeArea = styled.textarea`
  box-sizing: border-box;
  font-family: 'Courier Prime', monospace;
  font-size: 0.8em;
  padding: 1.6rem;
  height: 100%;
  width: 16rem;
  float: right;
  color: #e2e2e2;
  background-color: #484848;
  border: none;
  outline: none;
  resize: none;
`;

const Code = () => {
  const [code, setCode] = useState('');
  const {state, dispatch} = useContext(LayersContext);

  const handleChange = event => setCode(event.target.value);

  useEffect(
    () => setCode(state.current >= 0 ? state.layers[state.current].frag : ''),
    [state],
  );

  useEffect(() => {
    const uniforms = code
      .split('\n')
      .filter(line => line.startsWith('uniform') && line.endsWith(';'))
      .map(line => line.slice(0, -1).split(' '))
      .filter(line => line.length === 3)
      .map(words => ({name: words[2], type: words[1]}))

    dispatch({type: 'CHANGE_FRAG', value: {code, uniforms}});
  }, [code, dispatch]);

  return (
    <div>
      <CodeArea value={code} onChange={handleChange} />
    </div>
  );
};

export default Code;
