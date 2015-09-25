var config = Alloy.createWidget('smartChat', 'config').module;
var builder = Alloy.createWidget('smartChat', 'builder').module;
var args = arguments[0] || {};
var tableView = $.messages;
var scrollView = $.heroContainer;
var inputContainer = $.inputControlContainer;
var data = args.data;
var onFinish = args.onFinish;
var initialQs = args.initialQs;
var delay = args.delay;

// Initialize Smart Chat Widget
var init = function() {
	// Initialize UI Builder Instance
	var builderInstance = builder.getInstance({
		tableView : tableView,
		inputContainer : inputContainer,
		data : data,
		onFinish : onFinish,
		initialQs : initialQs,
		delay : delay
	});
	builderInstance.renderQuestion();

	Ti.App.addEventListener('keyboardframechanged', function(e) {
		if (e.keyboardFrame.y < Ti.Platform.displayCaps.platformHeight) {
			/* Keyboard is showing up */
			inputContainer.setBottom(e.keyboardFrame.height);
		} else {
			/* Keyboard is leaving the screen */
			inputContainer.setBottom(0);
		}
	});
};

init();