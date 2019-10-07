import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "../items/items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = props => {
  const update = (cache, payload) => {
    //manually update cache
    //read cache for items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    //filter deleted item out of page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id: props.id }}
      update={update}
    >
      {(deleteItem, { error }) => (
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this item?")) {
              deleteItem();
            }
          }}
        >
          {props.children}
        </button>
      )}
    </Mutation>
  );
};
export default DeleteItem;
