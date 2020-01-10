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

export const Button = styled.button`
  border: none;
  background-color: #1c1c1c80;
  color: #e2e2e2;
  padding: 0.4rem;
  outline: none;

  & :hover {
    background-color: #35353580;
  }
`
