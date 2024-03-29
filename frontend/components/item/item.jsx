import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import Title from "../styles/Title";
import { ItemContainer, PriceTag } from "./item.styles";
import formatMoney from "../../lib/formatMoney";
import DeleteItem from "../delete-item/delete-item";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <ItemContainer>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: item.id }
            }}
          >
            <a>Edit</a>
          </Link>
          <button>Add To Cart</button>
          <DeleteItem id={item.id}>Delete Item</DeleteItem>
        </div>
      </ItemContainer>
    );
  }
}
