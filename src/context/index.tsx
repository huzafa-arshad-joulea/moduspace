import { AlertProvider } from "./AlertContext";
import { LocaleProvider } from "./localeContext";

const CentralContextProvider = ({ children }: { children: JSX.Element }) => (
  <>
    <AlertProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </AlertProvider>
  </>
);

export default CentralContextProvider;
