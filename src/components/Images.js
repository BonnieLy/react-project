import React, { useEffect, useState } from "react";
import useDebound from "../utils/hooks/useDebound";
import useFetchImage from "../utils/hooks/useFetchImage";
import useScroll from "../utils/hooks/useScroll";
import Image from "./Image";

export default function Images() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchTerm
  );
  const scrollPos = useScroll();

  useEffect(() => {
    if (scrollPos >= document.body.offsetHeight - window.innerHeight)
      setPage(page + 1);
  }, [scrollPos]);

  function ShowImage() {
    return images.map((img, idx) => (
      <Image
        image={img.urls.regular}
        index={idx}
        removeImage={removeImage}
        key={idx}
      />
    ));
  }

  function removeImage(index) {
    setImages(images.filter((image, imageIndex) => imageIndex !== index));
  }

  const debound = useDebound();
  function onSearchChange(e) {
    const text = e.target.value;
    debound(() => setSearchTerm(text));
  }

  return (
    <section>
      {isLoading ? (
        <div className="flex h-screen">
          <i className="fas fa-spinner fas-spin m-auto"></i>
        </div>
      ) : null}
      <div className="justify-center">
        <input
          className="w-full border-2 rounded p-2 m-1 my-5 shadow"
          type="text"
          onChange={onSearchChange}
          placeholder="Search Photos Here"
        ></input>
      </div>
      {errors.length > 0 && (
        <div className="flex h-screen">
          <p className="m-auto">Cannot fetch the image.</p>
        </div>
      )}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-1">
        {<ShowImage />}
      </div>
    </section>
  );
}
