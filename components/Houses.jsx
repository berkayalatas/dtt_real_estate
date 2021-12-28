import React, { useRef, useState } from "react";
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
import { useRouter } from "next/dist/client/router";

function Houses({ data }) {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [activePriceBtn, setActivePriceBtn] = useState(false);
  const [activeSizeBtn, setActiveSizeBtn] = useState(false);

  const resetSearchInput = () => {
    setSearchInput("");
  };

  const [sortedArr, setSortedArr] = useState(data);

  /* /* Filtering according to Search Input */
  const filterBySearch = sortedArr.filter((value) => {
    if (searchInput?.toLowerCase() == "") {
      return value;
    } else if (
      value.location["city"].toLowerCase().includes(searchInput?.toLowerCase())
    ) {
      return value;
    } else if (
      searchInput?.length > 0 &&
      !value.location["city"].toLowerCase().includes(searchInput?.toLowerCase())
    ) {
      console.log("Not Found");
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
    <div className={styles.container}>
      <div>
        <div className={styles.header_container}>
          <h2 className={styles.house_header}>Houses</h2>
        </div>

        <div className={styles.plus} onClick={()=>{router.push("/newListing");}}></div>
      </div>
      <div>
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
                    }}
                    alt="clean Input"
                  />
                </div>
              ) : (
                <div className={styles.search_icon}>
                  <Image src={search} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.filter_buttons}>
          <button
            className={activePriceBtn ? styles.price_active : styles.price_btn}
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
      <div>
        {filterBySearch?.length > 0 ? (
          filterBySearch.map((house, key) => (
            <div key={key}>
              <div className={styles.card}>
                <div className={styles.card_header}>
                  <img src={house.image} alt="rover" />
                </div>
                <div className={styles.card_body}>
                  <div>
                    <div className={styles.edit_container}>
                      <div className={styles.house_name}>
                        {house.location["street"]}
                      </div>
                      <div className={styles.icons}>
                        <div className={styles.edit}>
                          <Image src={edit} alt="edit" />
                        </div>
                        <div className={styles.delete}>
                          <Image src={delete_icon} alt="delete" />
                        </div>
                      </div>
                    </div>
                    <p className={styles.house_price}>€ {house.price}</p>
                    <p className={styles.house_location}>
                      {house.location["city"]}
                    </p>
                  </div>

                  <div className={styles.icon_container}>
                    <div className={styles.icon}>
                      <Image src={bed} width={18} height={18} alt="bed" /> 1
                    </div>
                    <div className={styles.icon}>
                      <Image src={bath} width={18} height={18} alt="bath" />1
                    </div>
                    <div className={styles.icon}>
                      <Image src={size} width={18} height={18} alt="size" />
                      <div> {house.size} m2</div>
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
      {/* <div className={styles.house_card}>
        <div className={styles.image_container}>
          <img
            className={styles.card_image}
            src="https://images.unsplash.com/photo-1640270914397-2103d0a16eeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="HOUSE"
          />
        </div>
        <div className={styles.cart_content}>
          <div>
            {" "}
            <p className={styles.house_name}>Name</p>
          </div>
          <div>
            {" "}
            <p className={styles.house_price}>€ Price</p>
          </div>
          <div>
            {" "}
            <p className={styles.house_location}>location</p>
          </div>

          <div className={styles.icon_container}>
            <p className={styles.icon_bed}> </p>
            <p className={styles.icon_bath}> </p>
            <p className={styles.icon_size}> </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Houses;
