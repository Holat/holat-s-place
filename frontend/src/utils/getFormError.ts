import { FieldError } from "react-hook-form";

export default function getFormError(error: FieldError) {
  if (!error.type) return "Check this field for Errors";

  switch (error.type) {
    case "required":
      return "This Field is Required";
    case "":
    case "maxLength":
      return "More than expected value";
    case "filetype":
      return "Only images are valid.";
    case "filesize":
      return "Image size should not be more than 5MB.";
    case "min":
    case "minLength":
      return "Field Is Too Short";
    default:
      return error.message;
  }
}
