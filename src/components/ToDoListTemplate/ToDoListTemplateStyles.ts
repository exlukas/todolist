import styled from "styled-components";

export const ToDoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0.5rem;

  & div.list {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0.5rem 1rem;
    height: 380px;
    gap: 0.7rem;
    @media (max-width: 700px) {
      height: initial;
    }
  }
  & div.searchRow {
    display: flex;
    padding: 0.5rem 1rem;
    gap: 0.7rem;
    align-items: center;
    & > span {
      font-size: 18px;
      font-weight: 700;
    }
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const ToDoListRow = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.54) 0px 3px 8px;
  background-color: white;
  border-radius: 0.5rem;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  min-width: 300px;
  height: 80px;
`;

export const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #d98f5a;
  gap: 0.3rem;
  height: 100%;
  justify-content: center;

  & > span:first-child {
    font-weight: 600;
    text-align: center;
  }
`;

export const TitleSection = styled(Deadline)`
  background-color: white;
  flex: 1;
  overflow: hidden;
  & > span:first-child {
    font-weight: 600;
    text-align: initial;
  }
  & span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  height: 100%;
  padding: 1rem;
  flex-shrink: 0;
`;
