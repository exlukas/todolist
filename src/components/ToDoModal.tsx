import { useRef, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "../assets/close.svg";
import { Icon } from "../styled/Icon";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useApiHandler } from "../hooks/useApiHandler";
import postTODOItem from "../api/postTODOItem";
import { Input } from "../styled/Input";

const todoValidation = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  deadline: Yup.date().min(new Date()).required("Required"),
});
const formInputs = ["title", "description", "deadline"];

export const ToDoModal = (props: {
  show: boolean;
  onClose: any;
  refetchItems: any;
}) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [postItem] = useApiHandler(postTODOItem);

  useEffect(() => {
    const handler = (event: KeyboardEvent) =>
      event.key === "Escape" && props.onClose();

    document.addEventListener("keydown", handler);
    props.show ? modal.current?.showModal() : modal.current?.close();

    return () => document.removeEventListener("keydown", handler);
  }, [props]);

  return (
    <Modal ref={modal}>
      <ModalHeader>
        <span>New Item</span>
        <Icon
          style={{ float: "inline-end" }}
          title="close"
          onClick={props.onClose}
          src={CloseIcon}
        />
      </ModalHeader>

      <Formik
        initialValues={{ title: "", description: "", deadline: "" }}
        validationSchema={todoValidation}
        onSubmit={async (values, actions) => {
          const success = await postItem({ data: values });
          actions.setSubmitting(false);
          if (success) {
            props.refetchItems();
            props.onClose();
          }
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
        }: {
          errors: any;
          touched: any;
          isSubmitting: boolean;
        }) => (
          <MyForm>
            {formInputs.map((name) => {
              return (
                <Field
                  as={Input}
                  name={name}
                  id={name}
                  key={name}
                  type={name === "deadline" ? "date" : "text"}
                  placeholder={name[0].toUpperCase() + name.slice(1)}
                  divstyle={
                    !!errors[name] && touched[name]
                      ? { borderColor: "red" }
                      : {}
                  }
                  labelstyle={
                    !!errors[name] && touched[name] ? { color: "red" } : {}
                  }
                />
              );
            })}
            <Button disabled={isSubmitting} type="submit">
              Add
            </Button>
          </MyForm>
        )}
      </Formik>
    </Modal>
  );
};

const Modal = styled.dialog`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 0 !important;
  border: none;
  min-width: 30%;
`;

const MyForm = styled(Form)`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: #b6bcb0;
  border-color: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 36px;
  font-weight: 700;
  &:hover {
    background-color: #8d9289;
  }
  &:disabled {
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #b6bcb0;
  & > span {
    font-size: 24px;
    font-weight: 700;
  }
`;
