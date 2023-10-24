import { useState, useMemo } from "react";
import { Icon } from "../../styled/Icon";
import DeleteIcon from "../../assets/delete.svg";
import DoneIcon from "../../assets/done.svg";
import SearchIcon from "../../assets/search.png";
import { useApiHandler } from "../../hooks/useApiHandler";
import deleteTODOItem from "../../api/deleteTODOItem";
import patchTODOItem from "../../api/patchTODOItem";
import { Input } from "../../styled/Input";
import {
  ActionButtons,
  Deadline,
  TitleSection,
  ToDoList,
  ToDoListRow,
} from "./ToDoListTemplateStyles";

export const ToDoListTemplate = (props: {
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
