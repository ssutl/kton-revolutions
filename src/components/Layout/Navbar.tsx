import styles from "../../styles/Layout/Navbar.module.scss";
import React, { useState, useEffect, useContext } from "react";
import { KTON_CONTEXT } from "../../context/KTONContext";
import { useRouter } from "next/router";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import TuneIcon from "@mui/icons-material/Tune";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";

export interface NavbarProps {
  handleSettingsModal: () => void;
  settingsDisplayed: boolean;
}

export default function Navbar({
  handleSettingsModal,
  settingsDisplayed,
}: NavbarProps) {
  const { books, updateBooks } = useContext(KTON_CONTEXT);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const [demo, setDemo] = useState(false);
  const [auth, setAuth] = useState(false);

  // getting the current route
  const isIndexRoute = router.pathname === "/";
  const isImportRoute = router.pathname === "/Import";
  const isHome = router.pathname === "/Home";
  const isLibr = router.pathname === "/Library";
  const isBook = router.pathname.includes("/Book/");
  const isExport = router.pathname === "/Export";

  const DisplaySettings = isHome || isLibr || isBook || isExport;
  const DisplayLibrary =
    DisplaySettings ||
    (isImportRoute &&
      books?.filter((eachBook) => eachBook.deleted === false).length !== 0 &&
      books !== undefined);

  //Screen width for mobile
  useEffect(() => {
    //Have to set screenwidth to disable share feature for mobile
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", () => handleResize());

    //Updating demo state
    const Demo = localStorage.getItem("Demo") === "true";
    const Auth = localStorage.getItem("token") ? true : false;
    if (Auth) setAuth(Auth);
    if (Demo) setDemo(Demo);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router.pathname]);

  //Display the navbar
  if (router.pathname === "/verify/[...id]") return null;

  const mobileNavbar = () => {
    return (
      <div className={styles.mobileNavbar}>
        <div className={styles.navbarWidth}>
          <p
            onClick={() => {
              router.push("/Home");
              if (settingsDisplayed) {
                handleSettingsModal();
              }
            }}
          >
            <AutoGraphIcon />
          </p>
          {DisplayLibrary && (
            <p
              onClick={() => {
                router.push("/Library");
                if (settingsDisplayed) {
                  handleSettingsModal();
                }
              }}
            >
              <SplitscreenIcon />
            </p>
          )}
          {auth && (DisplaySettings || isImportRoute) && (
            <p onClick={() => handleSettingsModal()}>
              <TuneIcon />
            </p>
          )}
          {demo && !auth && (
            <p
              onClick={() => {
                router.push("/");
                localStorage.removeItem("Demo");
                setDemo(false);
                updateBooks(undefined);
              }}
            >
              <LogoutIcon />
            </p>
          )}
        </div>
      </div>
    );
  };

  if (screenWidth && screenWidth < 1024 && !isIndexRoute) return mobileNavbar();

  if (screenWidth && screenWidth < 1024 && isIndexRoute) return null;

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarWidth}>
        <h3
          onClick={() =>
            router.push(`${isIndexRoute ? "https://kton.xyz" : "/Home"}`)
          }
        >
          KTON
        </h3>
        <div className={styles.navigationButtons}>
          {DisplayLibrary && (
            <p onClick={() => router.push("/Library")}>Library</p>
          )}
          {auth && (DisplaySettings || isImportRoute) && (
            <p onClick={() => handleSettingsModal()}>Settings</p>
          )}
          {demo && !auth && (
            <p
              onClick={() => {
                router.push("/");
                localStorage.removeItem("Demo");
                setDemo(false);
                updateBooks(undefined);
              }}
            >
              Login
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
