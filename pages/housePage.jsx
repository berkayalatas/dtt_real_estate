import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import styles from "../styles/HousePage.module.css";
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
import edit_red from "../public/images/ic_edit.png";
import delete_gray from "../public/images/ic_delete.png";
import back from "../public/images/ic_back_grey.png";
import DesktopNav from "../components/DesktopNav";

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

  function handleEdit() {
    router.push({
      pathname: "/editHome",
      query: {
        id: id,
      },
    });
  }
  function handleDelete() {
    setIsOpen(true);
  }

  console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DesktopNav />

      <div className={styles.go_back_container}>
        <span
          className={styles.back_btn}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src={back} alt="back" />
        </span>

        <p className={styles.overview_text}>Back to overview</p>
      </div>
      <div className={styles.container}>
        <div className={styles.content_section}>
          <div className={styles.img_container}>
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
              <span className={styles.icons_right} onClick={handleEdit}>
                <Image src={edit_btn} />
              </span>
              <span className={styles.icons_right}>
                <Image src={delete_btn} onClick={handleDelete} />
              </span>
            </div>
          </div>

          <div className={styles.card_container}>
            <div className={styles.card}>
              <div className={styles.card_width}>
                <div className={styles.top_card}>
                  <div className={styles.header_and_icons}>
                    <p className={styles.card_header}>
                      {theHouse.location["street"]}
                    </p>
                    <div className={styles.edit_and_delete}>
                      <span
                        className={styles.edit_desktop}
                        onClick={handleEdit}
                      >
                        <Image src={edit_red} alt="edit" />
                      </span>
                      <span
                        className={styles.delete_desktop}
                        onClick={handleDelete}
                      >
                        <Image src={delete_gray} alt="delete" />
                      </span>
                    </div>
                  </div>

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
                      <span className={styles.info_span}>
                        {theHouse.size} m2
                      </span>
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
        </div>
        <div className={styles.recommend_section}>
          <div className={styles.recommend_container}>
            <div className={styles.recommend_header_container}>
              <h3 className={styles.recommend_header}>Recommended for you</h3>
            </div>
            {/* {  Recommended Houses } */}
            {data
              ?.filter((house, idx) => idx < 3)
              .map((house, key) => (
                <div key={key}>
                  <div className={styles.recommend_cards}>
                    <div
                      onClick={() => {
                        router.push({
                          pathname: "/housePage",
                          query: {
                            id: house.id,
                          },
                        });
                      }}
                    >
                      <img
                        className={styles.recommend_card_img}
                        src={house.image}
                        alt="home"
                      />
                    </div>
                    <div className={styles.recommend_card_body}>
                      <div>
                        <div className={styles.recommend_house_name}>
                          {house.location["street"]}
                        </div>

                        <p className={styles.recommend_house_price}>
                          € {house.price}
                        </p>
                        <p className={styles.recommend_house_location}>
                          {house.location["city"]}
                        </p>
                      </div>

                      <div className={styles.recommend_icon_container}>
                        <div className={styles.recommend_icon}>
                          <span className={styles.recommend_small_info}>
                            <Image
                              src={bed_icon}
                              width={18}
                              height={18}
                              alt="bed"
                            />{" "}
                          </span>
                          <span>{house.rooms["bedrooms"]}</span>
                        </div>
                        <div className={styles.recommend_icon}>
                          <span className={styles.recommend_small_info}>
                            <Image
                              src={bath_icon}
                              width={18}
                              height={18}
                              alt="bath"
                            />
                          </span>
                          <span>{house.rooms["bathrooms"]}</span>
                        </div>
                        <div className={styles.recommend_icon}>
                          <span className={styles.recommend_small_info}>
                            <Image
                              src={size_icon}
                              width={18}
                              height={18}
                              alt="size"
                            />
                          </span>
                          <span> {house.size} m2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.mobile_nav_container}>
            <MobileNav />
          </div>

          {isOpen && <DeleteModal setIsOpen={setIsOpen} />}
        </div>
      </div>
      <div className={styles.mobile_nav_container}>
        <MobileNav />
      </div>
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
