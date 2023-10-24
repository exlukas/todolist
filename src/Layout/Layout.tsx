import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { Header, Content } from "./LayoutStyles.js";

export const Layout = () => {
  return (
    <>
      <Header>
        <Link to="/">TODO LIST</Link>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
};
