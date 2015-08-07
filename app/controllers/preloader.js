var args = arguments[0] || {};

var basicBtn = Titanium.UI.createButton({
	title : "Basic",
	width : 100,
	height : 50,
	top : 10,
	left : 50,
	backgroundColor : "#fff",
	color: "#000"
});

var randomBtn = Titanium.UI.createButton({
	title : "Random",
	width : 100,
	height : 50,
	top : 80,
	left : 50,
	backgroundColor : "#fff",
	color: "#000"
});

var closeWindow = function() {
	$.preloader.close();
};

$.container.add(basicBtn);
$.container.add(randomBtn);

basicBtn.addEventListener("click", function () {
	var preloader = Alloy.createWidget("preloader", {
		delay : 200,
		dots : 3,
		color : {
			on : "#6D97B2",
			off : "#AFD2E3"
		}
	});

	preloader.start();

	setTimeout(function () {
		preloader.stop();
	}, 3000);
});

randomBtn.addEventListener("click", function () {
	var preloader = Alloy.createWidget("preloader", {
		delay : 200,
		dots : 5,
		color : {
			random : true
		},
		text : "Loading"
	});

	preloader.start();
	
	setTimeout(function () {
		preloader.setText("Fetching Data");
	}, 2000);
		
	setTimeout(function () {
		preloader.setText("Completed");
	}, 4000);

	setTimeout(function () {
		preloader.stop();
	}, 6000);
});

