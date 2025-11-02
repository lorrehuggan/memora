import * as Localization from "expo-localization";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enLogin from "./locales/en/login.json";
import esCommon from "./locales/es/common.json";
import esLogin from "./locales/es/login.json";

const resources = {
  en: {
    common: enCommon,
    login: enLogin,
  },
  es: {
    common: esCommon,
    login: esLogin,
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
