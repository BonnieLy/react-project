import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchImage(page, searchTerm) {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const urlApi = process.env.REACT_APP_UNSPLASH_API;
  const urlKey = process.env.REACT_APP_UNSPLASH_KEY;

  function fetch() {
    let url =
      searchTerm !== "" ? `search/photos?query=${searchTerm}&` : `photos?`;
    axios
      .get(`${urlApi}${url}client_id=${urlKey}&page=${page}`)
      .then((res) => {
        searchTerm ? fetchSearch(res) : fetchRandom(res);
        setIsLoading(false);
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
        setIsLoading(false);
      });
  }

  function fetchSearch(res) {
    setImages(
      page > 2 ? [...images, ...res.data.results] : [...res.data.results]
    );
  }

  function fetchRandom(res) {
    setImages([...images, ...res.data]);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch();
  }, [page, searchTerm]);

  return [images, setImages, errors, isLoading];
}
