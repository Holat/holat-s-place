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

  return (
    <div>
      <label>Add an image</label>
      <div className="image-input">
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
        {preview ? (
          <img src={preview} alt="Item Image" className="preview" />
        ) : (
          <button variant="text" onClick={onUpload}>
            <img src="../../../public/icons/addImg.svg" alt="Add image" />
          </button>
        )}
      </div>
      {preview && (
        <button style="background-color:#fa6400;border:none;border-radius:4px;padding: 4px">
          Change Image
        </button>
      )}
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
