"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

interface Props {
  src: string | null;
  width?: number;
  height?: number;
  alt: string;
}

const ImageViewer = ({ src, width, height, alt }: Props) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isDragging = useRef(false);
  const offset = useRef([0, 0]);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(100);

  const updateSize = () => {
    if (!divRef.current) return;
    setSize({ w: divRef.current.clientWidth, h: divRef.current.clientHeight });
  };

  const startDrag = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();
    if (!imgRef.current || !divRef.current) return;

    isDragging.current = true;
    offset.current = [
      ev.clientX - imgRef.current.offsetLeft,
      ev.clientY - imgRef.current.offsetTop,
    ];

    divRef.current.style.cursor = "grabbing";
  };

  const updatePos = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();
    if (!isDragging.current || !imgRef.current) return;

    const x = ev.clientX - offset.current[0];
    const y = ev.clientY - offset.current[1];

    imgRef.current.style.left = `${x}px`;
    imgRef.current.style.top = `${y}px`;
  };

  const stopDrag = () => {
    if (!divRef.current) return;
    isDragging.current = false;
    divRef.current.style.cursor = "grab";
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div ref={divRef} className="grow">
      {src && (
        <div
          className="frame-image"
          style={{
            width: width || size.w,
            height: height || size.h,
            position: "relative",
            overflow: "hidden",
          }}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onMouseMove={updatePos}
          onMouseLeave={stopDrag}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="absolute select-none"
            style={{
              objectFit: "contain",
              width: `${zoom}%`,
              height: `${zoom}%`,
            }}
          />
          <div className="border-top1" />
          <div className="border-top2" />
          <div className="border-bottom1" />
          <div className="border-bottom2" />
          <Icon
            name="icon-zoom-in"
            className="absolute top-0 right-0 text-5xl cursor-pointer"
            onClick={() => setZoom((prev) => prev + 10)}
          />
          <Icon
            name="icon-zoom-out"
            className="absolute top-15 right-0 text-5xl cursor-pointer"
            onClick={() => setZoom((prev) => prev - 10)}
          />
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
