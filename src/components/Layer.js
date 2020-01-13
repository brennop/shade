import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "./styles";
import { LayersContext } from "../context/Layers";
import { Uniform } from "./uniforms";
import { IoIosCloseCircle as Close } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  margin-top: 0.8rem;
  min-height: 2.4rem;
  background-color: #34343c;
`;

const Bar = styled.div`
  background: #31e2bf;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.span`
  cursor: default;
  color: #363636;
  margin: 0 0.4rem;
  font-size: 0.8em;
  font-weight: 600;
`;

const Layer = ({ index }) => {
  const { state, dispatch } = useContext(LayersContext);

  const handleClose = event => {
    event.stopPropagation();
    dispatch({ type: "REMOVE_LAYER", index });
  };

  return (
    <Container>
      <Bar onClick={() => dispatch({ type: "CHANGE_CURRENT", value: index })}>
        <Name>{state.layers[index].name}</Name>
        <Button onClick={handleClose}>
          <Close />
        </Button>
      </Bar>
      {state.layers[index].uniforms.map(({ name, type }) => (
        <Uniform name={name} type={type} index={index} />
      ))}
    </Container>
  );
};
export default Layer;
