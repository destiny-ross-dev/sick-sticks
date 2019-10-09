import SingleItem from "../components/single-item/single-item";

const Item = ({ query }) => {
  return (
    <div>
      <SingleItem id={query.id} />
    </div>
  );
};

export default Item;
