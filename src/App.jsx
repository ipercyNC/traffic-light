/*
  Main component for the traffic light exercise
  @author Ian Percy <ianpercyor@gmail.com>

  Renders the traffic light and handles calls for fetching the current light

  Styles/colors of the lights are defined in styles.module.scss

  This demo allows users to click on the light or the buttons to change
  the color of the light. Two modes of changing the light exist -
  1) Random -> red, green, yellow, yellow, etc
  2) In Order -> green, yellow, red, repeat
*/
import React, { useState } from "react";
import styles from "./styles.module.scss";
import fetchLight from "./fetchLight";

export default function App() {
  // Store the current selected mode and current color
  const [mode, setMode] = useState("Random");
  const [currentColor, setCurrentColor] = useState(undefined);
  const [shapeArray, setShapeArray] = useState(["Circle", "Triangle"])
  const [shape, setShape] = useState(shapeArray[0] || "Circle")

  // Create an array of the color choices from the exported
  // color list of the .scss file. String replace won't work on the input
  // variable of the styles.colors, must store an in-scope copy
  let colorCopy = styles.colors;
  const colorChoices = colorCopy.replace(/ /g, "").split(",");

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
      fetchLight(mode, colorChoices, currentColor)
        .then((result) => {
          // If success, set the new currentColor
          console.log("Light: " + result);
          setCurrentColor(result);
        })
        .catch((err) => window.alert("Error!\n" + err)); // If error, display alert
    }
  }

  /**
   * Handle changing the mode of light change
   * This cannot be called if the light has not been activated yet
   */
  function handleModeChange() {
    // If light has been activated (i.e. there is an currentColor)
    // then the mode can be changed
    if (currentColor) {
      setMode(mode === "Random" ? "In Order" : "Random");
    }
  }

  /**
 * Handle changing the shape of traffic lights
 */
  function handleShapeChange(e) {
    // Set the new shape choice
    setShape(e.target.value);

  }

  return (
    <div>
      <div className={`${styles.Rectangle}`}>
        <div onClick={() => handleFetchLight(true)}>
          {colorChoices.map((d, i) => {
            let shapeString = ''
            let blankString = ''
            let colorString = ''
            let localShape = shape
            if (shape === 'Random') {
              localShape = shapeArray[Math.floor(Math.random() * shapeArray.length)]
            }
            shapeString = styles[`${localShape}`]
            blankString = styles[`${localShape}_blank`]
            colorString = styles[`${localShape}_${d}`]

            if (d === currentColor) {
              return (
                <div
                  key={d}
                  className={`${shapeString} ${colorString}`}
                />
              );
            } else {
              return (
                <div
                  key={d}
                  className={`${shapeString} ${blankString}`}
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
      <div>
        <div className={`${styles.Mode} ${styles.Mode_label}`}>Mode:</div>
        <div className={`${styles.Mode} ${styles.Mode_value}`}>{mode}</div>
      </div>
      <button
        className={`${styles.Button} ${styles.Button_mode}`}
        onClick={() => handleModeChange()}
      >
        Change Mode
      </button>
      <br />
      <div>
        <div className={`${styles.Shape} ${styles.Shape_label}`}>
          Select Shape
        </div>
        <select className={`${styles.Shape} ${styles.Shape_value}`}
          onChange={(e) => handleShapeChange(e)}>
          {shapeArray.map((s) => {
            return <option key={s} className={`${styles.Shape} ${styles.Shape_value}`} value={s}>{s}</option>
          })}
          <option key="Random" className={`${styles.Shape} ${styles.Shape_value}`} value="Random">Random</option>
        </select>
      </div>
    </div>
  );
}
