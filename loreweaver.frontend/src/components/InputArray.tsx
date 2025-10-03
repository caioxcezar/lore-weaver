import Skeleton from "react-loading-skeleton";
import Label from "./label";
import { type KeyboardEvent, type ChangeEvent, useState } from "react";

interface Props {
  values: string[];
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
  onChange: (values: string[]) => void;
  onSubmitEditing?: () => void;
}

const InputArray = ({
  values,
  label,
  placeholder,
  required,
  loading,
  onChange,
  onSubmitEditing,
  maxLength,
  type = "text",
}: Props) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const onChangeText = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "integer":
        setValue(value.replace(/[^0-9]/g, ""));
        break;
      case "float":
        if (!value || value.match(/^-?\d+\.?\d*$/g)) setValue(value);
        break;
      default:
        setValue(value);
        break;
    }
  };

  const addValue = () => {
    if (!value.trim()) return;
    onChange([...values, value]);
    setValue("");
  };

  const rmValue = (idx: number) =>
    onChange(values.filter((_, index) => idx !== index));

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
        <div
          className={`block bg-(--papyrus-medium) border border-(--papyrus-medium-hover) text-sm rounded-lg w-full ${
            focused &&
            "outline-none ring-2 ring-(--papyrus-medium-hover) border-(--papyrus-medium-hover)"
          }`}
        >
          <div className="flex">
            <input
              maxLength={maxLength}
              value={value}
              type={type}
              className="w-full focus:outline-none pl-2"
              placeholder={placeholder}
              required={required}
              onChange={onChangeText}
              onKeyUp={onKeyPress}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <div className="border-l px-4 py-2" onClick={addValue}>
              +
            </div>
          </div>
          {values.map((value, idx) => (
            <div key={idx} className="border-t flex">
              <div className="w-full m-2">{value}</div>
              <div
                className="border-l py-2"
                style={{
                  paddingLeft: "calc(var(--spacing) * 4.4)",
                  paddingRight: "calc(var(--spacing) * 4.4)",
                }}
                onClick={() => rmValue(idx)}
              >
                -
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputArray;
