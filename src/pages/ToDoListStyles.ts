import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
export const ToDoListBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5e8e1;
  border-radius: 0.5rem;
  width: 100%;
  overflow: hidden;
  max-width: 1000px;
  box-shadow: rgba(0, 0, 0, 0.54) 0px 3px 50px;
  @media (max-width: 700px) {
    max-height: 85%;
  }
`;
export const ListGroup = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    overflow: auto;
  }
`;
export const ToDoListHeader = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  align-items: center;
  background-color: #cad1c3;
  justify-content: space-between;

  & > span {
    font-size: 24px;
    font-weight: 700;
  }
`;
