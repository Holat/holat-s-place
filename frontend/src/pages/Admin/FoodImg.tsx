import React, { useRef } from "react";

const FoodImg = ({ register }) => {
  const hiddenInputRef = useRef();
  const [preview, setPreview] = useState();
  const { ref: registerRef, ...rest } = register("profilePicture");

  const handleUploadedFile = (event: React.FormEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
  };

  const onUpload = () => {
    hiddenInputRef.current.click();
  };

  const uploadButtonLabel = preview ? "Change image" : "Upload image";

  return (
    <div>
      <label>Profile picture</label>

      <input
        type="file"
        name="foodImg"
        // className="hidden"
        {...rest}
        onChange={handleUploadedFile}
        ref={(e: React.FormEvent<HTMLInputElement>) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
        accept="image/*"
        multiple="false"
      />
      <img src={preview ? preview : ""} alt="Item Image" />
      <button variant="text" onClick={onUpload}>
        {uploadButtonLabel}
      </button>
    </div>
  );
};

export default FoodImg;

// const [file, setFile] = useState<File | null>();
// const [img, setImg] = useState(null);
//  {
//    img ? (
//      <img src={img} alt="Item Image" />
//    ) : (
//      <input
//        type="file"
//        onChange={handleChange}
//        accept="image/*"
//        multiple="false"
//      />
//    );
//  }
//  <div>
//    <input
//      type="text"
//      {...register("name", {
//        required: true,
//      })}
//    />
//    {errors.name && <div className="error">This field is required</div>}
