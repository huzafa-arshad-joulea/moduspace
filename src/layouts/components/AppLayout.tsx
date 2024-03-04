import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        background: "#262626",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
};
