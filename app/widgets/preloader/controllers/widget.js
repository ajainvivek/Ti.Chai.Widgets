var args = arguments[0] || {};
var dots = args.dots;
var delay = args.delay;
var type = args.type;
var color = args.color;
var loadText = args.text || "Loading";

//Style Mapper
var _style = {
	window : $.createStyle({
		classes : [ 'window' ]
	}),
	label : $.createStyle({
		classes : [ 'label' ]
	}),
	view : $.createStyle({
		classes : [ 'view' ]
	})
};

//Components
var preloadWindow = Titanium.UI.createWindow();
preloadWindow.applyProperties(_style.window);

var preloadView = Titanium.UI.createView();
preloadView.applyProperties(_style.view);

var preloadLabel = Titanium.UI.createLabel();
preloadLabel.applyProperties(_style.label);

var open = function (callback) {
	setTimeout(function () {
		preloadWindow.open();
		callback();
	}, 0);
};

var close = function () {
	preloadWindow.close();
};

/**
 * @method getRandomColor
 * @returns {String} color
 */
var getRandomColor = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/**
 * @method loader
 * @param options
 *            {Object} { dots : Number, repeat : Number, delay : Milliseconds,
 *            spacing : DP, callback : Function }
 */
var buildLoader = function(options) {
	var options = options || {};
	var dots = options.dots || 3;
	var repeat = options.repeat || null;
	var delay = options.delay || 150;
	var spacing = options.spacing || 20;
	var size = options.size || 14;
	var callback = options.complete || function() {
	};
	var offColor = (options.color && options.color.off) || "#AFD2E3";
	var onColor = (options.color && options.color.on) || "#6D97B2";
	var isRandom = (options.color && options.color.random) || false;
	var highlight;
	var circles = [];
	var outerView = Titanium.UI.createView({
		"height" : Ti.UI.SIZE,
		"width" : Ti.UI.SIZE
	});

	var getCircle = function() {
		return Titanium.UI.createView({
			visible : false,
			height : size,
			width : size,
			top : 0,
			borderRadius : size / 2,
			backgroundColor : isRandom ? getRandomColor() : offColor
		});
	};

	for ( var i = 0; i < dots; i++) {
		var circle = getCircle();
		circle.setLeft(i * spacing);
		outerView.add(circle);
		circles.push(circle);
	}

	// Show circle in sequence
	var displayCircles = (function displayCircle(i) {
		setTimeout(function() {
			circles[dots - i].setVisible(true);
			if (--i) {
				displayCircle(i);
				if (i === 1) {
					highlightCircles(repeat);
				}
			}
		}, delay);
	}(dots));

	// Reset Circle Background
	var _resetCircleBgColor = function() {
		for ( var i = 0; i < dots; i++) {
			circles[i].setBackgroundColor(offColor);
		}
	};

	// Highlight based on repeat
	var highlightCircles = function highlightCircle(repeat) {
		var counter = dots;
		highlight = setInterval(function() {
			if (counter === 0) {
				counter = dots;
				if (repeat !== null) {
					clearInterval(highlight);
				}
				if (repeat > 1 && repeat !== null) {
					highlightCircle(repeat - 1); // Recursively
				}
				if (repeat === 1 && repeat !== null) {
					outerView.hide();
					callback(); // On finish of loading
				}
				return;
			}
			if(!isRandom) {
				_resetCircleBgColor();
			}
			circles[dots - counter].setBackgroundColor(isRandom ? getRandomColor() : onColor);
			counter--;
		}, delay);
	};
	
	var clear = function () {
		clearInterval(highlight);
	};

	return {
		content : outerView,
		clear : clear
	};

};

var loader;
exports.start = function () {
	loader = buildLoader({
		dots : dots,
		delay : delay,
		color : color,
		type : type
	});
	open(function () {
		preloadLabel.setText(loadText);
		preloadView.add(preloadLabel);
		preloadView.add(loader.content);
		preloadWindow.add(preloadView);
	});
};

exports.stop = function () {
	close(function () {
		loader.clear();
	});
};

exports.setText = function (text) {
	preloadLabel.setText(text);
};

