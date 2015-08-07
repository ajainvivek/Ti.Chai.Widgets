var args = arguments[0] || {};

var onItemClick = function(e) {
	switch (e.sectionIndex) {
		case 0:
			Alloy.createController('smartChat').getView().open();
			break;
		case 1:
			Alloy.createController('randomTiles').getView().open();
			break;
		case 2:
			Alloy.createController('preloader').getView().open();
			break;
		default:
			Ti.API.error("Invalid option!!!");
			break;
	}
};