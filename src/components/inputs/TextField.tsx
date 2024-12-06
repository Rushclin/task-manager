import React from "react";
import {
  type FieldValues,
  type FieldPath,
  type FieldError,
  type Control,
  Controller,
  type UseFormReturn,
} from "react-hook-form";

type TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  formState: UseFormReturn<TFieldValues>["formState"];
  label?: string;
  helperText?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "search";
  type?: React.HTMLInputTypeAttribute | undefined;
  pattern?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  required?: boolean;
};

export function TextField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  formState,
  control,
  name,
  label,
  helperText,
  inputMode,
  pattern,
  className,
  disabled,
  readOnly,
  placeholder,
  required,
  type,
}: React.PropsWithChildren<TextFieldProps<TFieldValues, TName>>) {
  const { [name]: fieldError } = formState.errors;
  const error = fieldError as FieldError;
  const isError = Boolean(error);
  if (isError) helperText = error?.message ?? "Invalid";

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            inputMode={inputMode}
            pattern={pattern}
            required={required}
            type={type}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 
              ${isError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} 
              ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            `}
          />
        )}
      />
      {helperText && (
        <p className={`text-sm ${isError ? "text-red-500" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
