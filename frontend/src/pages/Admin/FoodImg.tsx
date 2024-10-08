import React, { useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ItemCreateType } from "../../types/types";
import { addImgIcon } from "../../assets/icons";

const FoodImg = ({
  register,
  setValue,
  imgPreview,
}: {
  register: UseFormRegister<ItemCreateType>;
  setValue: UseFormSetValue<ItemCreateType>;
  imgPreview?: string | File,
}) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const { ref: registerRef, ...rest } = register("imageUrl");

  useEffect(() => {
    if (typeof imgPreview === 'string'){
      setPreview(imgPreview)
    }
  }, [imgPreview])

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      const urlImage = URL.createObjectURL(file[0]);
      setPreview(urlImage);
      setValue("imageUrl", file[0]);
    }
  };

  const onUpload = () => {
    hiddenInputRef.current?.click();
  };

  return (
    <div className="inputCont imgCont">
      <label>Add an image</label>
      <div className="image-input">
        <input
          type="file"
          {...rest}
          onChange={handleUploadedFile}
          ref={(e) => {
            registerRef(e);
            hiddenInputRef.current = e;
          }}
          accept="image/*"
          multiple={false}
        />
        {preview ? (
          <img src={preview} alt="Item Image" className="preview" />
        ) : (
          <button type="button" className="addBtn" onClick={onUpload}>
            <img src={ addImgIcon } alt="Add image" />
          </button>
        )}
      </div>
      {preview && (
        <button type="button" onClick={onUpload} className="cBtn">
          Change
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
