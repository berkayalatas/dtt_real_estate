import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import styles from "../styles/Houses.module.css";
import nav_home_active from "../public/images/ic_mobile_navigarion_home_active.png";
import nav_home from "../public/images/ic_mobile_navigarion_home.png";
import nav_info from "../public/images/ic_mobile_navigarion_info.png";
import nav_info_active from "../public/images/ic_mobile_navigarion_info_active.png";

function MobileNav() {
  const [activeHomeBtn, setActiveHomeBtn] = useState(true);
  const [activeInfoBtn, setActiveInfoBtn] = useState(false);
  const router = useRouter();

  function displayHomePage() {
    setActiveHomeBtn(true);
    setActiveInfoBtn(false);
  }

  function displayInfoPage() {
    setActiveHomeBtn(false);
    setActiveInfoBtn(true);
  }

  return (
    <div>
      <div className={styles.navbar_container}>
        <div
          className={styles.navbar_element}
          onClick={(e) => {
            router.push("/");
          }}
        >
          <Image
            src={
              router.pathname == "/" ||
              router.pathname == "/housePage" ||
              router.pathname == "/editHome" ||
              router.pathname == "/newListing"
                ? nav_home_active
                : nav_home
            }
          />
        </div>
        <div
          className={styles.navbar_element}
          onClick={() => {
            router.push("/about");
          }}
        >
          <Image
            src={router.pathname == "/about" ? nav_info_active : nav_info}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
