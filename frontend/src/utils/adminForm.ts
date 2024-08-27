import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

const supabase = createClient(supabaseUrl, supabaseKey);
export const uploadImage = async (file: File) => {
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

export const mapSelectData = (apiData: string[]) => {
  const data = [{ value: "", label: "" }];
  if (apiData) data = apiData.map((item) => ({ value: item, label: item }));
  else return null;

  return data;
};
