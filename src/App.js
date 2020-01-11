import React, {useEffect, useState, useRef} from 'react';
import {Layout, Board} from './components/styles';
import {LayersProvider} from './context/Layers';
import Sidebar from './components/Sidebar';
import Code from './components/Code';
import regl from 'regl';

const App = () => {
  const canvas = useRef(null);
  const [shader, setShader] = useState();

  useEffect(() => {
    setShader(() => regl(canvas.current));
  }, []);

  return (
    <LayersProvider shader={shader}>
      <Layout>
        <Board>
          <div ref={canvas}></div>
        </Board>
        <Code />
        <Sidebar shader={shader} />
      </Layout>
    </LayersProvider>
  );
};

export default App;
