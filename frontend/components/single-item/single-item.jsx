import React, { Component } from "react";
import Head from "next/head";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ErrorMessage from "../ErrorMessage";
import { SingleItemStyles } from "./single-item.styles";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => {
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: id }}>
      {({ error, loading, data }) => {
        console.log(data);
        if (error) return <ErrorMessage error={error} />;
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for id:{id}</p>;
        const { item } = data;
        return (
          <SingleItemStyles>
            <Head>
              <title>Sick Sticks | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
              <h2>Viewing {item.title}</h2>
              <div>{item.description}</div>
            </div>
          </SingleItemStyles>
        );
      }}
    </Query>
  );
};

export default SingleItem;
