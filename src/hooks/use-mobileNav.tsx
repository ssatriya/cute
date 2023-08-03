import * as React from "react";

interface MobileNavType {
  showMobileMenu: boolean;
  setShowMobileMenu: (args: boolean) => void;
}

const MobileNavContext = React.createContext<MobileNavType>({
  showMobileMenu: false,
  setShowMobileMenu: () => {},
});

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <MobileNavContext.Provider value={{ showMobileMenu, setShowMobileMenu }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  return React.useContext(MobileNavContext);
}
