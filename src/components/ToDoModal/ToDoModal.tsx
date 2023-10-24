import { useRef, useEffect } from "react";
import CloseIcon from "../../assets/close.svg";
import { Icon } from "../../styled/Icon";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useApiHandler } from "../../hooks/useApiHandler";
import postTODOItem from "../../api/postTODOItem";
import { Input } from "../../styled/Input";
import { Button, Modal, ModalHeader, MyForm } from "./ToDoModalStyles";

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
