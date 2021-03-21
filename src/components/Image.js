import React, { useState } from "react";

export default function Image({ image, index, removeImage }) {
  const [isHovering, setisHovering] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setisHovering(true)}
      onMouseLeave={() => setisHovering(false)}
    >
      <img
        alt="cat"
        className="m-1 p-1 border"
        src={image}
        onScroll={() => {}}
      />
      <i
        onClick={() => removeImage(index)}
        className={`fas fa-times absolute top-4 right-4 text-5 text-gray-400 hover:text-black cursor-pointer ${
          isHovering ? "" : "hidden"
        }`}
      ></i>
    </div>
  );
}
