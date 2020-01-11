import React from 'react';
import Number from './Number';
import {UniformWrapper as Wrapper, UniformName as Name} from '../styles';

const Selector = props => {
  switch (props.type) {
    case 'float':
    case 'int':
      return <Number {...props} />;
    default:
      return null;
  }
};

export const Uniform = props => (
  <Wrapper>
    <Name>
      {props.name}
    </Name>
    <Selector {...props} />
  </Wrapper>
)
