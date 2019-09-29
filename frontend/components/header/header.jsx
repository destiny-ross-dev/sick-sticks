import Nav from "../nav/nav";
import Router from "next/router";
import Link from "next/link";
import NProgress from "nprogress";
import { Logo, StyledHeader } from "./header.styles";

Router.onRouteChangeStart = () => {
  console.log("onroutechangestart triggered");
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  console.log("onroutechangecomplete triggered");
  NProgress.done();
};
Router.onRouteChangeError = () => {
  console.log("onroutechangeerror triggered");
  NProgress.done();
};

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Sick Sticks</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </StyledHeader>
  );
};

export default Header;
