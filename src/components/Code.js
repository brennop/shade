import React, {useState, useEffect, useContext, useRef} from 'react';
import {LayersContext} from '../context/Layers';
import styled from 'styled-components';
import ace from 'ace-builds';
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/ext-language_tools";

// const CodeArea = styled.textarea`
//   box-sizing: border-box;
//   font-family: 'Courier Prime', monospace;
//   font-size: 0.75em;
//   padding: 1.6rem;
//   height: 100%;
//   width: 20rem;
//   float: right;
//   color: #e2e2e2;
//   background-color: #34343c;
//   border: none;
//   outline: none;
//   resize: none;
// `;

const Editor = styled.div`
  height: 100%;
  width: 20rem;
`;

const Code = () => {
  const [code, setCode] = useState('');
  const textarea = useRef(null);
  const {state, dispatch} = useContext(LayersContext);
    const editor = ace.edit(textarea.current, {
      mode: 'ace/mode/glsl',
      theme: 'ace/theme/vibrant_ink',
      enableLiveAutocompletion: true,
      showGutter: false,
    });

    editor.on('change', e => setCode(editor.getValue()))


  useEffect(
    () => {editor && editor.setValue(state.current >= 0 ? state.layers[state.current].frag : '', -1)},
    [state.current],
  );

  useEffect(() => {
    const uniforms = code
      .split('\n')
      .filter(line => line.startsWith('uniform') && line.endsWith(';'))
      .map(line => line.slice(0, -1).split(' '))
      .filter(line => line.length === 3)
      .map(words => ({name: words[2], type: words[1]}));

    dispatch({type: 'CHANGE_FRAG', value: {code, uniforms}});
  }, [code, dispatch]);

  return (
    <div>
      <Editor ref={textarea} />
    </div>
  );
};

export default Code;
