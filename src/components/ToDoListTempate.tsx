import { useState, useMemo } from "react";
import styled from "styled-components";
import { Icon } from "../styled/Icon";
import DeleteIcon from "../assets/delete.svg";
import DoneIcon from "../assets/done.svg";
import SearchIcon from "../assets/search.png";
import { useApiHandler } from "../hooks/useApiHandler";
import deleteTODOItem from "../api/deleteTODOItem";
import patchTODOItem from "../api/patchTODOItem";
import { Input } from "../styled/Input";

export const ToDoListTempate = (props: {
  data: any[];
  title: string;
  updateList: any;
}) => {
  const [deleteItem] = useApiHandler(deleteTODOItem);
  const [updateItem] = useApiHandler(patchTODOItem);
  const [searchQuery, setSearchQuery] = useState("");

  const dataToShow = useMemo(() => {
    const tempData = [...(props.data || [])];
    tempData?.sort((a, b) => {
      if (new Date(a.deadline) < new Date(b.deadline)) {
        return -1;
      }
      if (new Date(a.deadline) > new Date(b.deadline)) {
        return 1;
      }
      return 0;
    });
    if (searchQuery) {
      return tempData.filter(({ title }: { title: string }) =>
        title.includes(searchQuery)
      );
    } else return tempData;
  }, [searchQuery, props.data]);

  return (
    <ToDoList>
      <div className="searchRow">
        <span>{props.title}</span>
        <Input
          onChange={(e: any) => setSearchQuery(e.target.value)}
          placeholder="Search for title"
          icon={() => <img width={24} height={24} src={SearchIcon} />}
        />
      </div>
      <div className="list">
        {dataToShow.length ? (
          dataToShow.map(
            ({
              id,
              title,
              deadline,
              description,
              completed,
            }: {
              id: number;
              title: string;
              deadline: string;
              description: string;
              completed: boolean;
            }) => (
              <ToDoListRow key={id}>
                <Deadline>
                  <span>Deadline</span>
                  <span>{deadline}</span>
                </Deadline>
                <TitleSection>
                  <span>{title}</span>
                  <span>{description}</span>
                </TitleSection>
                <ActionButtons>
                  {!completed && (
                    <Icon
                      title="finish"
                      src={DoneIcon}
                      onClick={() =>
                        updateItem({
                          params: id,
                          data: { completed: true },
                        }).then((res: any) => res && props.updateList())
                      }
                    />
                  )}
                  <Icon
                    title="delete"
                    src={DeleteIcon}
                    onClick={() =>
                      deleteItem({ params: id }).then(
                        (res: any) => res && props.updateList()
                      )
                    }
                  />
                </ActionButtons>
              </ToDoListRow>
            )
          )
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </ToDoList>
  );
};
const ToDoList = styled.div`
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

const ToDoListRow = styled.div`
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

const Deadline = styled.div`
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

const TitleSection = styled(Deadline)`
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  height: 100%;
  padding: 1rem;
  flex-shrink: 0;
`;
