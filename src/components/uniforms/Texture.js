import React, {useState, useEffect, useContext, useRef} from 'react';
import {LayersContext} from '../../context/Layers';
import styled from 'styled-components';
import {FaPlus} from 'react-icons/fa';
import {UniformName as Name} from '../styles';
import {useDrop} from 'react-dnd';
import {NativeTypes} from 'react-dnd-html5-backend';
import Jimp from 'jimp';

const Wrapper = styled.div`
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
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

const Preview = styled.canvas`
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  width: 3rem;
  height: 3rem;
`;

const Texture = ({name, type, index}) => {
  const canvas = useRef(null);
  const [preview, setPreview] = useState();
  const {state, dispatch} = useContext(LayersContext);
  const [, drop] = useDrop({
    accept: ['layer', NativeTypes.FILE],
    drop: item => onDrop(item),
    collect: mon => ({
      isOver: mon.isOver(),
      item: mon.getItem(),
    }),
  });

  const handleUpload = file => {
    // TODO: add image validation
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

  const onDrop = item => {
    if (item.type === 'layer') {
      dispatch({type: 'CHANGE_VALUE', value: item.fbo, name, index});
      new Jimp(512, 512, (err,image) => {
        image.bitmap.data = state.shader.read({framebuffer: item.fbo})
        image.getBase64('image/png', (err, str) => setPreview({ src: str, name: item.name }))
      })
    } else {
      handleUpload(item.files[0])
    };
  };

  return (
    <Wrapper ref={drop}>
      {preview ? (
        <>
          <Preview src={preview.src} ref={canvas} />
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
        onChange={ev => handleUpload(ev.target.files[0])}
        style={{display: 'none'}}
      />
    </Wrapper>
  );
};

export default Texture;
