import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemCreateType } from "../../types/types";
r;
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (file: File) => {
  if (!file) return;

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

const ItemForm = () => {
  return <div></div>;
};

const AdminPage = () => {
  return <div>AdminPage</div>;
};
export default AdminPage;
// npm install @supabase/supabase-js

// {
//   "data": {
//     "path": "public/avatar1.png",
//     "fullPath": "avatars/public/avatar1.png"
//   },
//   "error": null
// }

// const { data } = supabase
//   .storage
//   .from('public-bucket')
//   .getPublicUrl('folder/avatar1.png')

// {
//   "data": {
//     "publicUrl": "https://example.supabase.co/storage/v1/object/public/public-bucket/folder/avatar1.png"
//   }
// }
