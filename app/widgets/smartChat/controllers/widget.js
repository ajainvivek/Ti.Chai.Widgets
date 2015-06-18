var config = Alloy.createWidget('smartChat', 'config').module;
var builder = Alloy.createWidget('smartChat', 'builder').module;
var tableView = $.messages;
var scrollView = $.heroContainer;
var inputContainer = $.inputControlContainer;

var data = {
	"1" : {
		"qsId" : "1",
		"title" : "Wnat is your gender?",
		"type" : "bubble",
		"options" : [ {
			"id" : 1,
			"value" : "male"
		}, {
			"id" : 2,
			"value" : "female",
			"nxtQsId" : "2"
		} ],
		"nextQsId" : "2",
		"help" : "Choose valid gender",
		"repeat" : 0
	},
	"2" : {
		"qsId" : "2",
		"title" : "How old are you?",
		"type" : "textfield",
		"validate" : {
			"type" : "numeric",
			"value" : {
				"min" : 1,
				"max" : 100
			},
			"length" : {
				"min" : 1,
				"max" : 3
			},
			"regEx" : ""
		},
		"help" : "Choose valid gender",
		"nextQsId" : "3",
		"repeat" : 0
	},
	"3" : {
		"qsId" : "3",
		"title" : "Graduation year?",
		"type" : "date",
		"validate" : {
			"range" : {
				"min" : "",
				"max" : ""
			},
			"format" : ""
		},
		"nextQsId" : "4",
		"repeat" : 0
	},
	"4" : {
		"qsId" : "4",
		"title" : "What are your favourite food?",
		"type" : "multi",
		"options" : [ {
			"id" : 1,
			"value" : "mexican"
		}, {
			"id" : 2,
			"value" : "italian"
		}, {
			"id" : 3,
			"value" : "indian"
		} ],
		"nextQsId" : "5",
		"repeat" : 0
	},
	"5" : {
		"qsId" : "5",
		"title" : "Are you married ?",
		"type" : "single",
		"options" : [ {
			"id" : 1,
			"value" : "yes"
		}, {
			"id" : 2,
			"value" : "no"
		} ],
		"nextQsId" : "6",
		"repeat" : 0
	},
	"6" : {
		"qsId" : "6",
		"title" : "You are done",
		"type" : "info",
		"repeat" : 0
	}
};

// Initialize Smart Chat Widget
var init = function() {
	// Initialize UI Builder Instance
	var builderInstance = builder.getInstance({
		tableView : tableView,
		inputContainer : inputContainer,
		data : data
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