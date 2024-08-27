import "./adminPage.scss";
import React, { useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { ItemCreateType } from "../../types/types";
import { createItem, getCountries } from "../../services/adminServices";
import { getAllTags } from "../../services/foodService";
import Select from "react-select";
import { mapSelectData, uploadImage } from "../../utils/adminForm";
import FoodImg from "./FoodImg";

const ORIGINS_LOADED = "ORIGINS_LOADED";
const TAGS_LOADED = "TAGS_LOADED";
const initialState = {
  tags: [],
  origins: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case TAGS_LOADED:
      return { ...state, tags: action.payload };
    case ORIGINS_LOADED:
      return { ...state, origins: action.payload };
    default:
      return state;
  }
};

const ItemForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { origins, tags } = state;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ItemCreateType>();

  useEffect(() => {
    getCountries().then((item) =>
      dispatch({ type: ORIGIN_LOADED, payload: item })
    );

    getAllTags().then((item) => dispatch({ type: TAGS_LOADED, payload: item }));
  }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const submit = async (data: ItemCreateType) => {
    const { imageUrl } = data;
    const file = imageUrl[0];

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

    console.log(data);
    return;

    uploadImage()
      .then((res) => {
        imageUrl = res;
      })
      .catch(() => {
        toast.error("Error uploading image!");
        return;
      });

    const foodData = { ...data, imageUrl };
    try {
      const success = await createItem(foodData);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(submit)}>
        <FormImg register={register} />
        <div>
          <input
            type="number"
            {...register("price", {
              required: true,
            })}
          />
          {errors.price && <div className="error">This field is required</div>}
        </div>
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Select
              options={mapSelectData(tags)}
              // isLoading={isLoading}
              onChange={onChange}
              isMulti={true}
              onBlur={onBlur}
              value={value}
              name={name}
              ref={ref}
            />
          )}
        />
        ;
        <div>
          <input
            type="number"
            {...register("cookTime", {
              required: true,
            })}
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
              options={mapSelectData(origins)}
              // isLoading={isLoading}
              onChange={onChange}
              isMulti={true}
              onBlur={onBlur}
              value={value}
              name={name}
              ref={ref}
            />
          )}
        />
        ;
        <div>
          <input
            type="text"
            {...register("desc", {
              required: true,
            })}
          />
          {errors.desc && <div className="error">This field is required</div>}
        </div>
        <input type="submit" value={"Upload"} />
      </form>
    </div>
  );
};

const AdminPage = () => {
  return <div className="adminPage">AdminPage</div>;
};
export default AdminPage;

// npm install @supabase/supabase-js
// react-select
