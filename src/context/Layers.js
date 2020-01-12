import React, {createContext, useReducer, useEffect} from 'react';

export const LayersContext = createContext();

const reducer = (state, action) => {
  const {layers, current, shader, settings} = state;
  switch (action.type) {
    case 'ADD_LAYER':
      const newLayer = addLayer(shader, layers.length, settings);
      return {
        ...state,
        layers: layers.concat(newLayer),
        settings: {
          ...settings,
          main: settings.main === null ? 0 : settings.main,
        },
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
        ...state,
        layers: layers.filter((l, i) => i !== action.index),
        current: current === action.index ? -1 : current,
      };
    case 'SAVE_SETTINGS':
      return {
        ...state,
        settings: action.settings,
        layers: updateFbos(layers, action.settings),
      };
    default:
      return state;
  }
};

const updateFbos = (layers, settings) => {
  return layers.map(layer => ({
    ...layer,
    fbo: layer.fbo.resize(parseInt(settings.width), parseInt(settings.height)),
  }));
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

    framebuffer: (context, props) => props.fbo,
    count: 3,
  });
  return l;
};

const addLayer = (shader, index, settings) => {
  const frag = `precision mediump float;
void main() {
  gl_FragColor = vec4(1);
}`;

  // const fbo = shader.framebuffer({
  //   width: parseInt(settings.width),
  //   height: parseInt(settings.height)
  // });

  const fbo = shader.framebuffer({
    color: shader.texture({
      width: parseInt(settings.width),
      height: parseInt(settings.height),
    }),
  });

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

    framebuffer: (context, props) => props.fbo,
    count: 3,
  });

  // TODO: refactor to validate layer name
  return {name: 'layer' + index, render, frag, uniforms: [], values: {}, fbo};
};

export const LayersProvider = ({children, shader}) => {
  const [state, dispatch] = useReducer(reducer, {
    layers: [],
    current: -1,
    shader: null,
    settings: {main: null, width: '512px', height: '512px'},
  });

  const main =
    shader &&
    shader({
      frag: `
  precision highp float;
  uniform sampler2D fbo;
  varying vec2 uv;
  void main () {
    gl_FragColor = texture2D(fbo, uv);
    // gl_FragColor = vec4(1, 0, 1, 1);
  }`,

      vert: `
  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
  }`,

      attributes: {
        position: [-4, -4, 4, -4, 0, 4],
      },
      uniforms: {
        fbo: (context, props) => props.fbo,
      },

      count: 3,
    });

  useEffect(() => dispatch({type: 'SET_SHADER', value: shader}), [shader]);

  useEffect(() => {
    try {
        state.shader.clear({
          color: [0, 0, 0, 255],
          framebuffer: state.layers[state.settings.main].fbo,
          depth: 1,
        });
      state.layers.map(({render, frag, values, fbo}) => {
        render({frag, values, fbo})
      });
      main({fbo: state.layers[state.settings.main].fbo});
    } catch (e) {}
  }, [state.layers, main, state.settings]);

  return (
    <LayersContext.Provider value={{state, dispatch}}>
      {children}
    </LayersContext.Provider>
  );
};
