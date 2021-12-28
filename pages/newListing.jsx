import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/New_Listing.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import delete_img from "../public/images/ic_clear_white.png";

function newListing() {
  const router = useRouter();
  const [selectGarage, setSelectGarage] = useState("");
  const [img, setImg] = useState(null);

  const handleImg = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className={styles.new_listing_container}>
      <div>
        <div className={styles.header_container}>
          <h2 className={styles.new_listing_header}>Create new listing</h2>
        </div>

        <div
          className={styles.back_btn}
          onClick={() => {
            router.push("/");
          }}
        ></div>
      </div>
      <form>
        <div className={styles.form_container}>
          <div className={styles.input_headers}>Street Name*</div>
          <input
            type="text"
            placeholder="Enter the street name"
            className={styles.form_input}
            required
            minLength="3"
            maxLength="25"
          />
          <div className={styles.input_side_by_side}>
            <div className={styles.element}>
              <div className={styles.input_headers}>House Number*</div>
              <input
                className={styles.form_input}
                type="number"
                placeholder="Enter house number"
                min={1}
                required
              />
            </div>
            <div className={styles.element}>
              <div className={styles.input_headers}>Addition(option)</div>
              <input
                className={styles.form_input}
                type="text"
                placeholder="e.g.A"
                minLength="1"
                maxLength="10"
              />
            </div>
          </div>
          <div className={styles.input_headers}>Postal Code*</div>
          <input
            className={styles.form_input}
            placeholder="e.g. 1000 AA"
            type="number"
            min={1}
            required
          />
          <div className={styles.input_headers}>City*</div>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Utrecht"
            minLength="2"
            maxLength="20"
            required
          />
          <div className={styles.input_headers}>
            Upload Picture (PNG or JPG)*
          </div>
          <div className={styles.img_area}>
            <div className={styles.plus}></div>
            <input
              className={styles.upload_img_input}
              type="file"
              onChange={handleImg}
              required
            />
            <div>
              <img
                src={img}
                alt=""
                className={
                  img != null ? styles.uploaded_img : styles.not_uploaded
                }
              />
            </div>
          </div>
          <div
            className={
              img === null ? styles.delete_img_before : styles.delete_img
            }
            onClick={() => {
              setImg(null);
            }}
          >
            <Image src={delete_img} />
          </div>

          <div className={styles.input_headers}>Price*</div>
          <input
            type="number"
            placeholder="e.g €150.000"
            className={styles.form_input}
            required
            min={3}
            max={20}
          />
          <div className={styles.input_side_by_side}>
            <div className={styles.element}>
              <div className={styles.input_headers}>Size*</div>
              <input
                className={styles.form_input}
                type="number"
                placeholder="e.g. 60m2"
                min={1}
                required
              />
            </div>
            <div className={styles.element}>
              <div className={styles.input_headers}>Garage*</div>
              <select
                className={styles.form_input}
                style={{ backgroundColor: "#fff" }}
                onChange={(e) => {
                  setSelectGarage(e.target.value);
                }}
                required
              >
                <option disabled value="default">
                  Select
                </option>
                {["Yes", "No"].map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.input_side_by_side}>
            <div className={styles.element}>
              <div className={styles.input_headers}>Bedrooms*</div>
              <input
                className={styles.form_input}
                type="number"
                placeholder="Enter amount"
                min={0}
                required
              />
            </div>
            <div className={styles.element}>
              <div className={styles.input_headers}>Bathrooms*</div>
              <input
                className={styles.form_input}
                type="number"
                placeholder="Enter amount"
                min={0}
                required
              />
            </div>
          </div>
          <div className={styles.input_headers}>Construction Date*</div>
          <input
            type="text"
            className={styles.form_input}
            onFocus={(e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }}
            max={new Date()}
            required
            placeholder="e.g. 1990"
          />
          <div className={styles.input_headers}>Description*</div>
          <textarea
            className={styles.form_input}
            rows="3"
            placeholder="Enter Description"
            minLength="5"
            maxLength="80"
            required
          />
        </div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            POST
          </button>
        </div>
      </form>
    </div>
  );
}

export default newListing;
