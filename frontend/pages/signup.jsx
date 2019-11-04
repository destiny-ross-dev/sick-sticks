import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../components/styles/Form";
import Signup from "../components/sign-up/sign-up";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => {
  return (
    <Columns>
      <Signup />
      <Signup />
      <Signup />
    </Columns>
  );
};

export default SignupPage;
