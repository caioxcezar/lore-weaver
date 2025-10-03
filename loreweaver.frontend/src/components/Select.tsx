import { CSSProperties, useEffect, useRef, useState } from "react";
import Label from "./label";
import { hasNode } from "@/utils/jsx";
import Skeleton from "react-loading-skeleton";

interface Props<T> {
  value: T | null;
  label: string;
  onChange: (value: T) => void;
  values: T[];
  style?: CSSProperties;
  className?: string;
  required?: boolean;
  multiValue?: boolean;
  loading?: boolean;
}

interface ItemProps {
  key: string | number;
  title: string;
}

const Select = <T extends ItemProps>({
  value,
  label,
  onChange,
  values,
  style,
  loading,
}: Props<T>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState("");
  const [focused, isFocused] = useState(false);
  const [position, setPosition] = useState("top");
  const [maxHeight, setMaxHeight] = useState(0);

  const onFocus = () => {
    if (!ref.current) return;
    const divPosition = ref.current.getBoundingClientRect().y;
    const position =
      divPosition < document.body.offsetHeight / 2 ? "botton" : "top";
    setPosition(position);
    if (position === "botton") {
      setMaxHeight(
        document.body.offsetHeight - divPosition - ref.current.offsetHeight
      );
    } else {
      setMaxHeight(divPosition);
    }
    isFocused(true);
  };

  const onBlur = () => {
    isFocused(false);
    setSearch("");
  };

  const onSelect = (value: T) => {
    onChange(value);
    setSearch("");
    isFocused(false);
  };

  useEffect(() => {
    const handleEvent = (ev: PointerEvent) => {
      if (!ref.current) return;
      if (hasNode(ref.current, ev.target as Element)) return;
      onBlur();
    };
    document.addEventListener("click", handleEvent);
    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, []);

  let borderCss = "";
  if (!focused) borderCss += "rounded-lg";
  else if (position === "top") borderCss += "rounded-b-lg";
  else borderCss += "rounded-t-lg";

  const modalCss =
    position === "top" ? "rounded-t-lg bottom-10" : "rounded-b-lg border-t-0";

  return (
    <div className="relative w-full" ref={ref} onFocus={onFocus}>
      <Label
        value={label}
        loading={loading}
        className="block mb-2 text-sm font-medium"
      />
      {loading ? (
        <Skeleton className="p-3.5" />
      ) : (
        <div
          className={`focus:outline-none focus:ring-2 bg-(--papyrus-medium) border border-(--papyrus-medium-hover) text-sm focus:ring-(--papyrus-medium-hover) focus:border-(--papyrus-medium-hover) w-full p-2.5 flex ${borderCss}`}
        >
          <input
            className="focus:outline-none flex-1 placeholder:text-(--color-foreground)"
            placeholder={value?.title || "Select a value..."}
            style={style}
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
            onKeyDown={({ key }) => {
              if (key === "Enter" || key === "Tab") onBlur();
            }}
          />
          ▾
        </div>
      )}
      {focused && (
        <div
          ref={modalRef}
          className={`select-modal absolute bg-(--papyrus-medium) w-full border border-(--papyrus-medium-hover) text-sm overflow-y-auto z-50 ${modalCss}`}
          style={{ maxHeight: maxHeight }}
        >
          {values
            .filter(({ title, key }) =>
              `${key} ${title.toLowerCase()}`.includes(search.toLowerCase())
            )
            .map((entry, index, arr) => {
              const idCss = position === "top" ? 0 : arr.length - 1;
              return (
                <div
                  key={entry.key}
                  className={`select-modal-child p-2.5 w-full cursor-pointer flex hover:bg-(--papyrus-dark) ${
                    index === idCss && modalCss
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect(entry);
                  }}
                >
                  <div className="flex-1">{entry.title}</div>
                  <div>{value?.key === entry.key && "☑"}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Select;
