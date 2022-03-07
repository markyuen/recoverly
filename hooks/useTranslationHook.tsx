import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Language = "en" | "th";

function useTranslationHook() {
  const [currLanguage, setCurrLanguage] = useState<Language>("en");
  const { i18n, t } = useTranslation();

  const switchLanguage = () => {
    switch (currLanguage) {
      case "en":
        setCurrLanguage("th");
        return;
      case "th":
        setCurrLanguage("en");
        return;
      default:
        console.log(currLanguage);
        throw new Error("Unsupported Language");
    }
  };

  useEffect(() => {
    i18n.changeLanguage(currLanguage);
  }, [currLanguage, i18n]);

  return { currLanguage, switchLanguage, translate: t };
}

export default useTranslationHook;
