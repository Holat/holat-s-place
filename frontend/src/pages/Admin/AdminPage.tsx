import "./adminPage.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemCreateType } from "../../types/types";
import { createItem } from "../../services/adminServices";
import { createClient } from "@supabase/supabase-js";
import { getAllTags } from "../../services/foodService";
import Select from "react-select";

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (file: File) => {
  if (!file) return;
  const filename = file.name;

  const { error } = await supabase.storage
    .from("hp.foods")
    .upload(`${filename}`, file);

  if (error) {
    toast.error("Error uploading image!");
    return;
  }

  const { data } = await supabase.storage
    .from("hp.foods")
    .getPublicUrl(filename);

  toast.log("Image uploaded successfully:", data);
  return data.publicUrl;
};

const ItemForm = () => {
  const [file, setFile] = useState<File | null>();
  const [img, setImg] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ItemCreateType>();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const submit = async (data: ItemCreateType) => {
    let imageUrl = "";
    if (!file) {
      toast.error("Food Image is Required");
      return;
    }

    if (file.size > 5242880) {
      toast.error("Image size should not be more than 5MB");
      return;
    }

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
        {img ? (
          <img src={img} alt="Item Image" />
        ) : (
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            multiple="false"
          />
        )}
        <div>
          <input
            type="text"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && <div className="error">This field is required</div>}
        </div>
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
              options={options}
              isLoading={isLoading}
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
              options={options}
              isLoading={isLoading}
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
