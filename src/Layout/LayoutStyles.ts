import styled from "styled-components";
import BackgroundImage from "../assets/background.jpg";

export const Header = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  height: 72px;
  background: linear-gradient(
    90deg,
    rgba(81, 84, 78, 1) 0%,
    rgba(170, 176, 164, 1) 25%,
    rgba(202, 209, 195, 1) 55%,
    rgba(141, 146, 136, 1) 100%
  );
  & > a {
    font-size: 36px;
    font-weight: 900;
    text-decoration: none;
    color: black;
  }
`;
export const Content = styled.div`
  display: flex;
  height: calc(100vh - 72px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    width: 100%;
    height: 100%;
    background-image: url(${BackgroundImage});
    background-size: cover;
    z-index: -1;
  }
`;
