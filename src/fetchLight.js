/*
  fetchLight function for the exercise
  @author Ian Percy <ianpercyor@gmail.com>

  Determines the active light and returns the color as a promise
  or the error message if an error occurred

  This takes in if the Mode is "Random" or "In Order" to determine the light
  If "Random" -> return a random index/color from the colorChoices array
  If "In Order" -> return the next appropriate index/color from the colorChoices array
  based on the currentColor index
*/
export default function fetchLight(mode, colorChoices, currentColor) {
  return new Promise((resolve, reject) => {
    try {
      let idx = -1;
      if (mode === "Random") {
        // If Random, return random index
        let currentIdx = colorChoices.indexOf(currentColor);
        idx = Math.floor(Math.random() * colorChoices.length);
        while (idx === currentIdx) {
          idx = Math.floor(Math.random() * colorChoices.length);
        }
        
      } else {
        // If In Order, then get the next appropriate index (decreasing index due
        // to green, yellow, red, repeat)
        let currentIdx = colorChoices.indexOf(currentColor);
        idx = currentIdx - 1 >= 0 ? currentIdx - 1 : colorChoices.length - 1;
      }
      currentColor = colorChoices[idx];
      // Resolve the currentColor or error if the idx doesn't exist
      if (currentColor !== undefined) {
        resolve(currentColor);
      } else {
        reject("Error choosing color");
      }
    } catch (error) {
      // General error catch, return error message and console log
      console.log("Error in fetchLight()");
      console.log(error.name, error.message, error.stack);
      reject("Can't fetchLight!");
    }
  });
}
