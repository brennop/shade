import React, {useEffect, useState, useRef} from 'react';
import Sidebar from './components/Sidebar';
import Code from './components/Code';
import './styles.css';
import regl from 'regl';

const App = () => {
  const canvas = useRef(null);
  const [shader, setShader] = useState();
  const [code, setCode] = useState('');
  const [layers, setLayers] = useState([]);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    setShader(() => regl(canvas.current));
  }, []);

  // TODO: fix warning with useReducer
  useEffect(() => {
    if (current >= 0) setCode(layers[current].frag);
  }, [current]);

  useEffect(() => {
    if (current >= 0) {
      // Changing layers directly does not work because reference stays the
      // same and does not trigger the 'layers' useEffect
      setLayers(layers =>
        layers.map((layer, index) =>
          index === current ? {...layer, frag: code} : layer,
        ),
      );
    }
  }, [code, current]);

  useEffect(() => {
    // depending on performance, could be move to a regl.frame function
    try {
      layers.map(({render, frag}) => render({frag}));
    } catch (e) {
      // TODO: handle errors on code editor
    }
  }, [layers]);

  const newLayer = () => {
    const render = shader({
      vert: `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
  }`,
      // TODO: refactor to remove context
      frag: (context, props) => props.frag,

      attributes: {
        position: [-4, -4, 4, -4, 0, 4],
      },

      count: 3,
    });

    const frag = `void main() {
    gl_FragColor = vec4(1);
  }`;

    const id = Math.random().toString(36);
    const color = `hsl(${Math.random() * 360}, 60%, 70%)`;
    // if layers are reversed, change this and update flex-direction on css
    setLayers([{id, color, render, frag}].concat(layers));
  };

  return (
    <div className="layout">
      <div className="image">
        <div className="canvas" ref={canvas}></div>
      </div>
      <Code code={code} changeCode={ev => setCode(ev.target.value)} />
      <Sidebar
        layers={layers}
        newLayer={newLayer}
        setLayers={setLayers}
        setCurrent={setCurrent}
      />
    </div>
  );
};

export default App;
