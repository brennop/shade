import React, {createContext, useReducer, useEffect} from 'react';

export const LayersContext = createContext();

const reducer = (state, action) => {
  const {layers, current} = state;
  switch (action.type) {
    case 'ADD_LAYER':
      return {...state, layers: layers.concat(addLayer(action.shader, layers.length))};
    default:
      return state;
  }
};

const addLayer = ( shader, index ) => {
  const frag = `precision mediump float;
void main() {
  gl_FragColor = vec4(1);
}`;

  const render = shader({
    vert: `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
  }`,

    frag: frag,

    attributes: {
      position: [-4, -4, 4, -4, 0, 4],
    },

    count: 3,
  });

   // TODO: refactor to validate layer name
  return {name: 'layer' + index, render, frag, uniforms: [], values: {}};
};

export const LayersProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {layers: [], current: -1});

  useEffect(() => {
    try {
      state.layers.map(({render}) => render())
    } catch(e) {
    }
  }, [state.layers])

  return (
    <LayersContext.Provider value={{state, dispatch}}>
      {children}
    </LayersContext.Provider>
  );
};
