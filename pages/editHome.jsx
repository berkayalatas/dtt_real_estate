import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/New_Listing.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import delete_img from "../public/images/ic_clear_white.png";
import axios from "axios";

function editHome({ data }) {
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

  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState(null);
  const [numberAddition, setNumberAddition] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [img, setImg] = useState(theHouse?.image);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState(null);
  const [hasGarage, setHasGarage] = useState(true);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [constructionYear, setConstructionYear] = useState("");
  const [description, setDescription] = useState("");

  const handleImg = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleGarageChange = (event) => {
    setHasGarage(event.target.value);
    console.log(hasGarage);
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
      <div>
        <div className={styles.header_container}>
          <h2 className={styles.new_listing_header}>Edit listing</h2>
        </div>

        <div
          className={styles.back_btn}
          onClick={() => {
            router.push({
              pathname: "/housePage",
              query: {
                id: id,
              },
            });
          }}
        ></div>
      </div>
      <form onSubmit={onSubmitForm}>
        <div className={styles.form_container}>
          <label className={styles.input_headers}>Street Name*</label>
          <input
            type="text"
            placeholder="Enter the street name"
            className={styles.form_input}
            required
            defaultValue={
              theHouse.location["street"] ? theHouse.location["street"] : null
            }
            name="streetName"
            minLength="3"
            maxLength="25"
            onChange={(e) => {
              setStreetName(e.target.value);
            }}
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
                name="houseNumber"
                defaultValue={
                  theHouse.location["street"]
                    ? theHouse.location["street"].match(/\d/g).join("")
                    : null
                }
                onChange={(e) => {
                  setHouseNumber(e.target.value);
                }}
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
                name="numberAddition"
                onChange={(e) => {
                  setNumberAddition(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.input_headers}>Postal Code*</div>
          <input
            className={styles.form_input}
            placeholder="e.g. 1000 AA"
            type="text"
            required
            name="zip"
            defaultValue={
              theHouse.location["zip"] ? theHouse.location["zip"] : null
            }
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
          <div className={styles.input_headers}>City*</div>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Utrecht"
            minLength="2"
            maxLength="20"
            required
            defaultValue={
              theHouse.location["city"] ? theHouse.location["city"] : null
            }
            name="city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
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

          <div className={styles.input_headers}>Price*</div>
          <input
            type="number"
            placeholder="e.g €150.000"
            className={styles.form_input}
            required
            min={3}
            defaultValue={theHouse.price ? theHouse.price : null}
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
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
                defaultValue={theHouse.size}
                name="size"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
            <div className={styles.element}>
              <div className={styles.input_headers}>Garage*</div>
              <select
                className={styles.form_input}
                style={{ backgroundColor: "#fff" }}
                required
                name="hasGarage"
                onChange={handleGarageChange}
                defaultValue={theHouse.hasGarage ? theHouse.hasGarage : null}
              >
                <option disabled>Select</option>

                <option value={theHouse.hasGarage}>
                  {theHouse.hasGarage === true ? "Yes" : "No"}
                </option>

                <option value={!theHouse.hasGarage}>
                  {theHouse.hasGarage === false ? "Yes" : "No"}
                </option>
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
                defaultValue={
                  theHouse.rooms["bedrooms"] ? theHouse.rooms["bedrooms"] : null
                }
                name="bedrooms"
                onChange={(e) => {
                  setBedrooms(e.target.value);
                }}
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
                defaultValue={
                  theHouse.rooms["bathrooms"]
                    ? theHouse.rooms["bathrooms"]
                    : null
                }
                name="bathrooms"
                onChange={(e) => {
                  setBathrooms(e.target.value);
                }}
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
            required
            placeholder="e.g. 1990"
            name="constructionYear"
            defaultValue={
              theHouse.constructionYear ? theHouse.constructionYear : null
            }
            onChange={(e) => {
              setConstructionYear(e.target.value);
            }}
          />
          <div className={styles.input_headers}>Description*</div>
          <textarea
            className={styles.form_input}
            rows="3"
            placeholder="Enter Description"
            minLength="5"
            maxLength="80"
            required
            defaultValue={theHouse.description ? theHouse.description : null}
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}

export default editHome;

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
