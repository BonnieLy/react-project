import { useState } from "react";

export default function useDebound() {
  const [typingTimeOut, setTypingTimeOut] = useState("");

  function debound(func, wait = 1000) {
    clearTimeout(typingTimeOut);
    const timeOut = setTimeout(() => func(), wait);
    setTypingTimeOut(timeOut);
  }

  return debound;
}
