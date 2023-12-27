import "./input.scss";
import React, { ForwardedRef } from "react";
import InputContainer from "./InputContainer";
import { LoginInputType } from "../../types/logTypes";

const Input = React.forwardRef(
  (
    {
      label,
      type,
      defaultValue,
      onChange,
      onBlur,
      name,
      error,
    }: LoginInputType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const getErrorMessage = () => {
      if (!error) return;
      if (error.message) return error.message;

      switch (error.type) {
        case "required":
          return "This Field is Required";
        case "minLength":
          return "Field Is Too Short";
        default:
          return "*";
      }
    };
    return (
      <InputContainer label={label}>
        <input
          id={name}
          defaultValue={defaultValue}
          type={type}
          placeholder={label}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className="input"
        />
        {error && <div className="error">{getErrorMessage()}</div>}
      </InputContainer>
    );
  }
);

export default Input;
