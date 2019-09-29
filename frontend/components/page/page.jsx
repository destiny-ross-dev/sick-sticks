import React from "react";
import Header from "../header/header";
import Meta from "../meta/meta";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { StyledPage, Inner } from "./page.styles";

const theme = {
  red: "#ff0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightGrey: "#e1e1e1",
  offWhite: "#ededed",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)"
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2')
  format('woff2');
  font-weight:normal;
  font-styled:normal;
}
html {
  box-sizing:border-box;
  font-size:10px;
}
*, *:before, *:after {
  box-sizing:inherit;
}
body {
  padding:0;
  margin:0;
  font-size:1.5rem;
  line-height:2;
  font-family:'radnika_next'
}
a {
  text-decoration:none;
  color: ${theme.black};
}
`;
const Page = props => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{props.children}</Inner>
      </StyledPage>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default Page;
