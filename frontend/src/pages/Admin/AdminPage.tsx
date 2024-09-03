// @ts-nocheck
import "./adminPage.scss";
import "./foodForm.scss";
import { useReducer, useEffect, useState } from "react";
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
import getFormError from "../../utils/getFormError";

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

const ItemForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { origins, tags } = state;
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ItemCreateType>();

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

  const submit = async (data: ItemCreateType) => {
    setIsLoading(true);
    const { imageUrl } = data;
    if (!(imageUrl instanceof File)) {
      setError("imageUrl", { type: "filre", message: "Image Required" });
      setIsLoading(false);
      return;
    }
    const file = imageUrl;

    console.log("r0");
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      setError("imageUrl", { type: "filetype", message: "filetype" });
      setIsLoading(false);
      return;
    }

    console.log("r1");
    if (file.size > 5242880) {
      setError("imageUrl", { type: "filesize", message: "filesize" });
      setIsLoading(false);
      return;
    }

    try {
      const res = await uploadImage(imageUrl);
      const imgUrl = res; // Use the returned image URL

      const foodData = { ...data, imageUrl: imgUrl };
      console.log("r2", foodData);

      const success = await createItem(foodData);
      toast.success(success);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image or creating item!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="form-container">
        <div style={{ alignSelf: "flex-start" }}>
          <FoodImg register={register} setValue={setValue} />
          {errors.imageUrl && (
            <div className="error">{getFormError(errors.imageUrl)}</div>
          )}
        </div>
        <div className="flex-row-cont">
          <div className="inputCont">
            <label>Name</label>
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
          <div className="inputCont">
            <label>Price</label>
            <input
              type="number"
              step={0.01}
              placeholder="₦0.00"
              {...register("price", {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
              className="text-input"
            />
            {errors.price && (
              <div className="error">{getFormError(errors.price)}</div>
            )}
          </div>
        </div>
        <Controller
          control={control}
          name="tags"
          rules={{
            required: true,
            maxLength: 3,
            minLength: 1,
          }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <div className="inputCont">
              <label>Tags</label>
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
              {errors.tags && (
                <div className="error">{getFormError(errors.tags)}</div>
              )}
            </div>
          )}
        />
        <div className="inputCont">
          <label>Cook Time</label>
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
            <div className="error">{getFormError(errors.cookTime)}</div>
          )}
        </div>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="origins"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <div className="inputCont">
              <label>Origins</label>
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
              {errors.origins && (
                <div className="error">{getFormError(errors.origins)}</div>
              )}
            </div>
          )}
        />

        <div className="inputCont">
          <textarea
            type="text"
            placeholder="Description"
            {...register("desc", {
              required: true,
            })}
            className="text-input description-input"
          />
          {errors.desc && (
            <div className="error">{getFormError(errors.desc)}</div>
          )}
        </div>
        <input
          className="form-submit-button"
          type="submit"
          value={isLoading ? "Uploading..." : "Upload"}
          disabled={isLoading}
        />
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
