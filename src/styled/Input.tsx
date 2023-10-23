import styled from "styled-components";

export const Input = ({ icon, ...props }: any) => {
  return (
    <InputHolder key={props.key} style={props.divstyle}>
      {icon && icon()}
      <TodoInput {...props} placeholder="" className={icon ? "withIcon" : ""} />
      <InputLabel htmlFor={props.id} style={props.labelstyle}>
        {props.placeholder}
      </InputLabel>
    </InputHolder>
  );
};

const InputHolder = styled.div`
  display: flex;
  position: relative;
  border-radius: 0.5rem;
  border: solid black 1px;
  height: 36px;

  & > img {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 6px;
    pointer-events: none;
  }
  & > input.withIcon {
    padding-right: 2rem !important;
  }
`;
const InputLabel = styled.label`
  position: absolute;
  padding: 0 0.5rem;
  pointer-events: none;
  top: 50%;
  transform: translate(0, -50%);
  transition-duration: 200ms;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 2rem);
`;

const TodoInput = styled.input`
  width: 100%;
  padding: 0 0.5rem;
  padding-top: 12px;
  padding-bottom: 0.2rem;
  border-color: transparent;
  border-radius: 0.5rem;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    transform: translate(0, 0);
    font-size: 12px;
  }
`;
