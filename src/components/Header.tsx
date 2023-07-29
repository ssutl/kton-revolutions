import styles from "../styles/Header.module.scss";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import userAuthenticated from "@/helpers/UserAuthenticated";
import HandleLoginModal from "./HandleLoginModal";

export default function Header() {
  const router = useRouter();
  const [restrictionHeader, setRestrictionHeader] = useState(false);
  const { LoginModal, setLoginModal } = HandleLoginModal();

  useEffect(() => {
    //Setting restrictionHeader to true if user not authenticated
    setRestrictionHeader(!userAuthenticated());
  }, [router.pathname]);

  //If on landing page we display default header
  if (router.pathname === "/") {
    return (
      <div className={styles.header}>
        <div className={styles.headerWidth}>
          <p>OVER 10,000 IMPORTED HIGHLIGHTS</p>
        </div>
      </div>
    );
    //If on home page we need to display the restriction ting
  } else if (router.pathname === "/Home" && restrictionHeader) {
    return (
      <div className={`${styles.header} ${styles.headerExpand}`}>
        <div className={styles.headerWidth}>
          <p>
            Welcome to KTON your account has restrictions, login to ensure you
            can access all features!
          </p>
          <span onClick={() => setRestrictionHeader(false)}>x</span>
        </div>
      </div>
    );
  } else if (router.pathname === "/Library" && restrictionHeader) {
    return (
      <div className={styles.header}>
        <div className={styles.headerWidth}>
          <p>Sign up to view all books</p>
          <span onClick={() => setRestrictionHeader(false)}>x</span>
        </div>
      </div>
    );
  }
}
