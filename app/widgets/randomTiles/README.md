# randomTiles - Magical tile 

randomTiles is animated tiles with search filter and delete option. It's still in Beta Version.
 
Please feel free to contribute.

![image](http://oi58.tinypic.com/1hc743.jpg?raw=true)

## Installation

## Data Structure 
```javascript
[ {
	"id" : "1",
	"image" : "images/js.png",
	"title" : "Javascript"
}, {
	"id" : "2",
	"image" : "images/appcelerator.png",
	"title" : "Appcelerator"
}, {
	"id" : "3",
	"image" : "images/js.png",
	"title" : "Javascript"
}, {
	"id" : "4",
	"image" : "images/appcelerator.png",
	"title" : "Appcelerator"
} ]
```

## Usage
```javascript
var randomTiles = Alloy.createWidget("randomTiles", {
	data : data,
	tile : {
		width : "100dp", // Default image width
		height : "100dp" // Default image height + text container height,
	},
	onClick : function(data) { //Callback on tile click
		alert("tile clicked " + data.id);
	},
	isDelete : true, // Default is false,
	isSearch : true // Default is true
});

randomTiles.setData(data); //Pass new set of data to refresh the content
```
**Properties**
* **data**: array of tile data
* **tile**: tile properties with style attributes
* **isDelete**: tile delete option
* **isSearch**: search option for tiles to filter

**Functions**
* **onClick**: on tile click trigger callback
* **setData**: reset the data

##Notes
* Any bugs please raise a ticket