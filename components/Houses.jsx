import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import styles from "../styles/Houses.module.css";
import bed from "../public/images/ic_bed@3x.png";
import bath from "../public/images/ic_bath@2x.png";
import size from "../public/images/ic_size@2x.png";
import edit from "../public/images/ic_edit.png";
import delete_icon from "../public/images/ic_delete.png";
import clean from "../public/images/ic_clear.png";
import search from "../public/images/ic_search.png";
import notfound from "../public/images/img_empty_houses.png";
import Mobile_Nav from "./MobileNav";
import DeleteModal from "../components/DeleteModal";
import DesktopNav from "../components/DesktopNav";
import plus from "../public/images/ic_plus_white.png";

function Houses({ data }) {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [activePriceBtn, setActivePriceBtn] = useState(false);
  const [activeSizeBtn, setActiveSizeBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const resetSearchInput = () => {
    setSearchInput("");
  };

  console.log(data);
 
  const [sortedArr, setSortedArr] = useState(data);

  /* /* Filtering according to Search Input */
  const filterBySearch = sortedArr.filter((value) => {
    if (searchInput?.toLowerCase() == "") {
      return value;
    } else if (
      value.location["city"]
        .toLowerCase()
        .includes(searchInput?.toLowerCase()) ||
      value.location["street"]
        .toLowerCase()
        .includes(searchInput?.toLowerCase()) ||
      value.location["zip"]
        .toLowerCase()
        .includes(searchInput?.toLowerCase()) ||
      value.price === parseInt(searchInput) ||
      value.size === parseInt(searchInput)
    ) {
      return value;
    }
  });

  /* Filtering according to price */
  const sortByPrice = [...filterBySearch].sort(function (a, b) {
    return a.price - b.price;
  });

  /* Filtering according to Size */
  const sortBySize = [...filterBySearch].sort(function (a, b) {
    return b.size - a.size;
  });

  function displayFilteredPrice() {
    setActivePriceBtn(true);
    setActiveSizeBtn(false);
    setSortedArr(sortByPrice);
  }

  function displayFilteredSize() {
    setActiveSizeBtn(true);
    setActivePriceBtn(false);
    setSortedArr(sortBySize);
  }

  return (
    <div>
      <DesktopNav />

      <div className={styles.container}>
        <div>
          <div className={styles.header_container}>
            <h2 className={styles.house_header}>Houses</h2>
            <button
              className={styles.new_listing_btn}
              onClick={() => {
                router.push("/newListing");
              }}
            >
              {" "}
              <span className={styles.img_span}>
                <Image src={plus} alt="" />
              </span>
              CREATE NEW
            </button>
          </div>
          <div
            className={styles.plus}
            onClick={() => {
              router.push("/newListing");
            }}
          ></div>
        </div>
        <div className={styles.input_and_filters}>
          <div className={styles.input_container}>
            <div>
              <input
                className={styles.search_input}
                type="text"
                placeholder="Search for a house"
                name="search_result"
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                  setActivePriceBtn(false);
                  setActiveSizeBtn(false);
                }}
              />

              <div className={styles.input_icons}>
                {searchInput?.length > 0 ? (
                  <div className={styles.clean_icon}>
                    <Image
                      src={clean}
                      onClick={() => {
                        resetSearchInput();
                        setSortedArr(data);
                        setActivePriceBtn(false);
                        setActiveSizeBtn(false);
                      }}
                      alt="clean Input"
                    />
                  </div>
                ) : (
                  <div className={styles.search_icon}>
                    <Image src={search} alt="search"/>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.filter_buttons}>
            <button
              className={
                activePriceBtn ? styles.price_active : styles.price_btn
              }
              onClick={displayFilteredPrice}
            >
              Price
            </button>
            <button
              className={activeSizeBtn ? styles.size_active : styles.size_btn}
              onClick={displayFilteredSize}
            >
              Size
            </button>
          </div>
        </div>

        {/* Number of result */}
        {searchInput.length > 0 ? (
          <div className={styles.num_of_result}>
            {filterBySearch.length}{" "}
            {filterBySearch.length > 1 ? " results found" : "result found"}
          </div>
        ) : (
          <div></div>
        )}

        <div>
          {/* Display number of result */}
          {filterBySearch?.length > 0 ? (
            filterBySearch.map((house, key) => (
              <div key={key}>
                <div className={styles.card}>
                  <div
                    className={styles.card_header}
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
                  <div className={styles.card_body}>
                    <div>
                      <div className={styles.edit_container}>
                        <div className={styles.house_name}>
                          {house.location["street"]}
                        </div>
                        <div className={styles.icons}>
                          <div
                            className={styles.edit}
                            onClick={() => {
                              router.push({
                                pathname: "/editHome",
                                query: {
                                  id: house.id,
                                },
                              });
                            }}
                          >
                            <Image src={edit} alt="edit" />
                          </div>
                          <div
                            className={styles.delete}
                            onClick={() => {
                              setIsOpen(true);
                            }}
                          >
                            <Image src={delete_icon} alt="delete" />
                          </div>
                        </div>
                      </div>
                      <p className={styles.house_price}>€ {house.price}</p>
                      <p className={styles.house_location}>
                        {house.location["city"]} {house.location["zip"]}
                      </p>
                    </div>

                    <div className={styles.icon_container}>
                      <div className={styles.icon}>
                        <span className={styles.small_info}>
                          <Image src={bed} width={18} height={18} alt="bed" />
                        </span>
                        <span>{house.rooms["bedrooms"]}</span>
                      </div>
                      <div className={styles.icon}>
                        <span className={styles.small_info}>
                          <Image src={bath} width={18} height={18} alt="bath" />
                        </span>
                        <span>{house.rooms["bathrooms"]}</span>
                      </div>
                      <div className={styles.icon}>
                        <span className={styles.small_info}>
                          <Image src={size} width={18} height={18} alt="size" />
                        </span>
                        <span> {house.size} m2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.notfound}>
              <div className={styles.notfound_img_container}>
                <Image src={notfound} />
              </div>
              <div className={styles.notfound_text_container}>
                <p>
                  No Results Found <br />
                  Please try another keyword
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <DeleteModal setIsOpen={setIsOpen} />}
      <div className={styles.mobile_nav}>
        <Mobile_Nav />
      </div>
    </div>
  );
}

export default Houses;
