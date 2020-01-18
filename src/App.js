import React, {useEffect, useState, useRef} from 'react';
import {Layout} from './components/styles';
import Board from './components/Board';
import {LayersProvider} from './context/Layers';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import Code from './components/Code';
import {DndProvider} from 'react-dnd';
// Maybe move this to Layer.js
import Backend from 'react-dnd-html5-backend';
import regl from 'regl';

const App = () => {
  const canvas = useRef(null);
  const [shader, setShader] = useState();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const gl = canvas.current.getContext('webgl', {preserveDrawingBuffer: true})
    setShader(() => regl(gl));
  }, []);

  return (
    <DndProvider backend={Backend}>
      <LayersProvider shader={shader}>
        <Layout>
          <Board _ref={canvas} />
          <Code />
          <Sidebar openSettings={() => setShowSettings(true)} />
        </Layout>
        <Settings
          isOpen={showSettings}
          handleClose={() => setShowSettings(false)}
        />
      </LayersProvider>
    </DndProvider>
  );
};

export default App;
