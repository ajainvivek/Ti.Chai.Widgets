var args = arguments[0] || {};

var closeWindow = function () {
	$.slideFilters.close();
};

var window = (Ti.Platform.osname === "android") ? $.container : $.slideFilters;

var filterBar = Ti.UI.createView({
	height : 40,
	width : Ti.UI.FILL,
	backgroundColor : "#000",
	opacity : 0.5,
	top : 0
});
$.container.add(filterBar);

var data = [{
	title : "Multi Filter",
	type : "checkbox",
	options : [{
		id : 1,
		label : "Red"
	},{
		id : 2,
		label : "Yellow"
	},{
		id : 3,
		label : "Green"
	}]
},{
	title : "Single Filter",
	type : "radio",
	options : [{
		id : 4,
		label : "Black"
	},{
		id : 5,
		label : "Orange"
	},{
		id : 6,
		label : "Purple"
	}],	
}];

var colorArr = data[0].options.concat(data[1].options);
var viewArr = [];

var colorWrapper = Ti.UI.createView({
	layout: "vertical",
	top : 50,
	width : 60
});

_.each(colorArr, function (item) {
	var view = Ti.UI.createView({
		height : 40,
		width : 40,
		top : 10,
		backgroundColor: item.label.toLowerCase(),
		id : item.id,
		visible : false
	});
	viewArr.push(view);
	colorWrapper.add(view);
});

$.container.add(colorWrapper);

var setFilters = function (filters, viewArrr) {
	_.each(filters, function (filter) {
		_.each(viewArr, function (view) {
			if (filter.id === view.id) {
				if (filter.selected) {
					view.setVisible(true);
				} else {
					view.setVisible(false);
				}
			}
		});
	});
};

var resetViews = function () {
	_.each(viewArr, function (view) {
		view.setVisible(false);
	});
};


window.addEventListener("open", function () {
	var offsetHeight = (Ti.Platform.osname === "android") ? 40 : 40;
	var slideRightFilters = Alloy.createWidget("slideFilters", {
		wrapper : $.container,
		offset : {
			height : offsetHeight,
			top : offsetHeight
		},
		data : data,
		slide : "right",
		applyFilters : function (filters) {
			setFilters(filters, viewArr);
		}
	});

	var filterRightLabel = Ti.UI.createLabel({
		text : "Filter Right",
		right : 10,
		color : "#fff"
	});

	filterRightLabel.addEventListener("click", function () {
		resetViews();
		slideRightFilters.reset();
		colorWrapper.setRight(undefined);
		colorWrapper.setLeft(0);
		slideLeftFilters.close();
		slideRightFilters.toggle();
	});
	
	
	
	var slideLeftFilters = Alloy.createWidget("slideFilters", {
		wrapper : $.container,
		offset : {
			height : offsetHeight,
			top : offsetHeight
		},
		data : data,
		slide : "left",
		applyFilters : function (filters) {
			setFilters(filters, viewArr);
		}
	});

	var filterLeftLabel = Ti.UI.createLabel({
		text : "Filter Left",
		left : 10,
		color : "#fff"
	});
	
	filterLeftLabel.addEventListener("click", function () {
		resetViews();
		slideLeftFilters.reset();
		colorWrapper.setLeft(undefined);
		colorWrapper.setRight(0);
		slideRightFilters.close();
		slideLeftFilters.toggle();
	});
		
	
	filterBar.add(filterLeftLabel);
	filterBar.add(filterRightLabel);
});
