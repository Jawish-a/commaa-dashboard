import { useEffect, useState } from "react";
export function useLang() {
  const [lang, setLang] = useState(localStorage.getItem("locale") || "en");

  /* Usually this is not a good way to set languages, but it works :| */
  const storage = localStorage.getItem("locale") || "en";

  useEffect(() => {
    setLang(storage);
  }, [storage]);

  return { lang };
}
