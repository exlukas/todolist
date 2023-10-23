import styled from "styled-components";

export const Icon = (props: React.AllHTMLAttributes<HTMLElement>) => {
  return <MyIcon tabIndex={0} width={24} height={24} {...props} />;
};

const MyIcon = styled.img`
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    transform: scale(1.2);
  }
`;
