import { FieldError } from "react-hook-form";
import React from "react";

export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export interface FormDetails {
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
}

export interface ChangePassFormType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type LoginInputType = {
  label: string;
  type: string;
  defaultValue?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error?: FieldError;
};
