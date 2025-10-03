import Skeleton from "react-loading-skeleton";
import Label from "./label";
import { type KeyboardEvent, type ChangeEvent } from "react";

interface Props {
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  loading?: boolean;
  type?:
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "integer"
    | "float"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  maxLength?: number;
  onChange: (value: string) => void;
  onSubmitEditing?: () => void;
}

const Input = ({
  value,
  label,
  placeholder,
  required,
  loading,
  onChange,
  onSubmitEditing,
  maxLength,
  type = "text",
}: Props) => {
  const onChangeText = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "integer":
        onChange(value.replace(/[^0-9]/g, ""));
        break;
      case "float":
        if (!value || value.match(/^-?\d+\.?\d*$/g)) onChange(value);
        break;
      default:
        onChange(value);
    }
  };

  const onKeyPress = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter" && onSubmitEditing) onSubmitEditing();
  };

  return (
    <div>
      <Label
        value={label}
        loading={loading}
        className="block mb-2 text-sm font-medium"
      />
      {loading ? (
        <Skeleton className="p-3.5" />
      ) : (
        <input
          maxLength={maxLength}
          value={value}
          type={type}
          className="focus:outline-none focus:ring-2 bg-(--papyrus-medium) border border-(--papyrus-medium-hover) text-sm rounded-lg focus:ring-(--papyrus-medium-hover) focus:border-(--papyrus-medium-hover) block w-full p-2.5"
          placeholder={placeholder}
          required={required}
          onChange={onChangeText}
          onKeyUp={onKeyPress}
        />
      )}
    </div>
  );
};

export default Input;
