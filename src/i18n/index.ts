import { I18n } from "i18n-js";
import translations from "./translations";

const i18n = new I18n(translations, {
  enableFallback: true,
  locale: localStorage.getItem("lang") ?? "en",
});

export default i18n;
