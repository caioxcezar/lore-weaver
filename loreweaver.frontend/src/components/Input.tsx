import Skeleton from "react-loading-skeleton";
import Label from "./label";

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
}

const Input = ({
  value,
  label,
  placeholder,
  required,
  loading,
  onChange,
  maxLength,
  type = "text",
}: Props) => {
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
          onChange={({ target: { value } }) => onChange(value)}
        />
      )}
    </div>
  );
};

export default Input;
