import { useParams } from "react-router-dom";
import "./foodDetailsPage.scss";
import { useEffect, useState } from "react";
import { FoodItemType } from "../../types/types";
import { getById } from "../../services/foodService";
import { NotFound, Price, StarRating } from "../../components";
import useCart from "../../hooks/useCart";

export default function FoodDetailsPage() {
  const { foodId } = useParams();
  const [food, setFood] = useState<FoodItemType>();
  const { addToCart } = useCart();

  useEffect(() => {
    getById(foodId).then(setFood);
  }, [foodId]);

  const handleAddToCart = () => {
    addToCart(food);
  };

  return (
    <div className="foodDetailsCont">
      {!food ? (
        <NotFound title="Food Item not Found" showBtn />
      ) : (
        <div>
          <div className="imgCont">
            <img src={`${food.imageUrl}`} alt={food.name} loading="lazy" />
            <div className="txt">
              <h1>{food.name}</h1>
            </div>
            <div className="mainImg">
              <img src={`${food.imageUrl}`} alt={food.name} loading="lazy" />
            </div>
          </div>
          <div className="detailsCont">
            <div className="description">
              <div className="title">{food.name}</div>
              <StarRating stars={food.stars} />
              <p>{food.desc}</p>
            </div>
            <div className="details">
              <div className={"tags"}>
                {food.tags &&
                  food.tags.map((tag) => <div key={tag}>{tag}</div>)}
              </div>
              <div className={"origins"}>
                {food.origins?.map((origin) => (
                  <span key={origin}>{origin}</span>
                ))}
              </div>
              <div className={"cook_time"}>
                <span>
                  Time to cook about <strong>{food.cookTime}</strong> minutes
                </span>
              </div>
              <div className="price">
                Price: &nbsp;
                <Price price={food.price} />
              </div>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
