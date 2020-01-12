import styled from 'styled-components';

export const Layout = styled.div`
  height: 100vh;
  display: flex;
`;

export const Board = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  & div {
    height: 32em;
    width: 32em;
  }
`;

export const Button = styled.div`
  border: none;
  outline: none;
  transition: 0.2s ease-in;
  display: flex;
  color: #1c1c1c80;
  font-size: 1.2em;

  &:hover {
    color: #212121d0;
    transition: 0.2s ease-out;
  }

  & svg {
    margin: auto;
  }
`;

export const UniformWrapper = styled.div`
  background-color: #313139;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding: 0.4rem;
`;

export const UniformName = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #0a0a0a;
  font-size: 0.8em;
  margin: 0;
`
