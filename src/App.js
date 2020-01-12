import React, {useEffect, useState, useRef} from 'react';
import {Layout} from './components/styles';
import Board from './components/Board';
import {LayersProvider} from './context/Layers';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings'
import Code from './components/Code';
import regl from 'regl';

const App = () => {
  const canvas = useRef(null);
  const [shader, setShader] = useState();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setShader(() => regl(canvas.current));
  }, []);

  return (
    <LayersProvider shader={shader}>
      <Layout>
        <Board _ref={canvas} />
        <Code />
        <Sidebar openSettings={() => setShowSettings(true)} />
      </Layout>
      <Settings isOpen={showSettings} handleClose={() => setShowSettings(false)}/>
    </LayersProvider>
  );
};

export default App;
