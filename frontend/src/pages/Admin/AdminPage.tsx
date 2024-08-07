import "./adminPage.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemCreateType } from "../../types/types";
import { createItem } from "../../services/foodService";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (file: File) => {
  if (!file) {
    toast.error("Food Image is Required");
    return;
  }

  if (file.size > 5242880) {
    toast.error("Image size should not be more than 5MB");
    return;
  }
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
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ItemCreateType>();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async (data: ItemCreateType) => {
    let imageUrl = "";
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

  // tags: string[];
  // origins: string[];

  return (
    <div className="">
      <form onSubmit={handleSubmit(submit)}>
        <input type="file" onChange={handleChange} accept="image/*" />
        <div>
          <input
            type="text"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div>
          <input
            type="number"
            {...register("price", {
              required: true,
            })}
          />
        </div>
        <div>
          <input
            type="number"
            {...register("cookTime", {
              required: true,
            })}
          />
        </div>
        <div>
          <input
            type="number"
            {...register("desc", {
              required: true,
            })}
          />
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
