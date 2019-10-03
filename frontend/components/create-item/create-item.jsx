import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import { FormContainer } from "./create-item.styles";

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Cool Shoes",
    description: "I love these shoes",
    image: "shoes.jpeg",
    largeImage: "bigshoes.jpeg",
    price: 2000
  };

  handleChange = e => {
    const { name, type, value } = e.target;

    // handles number input type
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    let { title, price, description } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { error, loading }) => {
          return (
            <FormContainer onSubmit={this.handleSubmit}>
              <fieldset>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
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
                    value={price}
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
                    value={description}
                    placeholder="Cool Shoes"
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </FormContainer>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateItem;
