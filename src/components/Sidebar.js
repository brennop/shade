import React from 'react';
import Layer from './Layer';
import '../styles.css';

const Sidebar = ({layers, setLayers, newLayer, setCurrent}) => {
  const handleClose = index => {
    setLayers(l => l.filter((v, i) => i !== index));
    setCurrent(c => --c);
  };
  return (
    <div className="sidebar">
      <button className="btn" onClick={newLayer}>
        +
      </button>
      {layers &&
        layers.map((layer, index) => (
          <Layer
            key={layer.id}
            color={layer.color}
            close={() => handleClose(index)}
            select={() => setCurrent(index)}
          />
        ))}
    </div>
  );
};

export default Sidebar;
