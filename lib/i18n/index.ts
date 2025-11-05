import * as Localization from "expo-localization";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAuth from "./locales/en/auth.json";
import enCommon from "./locales/en/common.json";
import esAuth from "./locales/es/auth.json";
import esCommon from "./locales/es/common.json";

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
  },
  es: {
    common: esCommon,
    auth: esAuth,
  },
};

export default i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0]?.languageCode || "en",
  fallbackLng: "en",
  ns: ["common", "login"],
  interpolation: {
    escapeValue: false,
  },
});
