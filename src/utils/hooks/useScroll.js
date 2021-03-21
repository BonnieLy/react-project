import { useEffect, useState } from "react";

export default function useScroll() {
  const [scrollPos, setScrollPos] = useState(null);

  function onPageScroll() {
    setScrollPos(window.scrollY);
  }

  useEffect(() => {
    document.addEventListener("scroll", onPageScroll);
    return () => document.removeEventListener("scroll", onPageScroll);
  }, []);

  return scrollPos;
}
