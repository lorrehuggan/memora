import * as Localization from "expo-localization";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";

const resources = {
  en: {
    common: enCommon,
  },
};

export default i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0]?.languageCode || "en",
  fallbackLng: "en",
  ns: ["common"],
  interpolation: {
    escapeValue: false,
  },
});
