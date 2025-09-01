import Skeleton from "react-loading-skeleton";
import Label from "./label";

interface Props {
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  loading?: boolean;
  onchange: (value: string) => void;
}

const Input = ({
  value,
  label,
  placeholder,
  required,
  loading,
  onchange,
}: Props) => {
  return (
    <div>
      <Label
        value={label}
        loading={loading}
        className="block mb-2 text-sm font-medium"
      />
      {loading ? (
        <Skeleton className="p-2.5" />
      ) : (
        <input
          value={value}
          type="text"
          className="focus:outline-none focus:ring-2 bg-(--papyrus-medium) border border-(--papyrus-medium-hover) text-sm rounded-lg focus:ring-(--papyrus-medium-hover) focus:border-(--papyrus-medium-hover) block w-full p-2.5"
          placeholder={placeholder}
          required={required}
          onChange={({ target: { value } }) => onchange(value)}
        />
      )}
    </div>
  );
};

export default Input;
