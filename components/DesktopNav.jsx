import React, { useState } from "react";
import nav_logo from "../public/images/img_logo_dtt.png";
import style from "../styles/Houses.module.css";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

function DesktopNav() {
  const router = useRouter();

  return (
    <div>
      <nav className={style.desktop_nav}>
        <div className={style.nav_container}>
          <div className={style.logo}>
            <Image src={nav_logo} alt="LOGO" />
          </div>

          <div
            className={
              router.pathname == "/" ||
              router.pathname == "/housePage" ||
              router.pathname == "/editHome" ||
              router.pathname == "/newListing"
                ? style.nav_element_active
                : style.nav_element_pasive
            }
          >
            <Link href="/">Houses</Link>
          </div>

          <div
            className={
              router.pathname == "/about"
                ? style.nav_element_active
                : style.nav_element_pasive
            }
          >
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default DesktopNav;
