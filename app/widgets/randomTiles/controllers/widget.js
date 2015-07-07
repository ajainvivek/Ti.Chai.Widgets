var args = arguments[0];
var scrollView = $.heroContainer;
var data = args.data;
var onClick = args.onClick || function() {
};
var isDelete = args.isDelete || false;
var isSearch = args.isSearch || true;

/**
 * class: randomTiles
 */
var randomTiles = (function() {
	var tiles = [];
	var tmpData = _.clone(data);

	/***************************************************************************
	 * @method _getStyle
	 * @desc Provides map of styles
	 * @return {Object} map of styles
	 */
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
			}),
			search : $.createStyle({
				classed : [ 'searchbar' ]
			})
		};
		return style;
	};

	/***************************************************************************
	 * @method _calcOffset
	 * @desc Calculates the offset position
	 * @return {Numeric} offset value btw tiles
	 */
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

	/***************************************************************************
	 * @method _getTile
	 * @desc Build the tile with title and image
	 * @return {Object} tile view
	 */
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

		tiles.push(tile);

		// delete event listener
		close.addEventListener("click", function(e) {
			var selectedIndex = _.indexOf(tiles, tile);
			if (e.source.id === "close") {
				tile.animate({
					curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
					opacity : 0,
					duration : 80
				}, function() {
					tmpData.splice(selectedIndex, 1); // Remove from data
					if (tmpData.length === selectedIndex) {
						scrollView.remove(tile);
					} else {
						setData(tmpData);
					}
				});
			}
		});

		// tile on click event listener
		tile.addEventListener("click", function(e) {
			if (e.source.id === "tile") {
				onClick(data);
			}
		});

		// show animation
		var showAnimation = Titanium.UI.createAnimation({
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			opacity : 1,
			duration : 800
		});

		tile.animate(showAnimation);

		return tile;
	};

	/***************************************************************************
	 * @method _search
	 * @desc Bind search event and add search bar
	 */
	var _search = function() {
		var search = Ti.UI.createSearchBar({
			hintText : "Search"
		});
		var style = _getStyle();
		search.applyProperties(style["search"]);
		search.addEventListener("change", function(e) {
			var filter = _.filter(tmpData, function(data) {
				var title = data.title.toLowerCase();
				var isMatched = (title.match(e.value) !== null) ? true : false;
				return isMatched;
			});
			setData(filter);
		});
		scrollView.add(search);
	};

	/***************************************************************************
	 * @method _buildTiles
	 * @desc Builds the tile layout
	 * @param data 
	 */
	var _buildTiles = function(data) {
		_.each(data, function(item) {
			var tile = _getTile(item);
			scrollView.add(tile);
		});
	};

	/***************************************************************************
	 * @method setData
	 * @desc refresh the ui tiles with data
	 * @data data
	 */
	var setData = function(data) {
		// Reset UI & Tiles array
		_.each(tiles, function(tile) {
			scrollView.remove(tile);
		});
		tiles = [];

		// Reset UI
		_buildTiles(data);
	};

	// Initialize method
	var init = function() {
		if (isSearch) { // If search then inject
			_search();
		}
		_buildTiles(tmpData);
	};

	return {
		init : init,
		setData : setData
	};

}());

// Initialize the widget
randomTiles.init();

exports.setData = randomTiles.setData;