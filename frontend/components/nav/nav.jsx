import Link from "next/link";
import { NavStyles } from "./nav.styles";
import User from "../user/user";
import SignOut from "../sign-out/sign-out";
const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <NavStyles>
            <Link href="/items">
              <a>Shop</a>
            </Link>
            {me && (
              <>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
                <SignOut />
              </>
            )}
            {!me && (
              <Link href="/signup">
                <a>Signin</a>
              </Link>
            )}
          </NavStyles>
        );
      }}
    </User>
  );
};

export default Nav;
