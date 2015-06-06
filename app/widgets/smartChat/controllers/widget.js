var config = Alloy.createWidget('smartChat', 'config').module;
var builder = Alloy.createWidget('smartChat', 'builder').module;
var tableView = $.messages;
var inputContainer = $.inputControlContainer;

var data = {
	"q1" : {
		"title" : "How Many People Live in your hosuehold",
		"answerType" : "numericInput",
		"isChildQuestion" : false,
		"validations" : {
			"maxValue" : 15,
			"minValue" : 0
		},
		"answerOptions" : null,
		"nextQuestionId" : "q2",
		"answerKey" : "",
		"help" : "help_q2_key"
	},
	"q2" : {
		"title" : "How Many childs?",
		"answerType" : "numericInput",
		"isChildQuestion" : false,
		"validations" : {
			"maxValue" : 15,
			"minValue" : 0
		},
		"answerOptions" : null,
		"nextQuestionId" : null,
		"answerKey" : "",
		"help" : "help_q2_key"
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
};

init();