import React, {useState, useEffect, useContext, useRef} from 'react';
import {LayersContext} from '../context/Layers';
import styled from 'styled-components';
import ace from 'ace-builds';
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  padding: 1em;
  width: 18rem;
  background-color: #1d1f21;
`

const Code = () => {
  const [code, setCode] = useState('');
  const textarea = useRef(null);
  const {state, dispatch} = useContext(LayersContext);
    const editor = ace.edit(textarea.current, {
      mode: 'ace/mode/glsl',
      theme: 'ace/theme/tomorrow_night',
      enableLiveAutocompletion: true,
      showGutter: false,
      showPrintMargin: false,
      wrap: true,
      fontFamily: "Inconsolata",
      fontSize: "14px",
      highlightActiveLine: false,
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
    <Wrapper>
      <Editor ref={textarea} />
    </Wrapper>
  );
};

export default Code;
