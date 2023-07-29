# Traffic Light Excercise

Ian Percy 2023

Welcome to this demo!
This demo uses JS, CSS, and HTML to display an interactive traffic light to the user

## Functionality

1. If there is no active light, clicking on traffic light will turn one on at random
2. There are two modes that a user can change the light with:

- Random: A light is chosen at random
- In Order: A light is chosen in order -> green, yellow, red, repeat

3. Clicking on the Change! button will change the light according to the current mode
4. Clicking on the Change Mode button will change to the other mode - Random -> In Order and In Order -> Random
5. Clicking on the light will not change the light after the light has been acivated
6. Clicking the Change! or Change Mode buttons will have no effect if the light has not been activated yet

## Assumptions/Decisions:

1. Stored the mode and the current active color as variables so they can easily be accessed and passed around
2. Made another button for changing the mode as the UI element
3. Kept as much functionality to call the same function - handleFetchLight instead of different functions. (i.e. activating the light and choosing Change!)
4. If a light has not been clicked yet (activated), clicking the "Change!" button will not change the light.
5. Placed all the traffic light colors into the scss file in an array, \$colors, with a mapping for the styles. This allows users to add as many colors as they want and the light will adjust. You can make a long traffic light! Give it a shot. They will be added to the light in the order they exist in the list.
6. Since fetchLight is a function and not a component, the state cannot be stored but only passed. The most important parameters there are the type of mode, the list of colors, and also the current color to determine the next one to choose if "In Order".

## Styling

BEM styling for the css styles
