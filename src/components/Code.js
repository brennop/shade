import React from 'react';
import '../styles.css';

const Code = ({code, changeCode}) => (
  <div>
    <textarea value={code} onChange={changeCode} className="code" />
  </div>
);

export default Code;
