var args = arguments[0];
var scrollView = $.heroContainer;
var data = args.data;
var onClick = args.onClick || function () {};
var isDelete = args.isDelete || false;

/**
 * class: randomTiles
 */
var randomTiles = (function() {

	// _getStyles
	var _getStyle = function() {
		var style = {
			tile : $.createStyle({
				classes : [ 'tile' ]
			}),
			image : $.createStyle({
				classes : [ 'image' ]
			}),
			textContainer : $.createStyle({
				classes : [ 'text-container' ]
			}),
			title : $.createStyle({
				classes : [ 'text' ]
			}),
			close : $.createStyle({
				classes : [ 'close' ]
			})
		};
		return style;
	};

	// _calcOffset
	var _calcOffset = function(tile) {
		var wContainer = scrollView.toImage().width;
		var index = 0;
		var wTile = tile.toImage().width;
		var cWidth = 0;

		// check until computed width is greater
		while (cWidth < wContainer) {
			index++;
			cWidth = wTile * index;
		}

		var offset = (wContainer - (wTile * (index - 1))) / ((index - 1) * 2);
		return offset;
	};
	
	// _applyAnimation
	var _applyAnimation = function(tile) {
		
	};

	// _getTile
	var _getTile = function(data) {
		var style = _getStyle();

		var tile = Ti.UI.createView();
		tile.applyProperties(style["tile"]);
		
		var close = Ti.UI.createButton();
		close.applyProperties(style["close"]);
		
		var image = Ti.UI.createImageView({
			image : data.image
		});
		image.applyProperties(style["image"]);

		var textContainer = Ti.UI.createView();
		textContainer.applyProperties(style["textContainer"]);

		var title = Ti.UI.createLabel({
			text : data.title
		});
		title.applyProperties(style["title"]);

		// offset left/rigth
		var offset = _calcOffset(tile);

		tile.setLeft(offset);
		tile.setRight(offset);

		textContainer.add(title);
		tile.add(close);
		tile.add(image);
		tile.add(textContainer);
		
		//delete event listener
		close.addEventListener("click", function (e) {
			if (e.source.id === "close") {
				tile.animate({ 
			        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT, 
			        opacity: 0, 
			        duration: 800
			    }, function () {
			    	scrollView.remove(tile);
			    });
			}
		});
		
		//tile on click event listener
		tile.addEventListener("click", function (e) {
			if (e.source.id === "tile") {
				onClick(data);
			}
		});
		
		//show animation
		var showAnimation = Titanium.UI.createAnimation({
		    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
		    opacity: 1,
		    duration: 800
		});
		
		tile.animate(showAnimation);

		return tile;
	};

	// _buildTiles
	var _buildTiles = function() {
		_.each(data, function(item) {
			var tile = _getTile(item);
			scrollView.add(tile);
		});
	};

	// setData
	var setData = function(collection) {

	};

	// Initialize method
	var init = function() {
		_buildTiles();
	};

	return {
		init : init,
		setData : setData
	};

}());

// Initialize the widget
randomTiles.init();

exports.setData = randomTiles.setData;