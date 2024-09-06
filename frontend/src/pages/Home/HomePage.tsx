import "./homepage.scss";
import { getAllByTag, search } from "../../services/foodService";
import { useEffect, useState } from "react";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useParams } from "react-router-dom";
import { NotFound, OrderBar, SearchBar } from "../../components";
import useFood from "../../hooks/useFood";


function HomePage() {
  const { foods: foodItems, tags } = useFood();
  const [filteredFood, setFilteredFood ] = useState(foodItems);
  const [isOpen, setIsOpen] = useState(false);
  const { searchTerm, tag } = useParams();

  const toggleOrderBar = () => setIsOpen(!isOpen);
  useEffect(() => {
    setFilteredFood(foodItems);
  },[foodItems])

  useEffect(() => {
    if (tag) getAllByTag(tag).then(setFilteredFood);
    else if(searchTerm) search(searchTerm).then(setFilteredFood);
    else setFilteredFood(foodItems);
  }, [tag, searchTerm]);

  return (
    <div className="homeCont">
      <SearchBar tags={tags} toggleOrderBar={toggleOrderBar} />
      <OrderBar isOpen={isOpen} toggleOrderBar={toggleOrderBar} />
      {!filteredFood || filteredFood.length === 0 ? (
        <NotFound title="Food Not Found" showBtn />
      ) : (
        <div className="foodItems">
          {filteredFood.map((item) => (
            <FoodItem key={item.id} food={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
