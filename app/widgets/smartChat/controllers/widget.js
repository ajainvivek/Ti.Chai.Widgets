var config = Alloy.createWidget('smartChat', 'config').module;
var builder = Alloy.createWidget('smartChat', 'builder').module;
var args = arguments[0] || {};
var tableView = $.messages;
var scrollView = $.heroContainer;
var inputContainer = $.inputControlContainer;
var data = args.data;
var onFinish = args.onFinish;
console.log(args);
// Initialize Smart Chat Widget
var init = function() {
	// Initialize UI Builder Instance
	var builderInstance = builder.getInstance({
		tableView : tableView,
		inputContainer : inputContainer,
		data : data,
		onFinish : onFinish
	});
	builderInstance.renderQuestion();

	Ti.App.addEventListener('keyboardframechanged', function(e) {
		if (e.keyboardFrame.y < Ti.Platform.displayCaps.platformHeight) {
			/* Keyboard is showing up */
			scrollView.scrollTo(0, e.keyboardFrame.height);
			inputContainer.setBottom(e.keyboardFrame.height);
		} else {
			/* Keyboard is leaving the screen */
			scrollView.scrollToBottom();
			inputContainer.setBottom(0);
		}
	});
};

init();