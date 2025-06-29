import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  overflow?: "x" | "y";
  onScroll?: (position: number, height: number) => void;
}

const Scrollable = ({ children, overflow = "y", onScroll }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  let css = "flex-1 ";
  if (overflow === "x") css += "overflow-x-auto";
  if (overflow === "y") css += "overflow-y-auto";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const _onScroll = () => {
      if (onScroll)
        onScroll(
          container.scrollTop + container.clientHeight,
          container.scrollHeight
        );
    };
    container.addEventListener("scroll", _onScroll);
    return () => {
      container.removeEventListener("scroll", _onScroll);
    };
  }, [containerRef, onScroll]);

  return (
    <div ref={containerRef} className={css}>
      <div style={{ height: (containerRef.current?.clientHeight || 0) - 50 }}>
        {children}
      </div>
    </div>
  );
};

export default Scrollable;
