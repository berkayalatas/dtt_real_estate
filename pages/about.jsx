import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/About.module.css";
import dtt from "../public/images/img_logo_dtt.png";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";

function about() {
  return (
    <div>
      <DesktopNav />

      <div className={styles.about_container}>
        <div className={styles.header_container}>
          <h2>About</h2>
        </div>
        <div className={styles.about_header}>
          <h3>About DTT Real Estate</h3>
        </div>
        <div className={styles.about_text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta ab
          incidunt iure tenetur provident natus sunt debitis excepturi ullam
          ipsum odio placeat optio cupiditate, alias, illum quaerat cum
          assumenda. Rem. Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </div>
        <br />
        <div className={styles.about_text}>
          Soluta ab incidunt iure tenetur provident natus sunt debitis
          excepturi.
        </div>

        <div>
          <div className={styles.about_header}>
            <h3>Design and Development</h3>
          </div>
          <div className={styles.link_container}>
            <div>
              <Image src={dtt} alt="DTT IMG" />
            </div>
            <div className={styles.links}>
              <div>By DTT</div>
              <div className={styles.dtt_link}>
                <Link href="https://www.d-tt.nl">www.d-tt.nl</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile_nav}>
        <MobileNav />
      </div>
    </div>
  );
}

export default about;
