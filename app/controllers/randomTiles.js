var args = arguments[0] || {};

var closeWindow = function() {
	$.randomTiles.close();
};

var data = [ {
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
} ];

var randomTiles = Alloy.createWidget("randomTiles", {
	data : data,
	tile : {
		width : "100dp", // Default image width
		height : "100dp" // Default image height + text container height,
	},
	onClick : function(data) {
		alert("tile clicked " + data.id);
	},
	isDelete : true, // Default is false
	isSearch : true // Deafult is true
});

$.container.add(randomTiles.getView());