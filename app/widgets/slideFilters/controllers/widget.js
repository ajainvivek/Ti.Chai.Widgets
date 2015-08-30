var args = arguments[0];
var options = args;
var wrapper = args.wrapper;


/**
 * class: slideFilters
 */
var slideFilters = (function() {
	
	var view;
	var filterWrapper;
	var filterHolder;
	var height = wrapper.size.height;
	var width = wrapper.size.width;
	var offsetHeight = options.offset && options.offset.height ? options.offset.height : 0;
	var offsetTop = options.offset && options.offset.top ? options.offset.top : 0;
	var isOpen = false;
	var slide = options.slide ? options.slide : "left";
	var applyFilters = options.applyFilters || function () {};
	var filterImgs = [];
	var filterItems = [];
	
	/***************************************************************************
	 * @method _getStyle
	 * @desc Provides map of stylesv
	 * @return {Object} map of styles
	 */
	var _getStyle = function() {
		var style = {
			overlayContainer : $.createStyle({
				classes : [ 'overlayContainer' ]
			}),
			header : $.createStyle({
				classes : [ 'header' ]
			}),
			item : $.createStyle({
				classes : [ 'item' ]
			}),
			border : $.createStyle({
				classes : [ 'border' ]
			})
		};
		return style;
	};
	
	/***************************************************************************
	 * @method _slideAnimate
	 * @desc slide animation
	 * @param options {Object} 
	 */
	var _slideAnimate = function (options) {
		var animate; 
		if (slide === "left") {
			animate = Ti.UI.createAnimation({
				left : isOpen ? -width : 0,
				duration : 300
			});
		} else {
			animate = Ti.UI.createAnimation({
				right : isOpen ? -width : 0,
				duration : 300
			});
		}
		
		return animate;
	};
	
	/***************************************************************************
	 * @method toggle
	 * @desc Toggle animge
	 */
	var toggle = function () {
		var slide = _slideAnimate();
		view.animate(slide);
		isOpen = isOpen ? false : true;
	};
	
	/***************************************************************************
	 * @method toggle
	 * @desc Toggle animge
	 */
	var open = function () {
		var slide = _slideAnimate();
		if (isOpen === false) {
			view.animate(slide);
			isOpen = true;
		}
	};
	
	/***************************************************************************
	 * @method toggle
	 * @desc Toggle animge
	 */
	var close = function () {
		var slide = _slideAnimate();
		if (isOpen === true) {
			view.animate(slide);
			isOpen = false;
		}
	};
	
	/***************************************************************************
	 * @method reset
	 * @desc reset options to default state
	 */
	var reset = function () {
		_.each(filterItems, function (item) {
			item.selected = false;
		});
		_.each(filterImgs, function (img) {
			img.setImage(WPATH("unchecked.png"));
		});
	};
	
	/***************************************************************************
	 * @method _getcheckbox
	 * @desc checkbox container
	 */
	var _getCheckbox = function (title, options) {
		var style = _getStyle();
		var view = Ti.UI.createView({
			layout : "vertical",
			right : 0,
			height: Ti.UI.SIZE
		});
		
		var header = Ti.UI.createView();
		header.applyProperties(style.header);
		var headerLabel = Ti.UI.createLabel({
			text : title
 		});
		header.add(headerLabel);
		view.add(header);
		var filters = [];
		
		_.each(options, function (item) {
			var checkView = Ti.UI.createView();
			checkView.applyProperties(style.item);
			
			var checkLabel = Ti.UI.createLabel({
				text : item.label,
				left : 10,
				color : "#000"
			});
			
			var checkImage = Ti.UI.createImageView({
				image : WPATH("unchecked.png"),
				right : 10,
				height : 32,
				width : 32
			});
			
			var checkBorder = Ti.UI.createView();
			checkBorder.applyProperties(style.border);
			
			checkView.addEventListener("click", function (e) {
				item.selected = item.selected ? false : true;
				
				if (item.selected) {
					checkImage.setImage(WPATH("checked.png"));
				} else {
					checkImage.setImage(WPATH("unchecked.png"));
				}
				
				var freshData = _.map(filters, function (filter) {
					if (filter.id === item.id) {
						filter = item;
					}
					return filter;
				});
				applyFilters(freshData, "multi");
			});
			
			checkView.addEventListener("touchstart", function (e) {
				e.source.setBackgroundColor("#EFEFEF");
			});
			
			checkView.addEventListener("touchend", function (e) {
				e.source.setBackgroundColor("#FFF");
			});
			
			item.selected = false;
			filters.push(item);
			filterImgs.push(checkImage);
			filterItems.push(item);
			checkView.add(checkLabel);
			checkView.add(checkImage);
			view.add(checkBorder);
			view.add(checkView);
		});
		
		return view;
	};
	
	/***************************************************************************
	 * @method _getRadio
	 * @desc radio container
	 */
	var _getRadio = function (title, options) {
		var style = _getStyle();
		var view = Ti.UI.createView({
			layout : "vertical",
			right : 0,
			height: Ti.UI.SIZE
		});
		var header = Ti.UI.createView();
		header.applyProperties(style.header);
		var headerLabel = Ti.UI.createLabel({
			text : title
 		});
		header.add(headerLabel);
		view.add(header);
		
		var filters = [];
		var images = [];
		
		var _resetBg = function (arr) {
			_.each(arr, function (img) {
				img.setImage(WPATH("unchecked.png"));
			});
		};
		
		var _resetFilters = function (arr) {
			_.each(arr, function (item) {
				item.selected = false;
			});
		};
		
		_.each(options, function (item) {
			var radioView = Ti.UI.createView();
			radioView.applyProperties(style.item);
			
			var radioLabel = Ti.UI.createLabel({
				text : item.label,
				left : 10,
				color : "#000"
			});
			
			var radioImage = Ti.UI.createImageView({
				image : WPATH("unchecked.png"),
				right : 10,
				height : 32,
				width : 32
			});
			
			var radioBorder = Ti.UI.createView();
			radioBorder.applyProperties(style.border);
			
			radioView.addEventListener("click", function (e) {
				_resetFilters(filters);
				item.selected = item.selected ? false : true;
				
				if (item.selected) {
					_resetBg(images);
					radioImage.setImage(WPATH("selected.png"));
				}
				
				applyFilters(filters, "single");
			});
			
			radioView.addEventListener("touchstart", function (e) {
				e.source.setBackgroundColor("#EFEFEF");
			});
			
			radioView.addEventListener("touchend", function (e) {
				e.source.setBackgroundColor("#FFF");
			});
			
			
			radioView.add(radioLabel);
			radioView.add(radioImage);
			view.add(radioBorder);
			view.add(radioView);
			filters.push(item);
			images.push(radioImage);
			filterImgs.push(radioImage);
			filterItems.push(item);
		});
		
		return view;
	};

	/***************************************************************************
	 * @method _buildContainer
	 * @desc Build the slide container layer
	 */
	var _buildContainer = function(options) {
		var style = _getStyle();
		
		
		view = Ti.UI.createView({
			height : height - offsetHeight,
			width  : width,
			left : (slide === "left") ? -width : undefined,
			right : (slide === "right") ? -width : undefined,
			top : offsetTop,
			zIndex : 999,
			layout : "vertical"
		});
		view.applyProperties(style.overlayContainer);
		
		filterWrapper = Ti.UI.createScrollView({
			height : Ti.UI.FILL,
			width  : width / 1.5,
			left : (slide === "left") ? 0 : undefined,
			right : (slide === "right") ? 0 : undefined,
			backgroundColor : "#fff"
			
		});
		
		filterHolder = Ti.UI.createView({
			top : 0,
			height : Ti.UI.SIZE,
			width  : width / 1.5,
			layout : "vertical",
			backgroundColor : "#fff"
		});
		
		view.addEventListener("swipe", function (e) {
			if (e.direction === slide) {
				close();
			}
		});
		
		_.each(options.data, function (item) {
			switch(item.type) {
				case "checkbox": 
					var checkbox = _getCheckbox(item.title, item.options);
					filterHolder.add(checkbox);
					break;
				case "radio": 
					var radio = _getRadio(item.title, item.options);
					filterHolder.add(radio);
					break;
				default:
					break;
			}
		});
		
		filterWrapper.add(filterHolder);
		view.add(filterWrapper);
		wrapper.add(view);
	};

	// Initialize method
	var init = function(options) {
		_buildContainer(options);
	};

	return {
		init : init,
		toggle : toggle,
		open : open,
		close : close,
		reset : reset
	};

}());

// Initialize the widget
slideFilters.init(options);

exports.toggle = slideFilters.toggle;
exports.open = slideFilters.open;
exports.close = slideFilters.close;
exports.reset = slideFilters.reset;