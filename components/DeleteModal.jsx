import React from "react";
import { useRouter } from "next/dist/client/router";
import module_style from "../styles/Modal.module.css";

function DeleteModal({ setIsOpen, houseID }) {
  const router = useRouter();

  async function deleteHome() {
    setIsOpen(false);
    var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "wrGyPvn6VagYhAqEeFOpuZ1cKdtWUm24");
 

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://api.intern.d-tt.nl/api/houses/${houseID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (router.pathname == "/") {
          window.location.reload();
        } else {
          router.push("/");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <div className={module_style.darkBG} />
      <div className={module_style.centered}>
        <div className={module_style.modal}>
          <div className={module_style.modalHeader}>
            <h5 className={module_style.heading}>Delete Listing</h5>
          </div>
          <div className={module_style.modalContent}>
            Are you sure you want to delete this listing? <br />
            This action cannot be undone.
          </div>
          <div className={module_style.modalActions}>
            <div className={module_style.actionsContainer}>
              <button className={module_style.deleteBtn} onClick={deleteHome}>
                Yes, Delete
              </button>
              <button
                className={module_style.cancelBtn}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
