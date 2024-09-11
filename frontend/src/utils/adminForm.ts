import { supabase } from "./supabaseClient";

interface SelectOption {
  label: string;
  value: string;
}

export const uploadImage = async (file: File, name: string) => {
  if (!(file instanceof File)) return "";

  const { error } = await supabase.storage.from("hp.foods").upload(name, file, {
    upsert: true,
  });

  if (error) throw error;
  const { data } = await supabase.storage.from("hp.foods").getPublicUrl(name);

  return data.publicUrl ? data.publicUrl : "";
};

export const mapSelectData = (apiData: string[]): SelectOption[] => {
  return apiData.map((item: string) => ({ value: item, label: item }));
};

export function formatDateToDDMMYYYY(isoDate: string) {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[monthIndex];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${year} ${hours}:${minutes}`;
}
