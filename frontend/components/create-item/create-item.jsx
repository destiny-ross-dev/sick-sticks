import React, { Component } from "react";
import Router from "next/router";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
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
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;

    // handles number input type
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sicksticks");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcw2q3l9k/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };
  render() {
    let { title, price, description, file } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { error, loading }) => {
          return (
            <FormContainer
              onSubmit={async e => {
                //stops default form submit
                e.preventDefault();
                //call createItem mutation
                const res = await createItem();
                //route to single item page
                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  File
                  <input
                    type="file"
                    id="file"
                    name="file"
                    required
                    placeholder="Upload an image"
                    onChange={this.uploadFile}
                  />
                  {this.state.image && (
                    <img
                      src={this.state.image}
                      alt="Upload Preview"
                      width="200"
                    />
                  )}
                </label>

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
