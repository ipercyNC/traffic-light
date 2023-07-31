import React, { useState } from "react";
import styles from "./styles.module.scss";
import fetchLight from "./fetchLight";

export default function Light(props) {
    const [currentColor, setCurrentColor] = useState(undefined);
    /**
   * Fetches the active light from the fetchLight function.
   * The mode, colorChoices array, and the currentColor are passed to the function
   * to determine the next color choice
   *
   * Activating the light can only happen once from clicking the traffic light
   *
   * @param activate param to activate the light or not
   */
    function handleFetchLight(activate = false) {
        // If being called from clicking the light -> activate will be set to true
        // Only want to call fetch in two situations:
        // 1) Traffic light is attempting to be activated and there is no current color
        // 2) Traffic light is not attempting to be activated and there is a current color
        if ((activate && !currentColor) || (!activate && currentColor)) {
            fetchLight(props.mode, props.colorChoices, currentColor)
                .then((result) => {
                    // If success, set the new currentColor
                    console.log("Light: " + result);
                    setCurrentColor(result);
                })
                .catch((err) => window.alert("Error!\n" + err)); // If error, display alert
        }
    }

    return (
        <div>
            <div className={`${styles.Rectangle}`}>
                <div onClick={() => handleFetchLight(true)}>
                    {props.colorChoices.map((d, i) => {
                        if (d === currentColor) {
                            return (
                                <div
                                    key={d}
                                    className={`${styles.Circle} ${styles[`Circle_${d}`]}`}
                                />
                            );
                        } else {
                            return (
                                <div
                                    key={d}
                                    className={`${styles.Circle} ${styles.Circle_blank}`}
                                />
                            );
                        }
                    })}
                </div>
            </div>
            <button
                className={`${styles.Button} ${styles.Button_change}`}
                onClick={() => handleFetchLight()}
            >
                Change!
            </button>
        </div>
    );
}