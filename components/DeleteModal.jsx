import React from "react";
import { useRouter } from "next/dist/client/router";
import module_style from "../styles/Modal.module.css"

function DeleteModal({setIsOpen}) {
    const router = useRouter();

  return (
    <div>
      <div>
        <div className={module_style.darkBG} onClick={() => setIsOpen(false)} />
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
                <button
                  className={module_style.deleteBtn}
                  onClick={() => setIsOpen(false)}
                >
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
    </div>
  );
}

export default DeleteModal;
