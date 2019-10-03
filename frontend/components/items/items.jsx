import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Centered, ItemsList } from "./items.styles";
import Item from "../item/item";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

class Items extends Component {
  render() {
    return (
      <Centered>
        <p>Items</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (error) return <p>Error: {error.message}</p>;
            if (loading) return <p>Loading...</p>;
            console.log(data);
            return (
              <ItemsList>
                {data.items.map(item => {
                  return <Item item={item} key={item.id}></Item>;
                })}
              </ItemsList>
            );
          }}
        </Query>
      </Centered>
    );
  }
}

export default Items;
