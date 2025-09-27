import Skeleton from "react-loading-skeleton";
import Label from "./label";

interface Props {
  label: string;
  placeholder?: string;
  required?: boolean;
  loading?: boolean;
  multiple?: boolean;
  onChange: (value: FileList | null) => void;
}

const InputFile = ({
  label,
  placeholder,
  required,
  loading,
  onChange,
  multiple,
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
          multiple={multiple}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="focus:outline-none focus:ring-2 bg-(--papyrus-medium) border border-(--papyrus-medium-hover) text-sm rounded-lg focus:ring-(--papyrus-medium-hover) focus:border-(--papyrus-medium-hover) block w-full p-2.5"
          placeholder={placeholder}
          required={required}
          onChange={({ target: { files } }) => onChange(files)}
        />
      )}
    </div>
  );
};

export default InputFile;
