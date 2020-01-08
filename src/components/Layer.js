import React from 'react';
import '../styles.css';

const Layer = ({color, close, select}) => (
  <div className="layer">
    <div className="bar" style={{backgroundColor: color}} onClick={select}>
      <button className="btn close" onClick={close}>x</button>
    </div>
  </div>
);

export default Layer;
