import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

interface SelectOption {
  label: string;
  value: string;
}

// const supabase = createClient(supabaseUrl, supabaseKey);
const supabase = createClient(
  "https://drmakcnqbxnllugyswjm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybWFrY25xYnhubGx1Z3lzd2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMDQ3NTksImV4cCI6MjAzNjc4MDc1OX0.CPrzfWbfggShXw7-MJpdB1jd1S1cQvQ7jBgVgEvREUg"
);
export const uploadImage = async (file: File) => {
  if (!file) return "";
  const filename = file.name;

  const { error } = await supabase.storage
    .from("hp.foods")
    .upload(`${filename}`, file, {
      upsert: true,
    });

  if (error) {
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
