import "./foodItem.scss";
import { FoodItemType } from "../../types/types";
import Title from "../Title/Title";
import Price from "../Price/Price";
import StarRating from "../Star/Star";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function FoodItem({ food }: { food: FoodItemType }) {
  const { addToCart } = useCart();

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(food);
  };

  return (
    <Link to={`/food/${food.id}`} className="foodItemLink">
      <div className="itemCont">
        <div className="imgCont">
          <img src={`${food.imageUrl}`} alt={food.name} loading="lazy" />
          <button className="favorite">
            {food.favorite ? (
              <img src="/fav.svg" alt="fav" />
            ) : (
              <img src="/fav.svg" alt="noFav" />
            )}
          </button>
          <button className="favorite" id="add" onClick={handleAddClick}>
            <img src="/icons/add.svg" alt="" />
          </button>
        </div>
        <div className="details">
          <Title title={food.name} fontSize="16px" fontWeight={200} />
          <Price price={food.price} />
        </div>
        <div>
          <StarRating stars={food.stars} size={12} />
        </div>
      </div>
    </Link>
  );
}
