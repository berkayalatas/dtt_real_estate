import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/New_Listing.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import delete_img from "../public/images/ic_clear_white.png";
import axios from "axios";
import back from "../public/images/ic_back_grey.png";

function newListing() {
  const router = useRouter();

  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState(null);
  const [numberAddition, setNumberAddition] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState(null);
  const [hasGarage, setHasGarage] = useState(false);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [constructionYear, setConstructionYear] = useState("");
  const [description, setDescription] = useState("");

  const handleImg = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleGarageChange = (event) => {
    setHasGarage(event.target.value);
    // console.log(hasGarage);
  };

  async function onSubmitForm(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "wrGyPvn6VagYhAqEeFOpuZ1cKdtWUm24");
    // myHeaders.append("Content-Type", "application/json");

    console.log(streetName, price, city, hasGarage);

    var formdata = new FormData();
    formdata.append("streetName", streetName);
    formdata.append("price", price);
    formdata.append("bedrooms", bedrooms);
    formdata.append("bathrooms", bathrooms);
    formdata.append("size", size);
    formdata.append("houseNumber", houseNumber);
    formdata.append("numberAddition", numberAddition);
    formdata.append("zip", zip);
    formdata.append("city", city);
    formdata.append("constructionYear", constructionYear);
    formdata.append("hasGarage", hasGarage);
    formdata.append("description", description);

    console.log(formdata);

    const newListing = [
      {
        price: price,
        rooms: {
          bedrooms: bedrooms,
          bathrooms: bedrooms,
        },
        size: 500,
        description: description,
        location: {
          street: streetName,
          city: city,
          zip: zip,
        },
        constructionYear: constructionYear,
        hasGarage: hasGarage,
      },
    ];

    let config = {
      method: "POST",
      url: "https://api.intern.d-tt.nl/api/houses",
      headers: myHeaders,
      body: newListing,
      redirect: "follow",
    };

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) {
        console.log("success");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.new_listing_container}>
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
      <div className={styles.header_container}>
        <h2 className={styles.new_listing_header}>Create new listing</h2>
      </div>
      <div className={styles.form_container}>
        <form onSubmit={onSubmitForm}>
          <div className={styles.form}>
            <label htmlFor="streetName" className={styles.input_headers}>
              Street Name*
            </label>
            <input
              type="text"
              placeholder="Enter the street name"
              className={styles.form_input}
              required
              name="streetName"
              minLength="3"
              maxLength="25"
              onChange={(e) => {
                setStreetName(e.target.value);
              }}
            />
            <div className={styles.input_side_by_side}>
              <div className={styles.element}>
                <label htmlFor="streetName" className={styles.input_headers}>
                  House Number*
                </label>
                <input
                  className={styles.form_input}
                  type="number"
                  placeholder="Enter house number"
                  min={1}
                  required
                  name="houseNumber"
                  onChange={(e) => {
                    setHouseNumber(e.target.value);
                  }}
                />
              </div>
              <div className={styles.element}>
                <label
                  htmlFor="numberAddition"
                  className={styles.input_headers}
                >
                  Addition(option)
                </label>
                <input
                  className={styles.form_input}
                  type="text"
                  placeholder="e.g.A"
                  minLength="1"
                  maxLength="10"
                  name="numberAddition"
                  onChange={(e) => {
                    setNumberAddition(e.target.value);
                  }}
                />
              </div>
            </div>
            <label htmlFor="zip" className={styles.input_headers}>
              Postal Code*
            </label>
            <input
              className={styles.form_input}
              placeholder="e.g. 1000 AA"
              type="text"
              required
              name="zip"
              onChange={(e) => {
                setZip(e.target.value);
              }}
            />
            <label htmlFor="city" className={styles.input_headers}>
              City*
            </label>
            <input
              className={styles.form_input}
              type="text"
              placeholder="Utrecht"
              minLength="2"
              maxLength="20"
              required
              name="city"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label htmlFor="picture" className={styles.input_headers}>
              Upload Picture (PNG or JPG)*
            </label>
            <div className={styles.img_area}>
              <div className={styles.plus}></div>
              <input
                className={styles.upload_img_input}
                type="file"
                onChange={handleImg}
                required
                name="picture"
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

            <label htmlFor="price" className={styles.input_headers}>
              Price*
            </label>
            <input
              type="number"
              placeholder="e.g €150.000"
              className={styles.form_input}
              required
              min={3}
              name="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <div className={styles.input_side_by_side}>
              <div className={styles.element}>
                <label htmlFor="size" className={styles.input_headers}>
                  Size*
                </label>
                <input
                  className={styles.form_input}
                  type="number"
                  placeholder="e.g. 60m2"
                  min={1}
                  required
                  name="size"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                />
              </div>
              <div className={styles.element}>
                <label htmlFor="hasGarage" className={styles.input_headers}>
                  Garage*
                </label>
                <select
                  className={styles.form_input}
                  style={{ backgroundColor: "#fff" }}
                  required
                  name="hasGarage"
                  onChange={handleGarageChange}
                  onClick={(e) => {
                    setHasGarage(hasGarage);
                  }}
                >
                  <option disabled defaultValue={"Select"}>
                    Select
                  </option>

                  <option value={false}>Yes</option>

                  <option value={true}>No</option>
                </select>
              </div>
            </div>
            <div className={styles.input_side_by_side}>
              <div className={styles.element}>
                <label htmlFor="bedrooms" className={styles.input_headers}>
                  Bedrooms*
                </label>
                <input
                  className={styles.form_input}
                  type="number"
                  placeholder="Enter amount"
                  min={0}
                  required
                  name="bedrooms"
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                  }}
                />
              </div>
              <div className={styles.element}>
                <label htmlFor="bathrooms" className={styles.input_headers}>
                  Bathrooms*
                </label>
                <input
                  className={styles.form_input}
                  type="number"
                  placeholder="Enter amount"
                  min={0}
                  required
                  name="bathrooms"
                  onChange={(e) => {
                    setBathrooms(e.target.value);
                  }}
                />
              </div>
            </div>
            <label htmlFor="constructionYear" className={styles.input_headers}>
              Construction Date*
            </label>
            <input
              type="text"
              className={styles.form_input}
              onFocus={(e) => {
                e.currentTarget.type = "date";
                e.currentTarget.focus();
              }}
              required
              placeholder="e.g. 1990"
              name="constructionYear"
              onChange={(e) => {
                setConstructionYear(e.target.value);
              }}
            />
            <label htmlFor="description" className={styles.input_headers}>
              Description*
            </label>
            <textarea
              className={styles.form_input}
              rows="3"
              placeholder="Enter Description"
              minLength="5"
              maxLength="80"
              required
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className={styles.button_container}>
            <button type="submit" className={styles.submit_button}>
              POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default newListing;
