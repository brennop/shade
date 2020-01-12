import React, {createContext, useReducer, useEffect} from 'react';

export const LayersContext = createContext();

const reducer = (state, action) => {
  const {layers, current, shader} = state;
  switch (action.type) {
    case 'ADD_LAYER':
      return {
        ...state,
        layers: layers.concat(addLayer(shader, layers.length)),
      };
    case 'CHANGE_CURRENT':
      return {...state, current: action.value};
    case 'SET_SHADER':
      return {...state, shader: action.value};
    case 'CHANGE_FRAG':
      return {
        ...state,
        layers: layers.map((l, i) =>
          i === current ? recreate(l, action.value, shader) : l,
        ),
      };
    case 'CHANGE_VALUE':
      return {
        ...state,
        layers: layers.map((l, i) =>
          i === action.index ? changeValue(l, action.name, action.value) : l,
        ),
      };
    case 'REMOVE_LAYER':
      return {
        ...state, layers: layers.filter((l, i) => i !== action.index), current: current === action.index ? -1 : current,
      }
    default:
      return state;
  }
};

const changeValue = (l, name, value) => {
  // {...l, values: {...l.values, [action.name] : action.value}}
  l.values[name] = value;
  return l;
};

const recreate = (l, value, shader) => {
  l.frag = value.code;
  l.uniforms = value.uniforms;
  l.render = shader({
    vert: `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
  }`,
    frag: (context, props) => props.frag,

    // Could also be done with Object.fromEntries
    uniforms: value.uniforms.reduce(
      (obj, {name}) => ({
        ...obj,
        [name]: (context, props) => props.values[name],
      }),
      {},
    ),

    attributes: {
      position: [-4, -4, 4, -4, 0, 4],
    },

    count: 3,
  });
  return l;
};

const addLayer = (shader, index) => {
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

    frag: (context, props) => props.frag,

    attributes: {
      position: [-4, -4, 4, -4, 0, 4],
    },

    count: 3,
  });

  // TODO: refactor to validate layer name
  return {name: 'layer' + index, render, frag, uniforms: [], values: {}};
};

export const LayersProvider = ({children, shader}) => {
  const [state, dispatch] = useReducer(reducer, {
    layers: [],
    current: -1,
    shader: null,
  });

  useEffect(() => dispatch({type: 'SET_SHADER', value: shader}), [shader]);

  useEffect(() => {
    try {
      state.layers.map(({render, frag, values}) => render({frag, values}));
    } catch (e) {}
  }, [state.layers]);

  return (
    <LayersContext.Provider value={{state, dispatch}}>
      {children}
    </LayersContext.Provider>
  );
};
