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

  if (error) throw error;
  const { data } = await supabase.storage
    .from("hp.foods")
    .getPublicUrl(filename);

  return data.publicUrl ? data.publicUrl : "";
};

export const mapSelectData = (apiData: string[]): SelectOption[] => {
  return apiData.map((item: string) => ({ value: item, label: item }));
};
