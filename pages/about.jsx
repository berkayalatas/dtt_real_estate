import React from "react";
import Image from "next/image";
import styles from "../styles/About.module.css";
import dtt from "../public/images/img_logo_dtt.png";
function about() {
  return (
    <div className={styles.about_container}>
      <div className={styles.header_container}>
        <h2>About</h2>
      </div>
      <div className={styles.about_header}>
        <h3>About DTT Real Estate</h3>
      </div>
      <div className={styles.about_text}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta ab
        incidunt iure tenetur provident natus sunt debitis excepturi ullam ipsum
        odio placeat optio cupiditate, alias, illum quaerat cum assumenda. Rem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <br />
      <div className={styles.about_text}>
        Soluta ab incidunt iure tenetur provident natus sunt debitis excepturi.
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
            <p>By DTT</p>
            <a className={styles.dtt_link} href="https://www.d-tt.nl">www.d-tt.nl</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;
