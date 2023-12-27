import "./homepage.scss";
import {
  getAll,
  getAllByTag,
  search,
  getAllTags,
} from "../../services/foodService";
import { useEffect, useReducer } from "react";
import { FoodType, IAction } from "../../types/types";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useParams } from "react-router-dom";
import { NotFound, SearchBar } from "../../components";

const FOODS_LOADED = "FOODS_LOADED";
const TAGS_LOADED = "TAGS_LOADED";
const initialState: FoodType = {
  foods: [],
  tags: [],
};

const reducer = (state: FoodType, action: IAction) => {
  switch (action.type) {
    case FOODS_LOADED:
      return { ...state, foods: action.payload };
    case TAGS_LOADED:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods: foodItems, tags } = state;

  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) => dispatch({ type: TAGS_LOADED, payload: tags }));

    const loadedFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadedFoods.then((foodItems) =>
      dispatch({ type: FOODS_LOADED, payload: foodItems })
    );
  }, [tag, searchTerm]);

  return (
    <div className="homeContainer">
      <SearchBar tags={tags} />

      {!foodItems || foodItems.length === 0 ? (
        <NotFound title="Food Not Found" />
      ) : (
        <div className="foodItems">
          {foodItems.map((item) => (
            <FoodItem
              key={item.id}
              favorite={item.favorite}
              name={item.name}
              stars={item.stars}
              price={item.price}
              imageUrl={`/foods/${item.imageUrl}`}
              id={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
