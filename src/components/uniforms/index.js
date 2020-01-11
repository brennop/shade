import React from 'react';
import Number from './Number';

export const Uniform = props => {
  switch (props.type) {
    case 'float':
    case 'int':
      return <Number {...props} />;
    default:
      return null;
  }
};
