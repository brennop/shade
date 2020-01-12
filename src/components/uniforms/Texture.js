import React, {useState, useEffect, useContext} from 'react';
import {LayersContext} from '../../context/Layers';
import styled from 'styled-components';
import {FaPlus} from 'react-icons/fa';
import {UniformName as Name} from '../styles';

const Wrapper = styled.div`
  margin-top: 0.4rem;
  display: flex;
`;

const Placeholder = styled.div`
  background-color: #424250;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  font-size: 1.2em;
  color: #212121;

  & svg {
    margin: auto;
  }
`;

const Preview = styled.div`
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  width: 3rem;
  height: 3rem;
`;

const Texture = ({name, type, index}) => {
  const [value, setValue] = useState();
  const [preview, setPreview] = useState();
  const {state, dispatch} = useContext(LayersContext);

  const handleUpload = event => {
    // TODO: add image validation
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.src = reader.result;
      setPreview({src: reader.result, name: file.name});
      image.onload = () => {
        dispatch({
          type: 'CHANGE_VALUE',
          value: state.shader.texture({
            data: image,
            mag: 'linear',
            flipY: true,
          }),
          name,
          index,
        });
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      {preview ? (
        <>
          <Preview src={preview.src} />
          <Name>{preview.name}</Name>
        </>
      ) : (
        <label htmlFor="image">
          <Placeholder>
            <FaPlus />
          </Placeholder>
        </label>
      )}
      <input
        type="file"
        id="image"
        onChange={handleUpload}
        style={{display: 'none'}}
      />
    </Wrapper>
  );
};

export default Texture;
