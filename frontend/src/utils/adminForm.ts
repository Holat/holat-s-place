import { toast } from "react-toastify";
import { supabase } from "./supabaseClient";

interface SelectOption {
  label: string;
  value: string;
}

export const uploadImage = async (file: File) => {
  if (!(file instanceof File)) return "";
  const filename = file.name;

  const { error } = await supabase.storage
    .from("hp.foods")
    .upload(filename, file, {
      upsert: true,
    });

  if (error) {
    console.log(error);
    toast.error("Error uploading image!");
    return "";
  }

  const { data } = await supabase.storage
    .from("hp.foods")
    .getPublicUrl(filename);

  toast.success("Image uploaded successfully");
  return data.publicUrl ? data.publicUrl : "";
};

export const mapSelectData = (apiData: string[]): SelectOption[] => {
  return apiData.map((item: string) => ({ value: item, label: item }));
};
