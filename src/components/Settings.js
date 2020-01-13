import React, { useContext, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { NumberInput, Button } from "./styles";
import { LayersContext } from "../context/Layers";

const styles = {
  content: {
    position: "relative",
    fontFamily: "Open Sans, sans-serif",
    backgroundColor: "#212121",
    border: "none",
    height: "4em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const Input = styled(NumberInput)`
  margin: 0 0.4rem;
  width: 3em;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Dropdown = styled.select`
  width: 100%;
  background-color: #484848;
  margin: 0 0.4rem;
  border: none;
  outline: none;
`;

const Save = styled.div`
  padding: 0.4rem;
  background-color: #1c1c1c;
  color: #6e6e6e;
  font-size: 0.8em;
  cursor: pointer;

  &:hover {
    background-color: #242424;
  }
`;

Modal.setAppElement('#root')

const Settings = ({ isOpen, handleClose }) => {
  const { state, dispatch } = useContext(LayersContext);
  const [width, setWidth] = useState(state.settings.width);
  const [height, setHeight] = useState(state.settings.height);
  const [main, setMain] = useState(state.settings.main);

  const onSave = () => {
    dispatch({ type: "SAVE_SETTINGS", settings: { main, width, height } });
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
    >
      <Row>
        Width:
        <Input value={width} onChange={ev => setWidth(ev.target.value)} />
        Height:
        <Input value={height} onChange={ev => setHeight(ev.target.value)} />
      </Row>
      <Row>
        Main:
        <Dropdown value={main} onChange={ev => setMain(ev.target.value)}>
          {state.layers.map(({ name }, index) => (
            <option value={index} key={name}>
              {name}
            </option>
          ))}
        </Dropdown>
        <Save onClick={onSave}>Save</Save>
      </Row>
    </Modal>
  );
};

export default Settings;
