import "./foodItem.scss";
import { FoodItemProp } from "../../types/types";
import Title from "../Title/Title";
import Price from "../Price/Price";
import StarRating from "../Star/Star";
import { Link } from "react-router-dom";

export default function FoodItem({
  imageUrl,
  name,
  price,
  favorite,
  stars,
  id,
}: FoodItemProp) {
  return (
    <Link to={`/food/${id}`}>
      <div className="itemCont">
        <div className="imgCont">
          <img src={imageUrl} alt={name} loading="lazy" />
          <button className="favorite">
            {favorite ? (
              <img src="/fav.svg" alt="fav" />
            ) : (
              <img src="/fav.svg" alt="nofav" />
            )}
          </button>
        </div>
        <div className="details">
          <Title title={name} fontSize="16px" fontWeight={200} />
          <Price price={price} />
        </div>
        <div>
          <StarRating stars={stars} size={12} />
        </div>
      </div>
    </Link>
  );
}
