// @ts-nocheck
import "./foodForm.scss";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ItemCreateType,
  SelectType,
  TagTypes,
  ModalStateType
} from "../../types/types";
import { createItem } from "../../services/adminServices";
import Select from "react-select";
import { uploadImage } from "../../utils/adminForm";
import FoodImg from "./FoodImg";
import { toast } from "react-toastify";
import getFormError from "../../utils/getFormError";
import { Title } from "../../components";


const ItemForm = ({ closeModal,  apiTags, origins }: { closeModal: () => void, apiTags: TagTypes[], origins: SelectType[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<SelectType[]>()
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ItemCreateType>();

  useEffect(() => {
    const selectTag = apiTags.map((item: TagTypes) => ({
      label: item.name,
      value: item.name,
    }));
    setTags(selectTag);
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

    if (file.size > 5242880) {
      setError("imageUrl", { type: "filesize", message: "filesize" });
      setIsLoading(false);
      return;
    }

    try {
      const fileExt = imageUrl.name.split(".").pop();
      const filename = `${data.name
        .replace(/\s+/g, "")
        .toLowerCase()}.${fileExt}`;

      const res = await uploadImage(imageUrl, filename);
      const imgUrl = res; // Use the returned image URL

      const foodData = { ...data, imageUrl: imgUrl, imgName: filename };
      await createItem(foodData);

      toast.success("Food Uploaded");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image or creating item!");
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="modal form-container">
      <div className="header">
        <Title title="Create Item" fontSize="24px" fontWeight={600} />
        <button onClick={closeModal}>
          <img src="/icons/close.svg" alt="close" />
        </button>
      </div>
      <div className="formCont">
        <form onSubmit={handleSubmit(submit)} className="form">
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
                  <div className="error">{getFormError(errors.tags[0])}</div>
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
            render={({ field: { onChange, onBlur, value: formV, name, ref } }) => (
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
                  value={formV}
                  name={name}
                  ref={ref}
                  placeholder="Origin"
                />
                {errors.origins && (
                  <div className="error">{getFormError(errors.origins[0])}</div>
                )}
              </div>
            )}
          />

          <div className="inputCont">
            <textarea
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
    </div>
  );
};

export default ItemForm;
