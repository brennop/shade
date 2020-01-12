import React from 'react';
import Number from './Number';
import Texture from './Texture';
import {UniformWrapper as Wrapper, UniformName as Name} from '../styles';

const Selector = props => {
  switch (props.type) {
    case 'float':
    case 'int':
      return <Number {...props} />;
    case 'sampler2D':
      return <Texture {...props} />;
    default:
      return null;
  }
};

export const Uniform = props => (
  <Wrapper>
    <Name>{props.name.replace(/([A-Z])/g, ' $1').replace(/([-_])/g, ' ')}</Name>
    <Selector {...props} />
  </Wrapper>
);
