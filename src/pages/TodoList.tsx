import { useState, useEffect, useMemo } from "react";
import { useApiHandler } from "../hooks/useApiHandler";
import getTODOItems from "../api/getTODOItems";
import AddIcon from "../assets/add.png";
import { ToDoModal } from "../components/ToDoModal/ToDoModal";
import { Icon } from "../styled/Icon";
import { ToDoListTemplate } from "../components/ToDoListTemplate/ToDoListTemplate";
import {
  Background,
  ListGroup,
  ToDoListBackground,
  ToDoListHeader,
} from "./ToDoListStyles";

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
          <ToDoListTemplate
            data={activeList}
            title="Active"
            updateList={getItems}
          />
          <ToDoListTemplate
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
