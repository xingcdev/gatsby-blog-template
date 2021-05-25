import React, { useEffect, useState } from "react";
import successIcon from "../../content/assets/success.svg";
import alertIcon from "../../content/assets/alert.svg";

const Popup = ({ isErrorPopup = false, message }) => {
    const [animation, setAnimation] = useState("moveUp");
    useEffect(function () {
        const animationDurationSeconds = 5000;
        const timer = setTimeout(
            () => setAnimation("moveDown"),
            animationDurationSeconds
        );
        // Clear setTimeout while component is unmounting to avoid the memory leak
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={"popup-box " + animation}>
            <div className="icon">
                {isErrorPopup ? (
                    <img src={alertIcon} alt="icon" />
                ) : (
                    <img src={successIcon} alt="icon" />
                )}
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Popup;
