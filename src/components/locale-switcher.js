import React, { useEffect } from "react";
import { CButton } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
const LocaleSwitcher = ({ autoWidth }) => {
  const locale = useSelector((state) => state.locale);
  const dispatch = useDispatch();
  useEffect(() => {
    // had to do this because coreui navbar doesnt accept components
    // console.clear();
  }, []);

  const changeLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    localStorage.setItem("locale", newLocale);
    dispatch({ type: "set", locale: newLocale });
  };

  return (
    <CButton
      onClick={changeLocale}
      color="warning"
      className={cn("d-block", autoWidth ? "w-auto" : "w-100")}
    >
      {locale === "ar" ? "English" : "العربية"}
    </CButton>
  );
};

export default LocaleSwitcher;
