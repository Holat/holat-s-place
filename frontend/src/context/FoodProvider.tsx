import { createContext, useEffect, useReducer } from "react"
import {  FoodType, IAction, FoodContextType } from "../types/types";
import { getAllTags, getAll } from "../services/foodService";
import { getCountries } from "../services/adminServices";

const FOODS_LOADED = "FOODS_LOADED";
const TAGS_LOADED = "TAGS_LOADED";
const ORIGINS_LOADED = "ORIGINS_LOADED";
const initialState = {
    foods: [],
    tags: [],
    origins: [],
};
export const FoodContext = createContext<FoodContextType | null>(null);

const reducer = (state: FoodType, action: IAction) => {
    switch (action.type) {
        case FOODS_LOADED:
            return { ...state, foods: action.payload };
        case TAGS_LOADED:
            return { ...state, tags: action.payload };
        case ORIGINS_LOADED:
            return {...state, origins: action.payload};
        default:
            return state;
    }
  };

const FoodProvider = ({ children }: {children: React.ReactNode}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, tags, origins } = state;


    useEffect(() => {
        getAllTags().then((tags) => dispatch({ type: TAGS_LOADED, payload: tags }));
        getAll().then((foodItems) =>
          dispatch({ type: FOODS_LOADED, payload: foodItems })
        );
        getCountries().then((origins) => dispatch({ type: ORIGINS_LOADED, payload: origins}));
      }, []);

  return (
    <FoodContext.Provider value={{foods, tags, origins}}>
        {children}
    </FoodContext.Provider>
  )
}

export default FoodProvider