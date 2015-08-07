# preloader - Progress indicator
Preloader is loading indicator with highly configurable options.

Please feel free to contribute.

![image](http://oi61.tinypic.com/mim2gw.jpg?raw=true)

## Installation

## Usage
```javascript
var preloader = Alloy.createWidget("preloader", {
    delay : 200, //milliseconds delay || default 100
	dots : 3, //Number of dots to display || default 3
	color : {
		on : "#6D97B2", // Switch color
		off : "#AFD2E3",
		random : false // Default false || if true then random color 
	},
	text : "Loading" // Default text loading
});
```
**Properties**
* **delay**: delay animate in milleseconds
* **dots**: Number dots to appear for loading
* **delay**: delay for each question to appear
* **color**: dots color on/off/random
* **text**: loading text    

**Functions**
* **start**: start preloader
* **stop**: stop preloader
* **setText**: change/set loading text

**Features**
* No images
* Highly configurable
* Resolution independent
* Works in android/ios

##Notes
* Any bugs please raise a ticket