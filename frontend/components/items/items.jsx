import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Centered, ItemsList } from "./items.styles";
import Item from "../item/item";
import Pagination from "../pagination/pagination";
import { perPage } from "../../config";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first:$first, skip:$skip, orderBy:createdAt_DESC) {
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
        <Pagination page={this.props.page} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
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
        <Pagination page={this.props.page} />
      </Centered>
    );
  }
}

export default Items;
