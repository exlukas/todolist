import { Form } from "formik";
import styled from "styled-components";

export const Modal = styled.dialog`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 0 !important;
  border: none;
  min-width: 30%;
`;

export const MyForm = styled(Form)`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button`
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

export const ModalHeader = styled.div`
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