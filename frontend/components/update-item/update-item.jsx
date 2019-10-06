import React, { Component } from "react";
import Router from "next/router";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import { FormContainer } from "./update-item.styles";

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;

    // handles number input type
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("updating item", this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log("updated");
  };

  render() {
    let { title, price, description, file } = this.state;
    let { id } = this.props;
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for ID {id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { error, loading }) => {
                return (
                  <FormContainer onSubmit={e => this.updateItem(e, updateItem)}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          defaultValue={data.item.title}
                          placeholder="Cool Shoes"
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="price">
                        Price
                        <input
                          type="number"
                          id="price"
                          name="price"
                          defaultValue={data.item.price}
                          placeholder="Price"
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <textarea
                          type="text"
                          id="description"
                          name="description"
                          defaultValue={data.item.description}
                          placeholder="Cool Shoes"
                          onChange={this.handleChange}
                        />
                      </label>
                      <button type="submit">Sav{loading ? "ing" : "e"}</button>
                    </fieldset>
                  </FormContainer>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
