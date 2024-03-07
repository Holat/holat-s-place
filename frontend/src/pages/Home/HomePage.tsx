import "./homepage.scss";
import {
  getAll,
  getAllByTag,
  search,
  getAllTags,
} from "../../services/foodService";
import { useEffect, useReducer, useState } from "react";
import { FoodType, IAction } from "../../types/types";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useParams } from "react-router-dom";
import { NotFound, OrderBar, SearchBar } from "../../components";

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
  const [isOpen, setIsOpen] = useState(false);

  const { searchTerm, tag } = useParams();

  const toggleOrderBar = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="homeCont">
      <SearchBar tags={tags} toggleOrderBar={toggleOrderBar} />
      <OrderBar isOpen={isOpen} toggleOrderBar={toggleOrderBar} />
      {!foodItems || foodItems.length === 0 ? (
        <NotFound title="Food Not Found" showBtn />
      ) : (
        <div className="foodItems">
          {foodItems.map((item) => (
            <FoodItem key={item.id} food={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
