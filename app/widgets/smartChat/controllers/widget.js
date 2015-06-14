var config = Alloy.createWidget('smartChat', 'config').module;
var builder = Alloy.createWidget('smartChat', 'builder').module;
var tableView = $.messages;
var scrollView = $.heroContainer;
var inputContainer = $.inputControlContainer;

var data = {
	"q1" : {
		"id": "q1",
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
		"id" : "q2",
		"title" : "How many children?",
		"answerType" : "numericInput",
		"isChildQuestion" : false,
		"validations" : {
			"maxValue" : 15,
			"minValue" : 0
		},
		"answerOptions" : null,
		"nextQuestionId" : "q3",
		"answerKey" : "",
		"help" : "help_q2_key"
	},
	"q3" : {
		"id" : "q3",
		"title" : "You are almost done!!!!",
		"answerType" : "none",
		"isChildQuestion" : false,
		"answerOptions" : null,
		"nextQuestionId" : "q4",
		"answerKey" : "",
		"help" : "help_q2_key"
	},
	"q4":{
		  "id" : "q4",
	      "title":"Who needs insurance?",
	      "answerType":"buttonGroup",
	      "isChildQuestion":true,
	      "answerOptions":[
	         {
	            "key":"me",
	            "label":"Me and My Family",
	            "nextDependentQuestion":"q2"
	         },
	         {
	            "key":"business",
	            "label":"A Business"
	         }
	      ],
	      "nextQuestionId":null,
	      "answerKey":"",
	      "help":"help_q1_key",
	      "validations":null
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
	
	Ti.App.addEventListener('keyboardframechanged', function (e) {
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