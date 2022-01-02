import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import styles from "../styles/HousePage.module.css";
import style from "../styles/Houses.module.css";
import back_btn from "../public/images/ic_back_white.png";
import edit_btn from "../public/images/ic_edit_white.png";
import delete_btn from "../public/images/ic_delete_white.png";
import location_icon from "../public/images/ic_location.png";
import price_icon from "../public/images/ic_price.png";
import size_icon from "../public/images/ic_size.png";
import built_icon from "../public/images/ic_construction_date.png";
import bed_icon from "../public/images/ic_bed.png";
import bath_icon from "../public/images/ic_bath.png";
import garage_icon from "../public/images/ic_garage.png";
import MobileNav from "../components/MobileNav";
import DeleteModal from "../components/DeleteModal";
import module_style from "../styles/Modal.module.css";

function housePage({ data }) {
  const router = useRouter();
  /* Get home ID from URL */
  const { id } = router.query;

  /* Find the home details using the id*/
  var theHouse = {};
  data?.filter((house) => {
    if (house.id == id) {
      theHouse = house;
    }
  });

  console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <img className={styles.house_img} src={theHouse.image} />
      </div>

      <div className={styles.top_icons}>
        <div
          className={styles.back_container}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src={back_btn} />
        </div>
        <div className={styles.edit_container}>
          <span
            className={styles.icons_right}
            onClick={() => {
              router.push({
                pathname: "/editHome",
                query: {
                  id: id,
                },
              });
            }}
          >
            <Image src={edit_btn} />
          </span>
          <span className={styles.icons_right}>
            <Image src={delete_btn} onClick={() => setIsOpen(true)} />
          </span>
        </div>
      </div>

      <div className={styles.card_container}>
        <div className={styles.card}>
          <div>
            <div className={styles.top_card}>
              <p className={styles.card_header}>
                {theHouse.location["street"]}
              </p>

              <div className={styles.icons_container}>
                <p className={styles.zip}>
                  <span className={styles.card_icon}>
                    <Image src={location_icon} />
                  </span>
                  <span className={styles.info_span}>
                    {" "}
                    {theHouse.location["zip"]}
                  </span>
                </p>
              </div>
              <div className={styles.icons_container}>
                <p className={styles.price}>
                  <span className={styles.card_icon}>
                    <Image src={price_icon} />
                  </span>
                  <span className={styles.info_span}>{theHouse.price}</span>
                </p>
                <p className={styles.size}>
                  <span className={styles.card_icon}>
                    <Image src={size_icon} />
                  </span>
                  <span className={styles.info_span}>{theHouse.size} m2</span>
                </p>
                <p className={styles.built}>
                  <span className={styles.card_icon}>
                    <Image src={built_icon} />
                  </span>
                  <span className={styles.info_span}>
                    {" "}
                    {theHouse.constructionYear}
                  </span>
                </p>
              </div>
              <div className={styles.icons_container}>
                <p className={styles.bed}>
                  <span className={styles.card_icon}>
                    <Image src={bed_icon} />
                  </span>
                  <span className={styles.info_span}>
                    {theHouse.rooms["bedrooms"]}
                  </span>
                </p>
                <p className={styles.size}>
                  <span className={styles.card_icon}>
                    <Image src={bath_icon} />
                  </span>
                  <span className={styles.info_span}>
                    {theHouse.rooms["bathrooms"]}{" "}
                  </span>
                </p>
                <p className={styles.built}>
                  <span className={styles.card_icon}>
                    <Image src={garage_icon} />
                  </span>
                  <span className={styles.info_span}>
                    {" "}
                    {theHouse.hasGarage === true ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            </div>

            <div className={styles.description}>
              <p>{theHouse.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={styles.header_container}>
          <h3 className={styles.recommend_header}>Recommended for you</h3>
        </div>
        {/* {  Recommended Houses } */}
        {data
          ?.filter((house, idx) => idx < 3)
          .map((house, key) => (
            <div key={key}>
              <div className={style.card}>
                <div
                  className={style.card_header}
                  onClick={() => {
                    router.push({
                      pathname: "/housePage",
                      query: {
                        id: house.id,
                      },
                    });
                  }}
                >
                  <img src={house.image} alt="home" />
                </div>
                <div className={style.card_body}>
                  <div>
                    <div className={style.edit_container}>
                      <div className={style.house_name}>
                        {house.location["street"]}
                      </div>
                    </div>
                    <p className={style.house_price}>€ {house.price}</p>
                    <p className={style.house_location}>
                      {house.location["city"]}
                    </p>
                  </div>

                  <div className={style.icon_container}>
                    <div className={style.icon}>
                      <Image src={bed_icon} width={18} height={18} alt="bed" />{" "}
                      1
                    </div>
                    <div className={style.icon}>
                      <Image
                        src={bath_icon}
                        width={18}
                        height={18}
                        alt="bath"
                      />
                      1
                    </div>
                    <div className={style.icon}>
                      <Image
                        src={size_icon}
                        width={18}
                        height={18}
                        alt="size"
                      />
                      <div> {house.size} m2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <MobileNav />
      {isOpen && <DeleteModal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default housePage;

export async function getServerSideProps() {
  var myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "wrGyPvn6VagYhAqEeFOpuZ1cKdtWUm24");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    "https://api.intern.d-tt.nl/api/houses",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return {
    props: {
      data,
    },
  };
}
