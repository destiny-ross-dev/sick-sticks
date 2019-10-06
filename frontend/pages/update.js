import Link from "next/link";
import UpdateItem from "../components/update-item/update-item";

const Update = ({ query }) => {
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
};

export default Update;
