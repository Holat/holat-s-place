import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemCreateType } from "../../types/types";
r;
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (file) => {
  if (!file) return;

  const { data, error } = await supabase.storage
    .from("hp.foods") // replace with your bucket name
    .upload(`${file.name}`, file);

  if (error) {
    toast.error("Error uploading image:");
    return;
  }

  toast.log("Image uploaded successfully:", data);
};

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    await uploadImage(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;

const AdminPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ItemCreateType>();

  return <div>AdminPage</div>;
};

const ItemForm = () => {
  return <div></div>;
};

export default AdminPage;
// npm install @supabase/supabase-js
