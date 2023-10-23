import { useState, useEffect, useMemo } from "react";
import { useApiHandler } from "../hooks/useApiHandler";
import getTODOItems from "../api/getTODOItems";
import styled from "styled-components";
import AddIcon from "../assets/add.png";
import { ToDoModal } from "../components/ToDoModal";
import { Icon } from "../styled/Icon";
import { ToDoListTempate } from "../components/ToDoListTempate";

export const TodoList = () => {
  const [getItems, , { data }] = useApiHandler(getTODOItems);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);

  const completedList = useMemo(
    () => data?.filter(({ completed }: { completed: boolean }) => completed),
    [data]
  );
  const activeList = useMemo(
    () => data?.filter(({ completed }: { completed: boolean }) => !completed),
    [data]
  );
  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <Background>
      <ToDoListBackground>
        <ToDoListHeader>
          <span>LIST</span>
          <Icon
            src={AddIcon}
            title="add"
            height={32}
            width={32}
            onClick={() => setShowModal(true)}
          />
        </ToDoListHeader>
        <ListGroup>
          <ToDoListTempate
            data={activeList}
            title="Active"
            updateList={getItems}
          />
          <ToDoListTempate
            data={completedList}
            title="Completed"
            updateList={getItems}
          />
        </ListGroup>
      </ToDoListBackground>
      {showModal && (
        <ToDoModal show={showModal} onClose={onClose} refetchItems={getItems} />
      )}
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const ToDoListBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5e8e1;
  border-radius: 0.5rem;
  width: 100%;
  overflow: hidden;
  max-width: 900px;
  box-shadow: rgba(0, 0, 0, 0.54) 0px 3px 50px;
`;
const ListGroup = styled.div`
  display: flex;
`;
const ToDoListHeader = styled.div`
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
