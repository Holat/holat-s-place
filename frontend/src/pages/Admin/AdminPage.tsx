// @ts-nocheck
import "./adminPage.scss";
import "./foodForm.scss";
import { useReducer, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ItemCreateType,
  IAAction,
  AdminD,
  SelectType,
  TagTypes,
} from "../../types/types";
import { createItem, getCountries } from "../../services/adminServices";
import { getAllTags } from "../../services/foodService";
import Select, { GroupBase, OnChangeValue } from "react-select";
import { uploadImage } from "../../utils/adminForm";
import FoodImg from "./FoodImg";
import { toast } from "react-toastify";

const ORIGINS_LOADED = "ORIGINS_LOADED";
const TAGS_LOADED = "TAGS_LOADED";
const initialState: AdminD = {
  tags: [],
  origins: [],
};

const reducer = (state: AdminD, action: IAAction) => {
  switch (action.type) {
    case TAGS_LOADED:
      return { ...state, tags: action.payload };
    case ORIGINS_LOADED:
      return { ...state, origins: action.payload };
    default:
      return state;
  }
};

const defaultValues = {
  name: "",
  price: 0.0,
  tags: [],
  imageUrl: "",
  origins: [],
  cookTime: 1,
  desc: "",
};
const ItemForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { origins, tags } = state;
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ItemCreateType>({ defaultValues });

  useEffect(() => {
    getCountries().then((item) =>
      dispatch({ type: ORIGINS_LOADED, payload: item })
    );

    getAllTags().then((items) => {
      const data = items.map((item: TagTypes) => ({
        label: item.name,
        value: item.name,
      }));
      dispatch({ type: TAGS_LOADED, payload: data });
    });
  }, []);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const submit = async (data: ItemCreateType) => {
    console.log(data);
    const { imageUrl } = data;
    if (!(imageUrl instanceof File)) return;
    const file = imageUrl;
    let imgUrl = "";

    if (file.type != "image/*") {
      setError("imageUrl", {
        type: "filetype",
        message: "Only images are valid.",
      });
      return;
    }
    if (file.size > 5242880) {
      setError("imageUrl", {
        type: "filesize",
        message: "Image size should not be more than 5MB.",
      });
      return;
    }

    // uploadImage(imageUrl)
    //   .then((res) => {
    //     imgUrl = res;
    //   })
    //   .catch(() => {
    //     toast.error("Error uploading image!");
    //     return;
    //   });

    // const foodData = { ...data, imageUrl: imgUrl };
    // try {
    //   const success = await createItem(foodData);
    //   toast.success(success);
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="form-container">
        <FoodImg register={register} setValue={setValue} />
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: true,
            })}
            className="text-input"
          />
          {errors.name && <div className="error">This field is required</div>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              min: 1,
            })}
            className="text-input"
          />
          {errors.price && <div className="error">This field is required</div>}
        </div>
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Select
              options={tags}
              // isLoading={isLoading}
              className="select-input"
              classNamePrefix="react-select"
              onChange={onChange}
              isMulti={true}
              onBlur={onBlur}
              value={value}
              name={name}
              ref={ref}
              placeholder="Tags"
            />
          )}
        />
        <div>
          <input
            type="number"
            placeholder="Cook Time"
            {...register("cookTime", {
              required: true,
              valueAsNumber: true,
              min: 1,
            })}
            className="text-input"
          />
          {errors.cookTime && (
            <div className="error">This field is required</div>
          )}
        </div>
        <Controller
          control={control}
          name="origins"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Select
              options={origins}
              // isLoading={isLoading}
              // isOptionDisabled={() => selectedOptions.length >= 3}
              className="select-input"
              classNamePrefix="react-select"
              isSearchable={true}
              onChange={onChange}
              isMulti={true}
              onBlur={onBlur}
              value={value}
              name={name}
              ref={ref}
              placeholder="Origin"
            />
          )}
        />
        <div>
          <input
            type="text"
            placeholder="Description"
            {...register("desc", {
              required: true,
            })}
            className="text-input description-input"
          />
          {errors.desc && <div className="error">This field is required</div>}
        </div>
        <input className="form-submit-button" type="submit" value={"Upload"} />
      </form>
    </div>
  );
};

const AdminPage = () => {
  return (
    <div className="adminPage">
      <ItemForm />
    </div>
  );
};
export default AdminPage;

// npm install @supabase/supabase-js
// react-select
