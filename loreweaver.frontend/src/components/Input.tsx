interface Props {
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  onchange: (value: string) => void;
}

const Input = ({ value, label, placeholder, required, onchange }: Props) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        value={value}
        type="text"
        className="bg-[#f9f5e8] border border-[#f3e9ce] text-gray-900 text-sm rounded-lg focus:ring-[#f3e9ce] focus:border-[#f3e9ce] block w-full p-2.5"
        placeholder={placeholder}
        required={required}
        onChange={({ target: { value } }) => onchange(value)}
      />
    </div>
  );
};

export default Input;
