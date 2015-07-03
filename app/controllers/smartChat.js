var args = arguments[0] || {};

var closeWindow = function () {
	$.smartChat.close();
};

var data = {
		"1" : {
			"id" : "1",
			"title" : "Wnat is your gender?",
			"type" : "bubble",
			"options" : [ {
				"id" : 1,
				"value" : "male"
			}, {
				"id" : 2,
				"value" : "female",
				"nextQsId" : "6"
			} ],
			"nextQsId" : "2",
			"help" : "Choose valid gender",
			"repeat" : 0
		},
		"2" : {
			"id" : "2",
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
			"id" : "3",
			"title" : "Graduation year?",
			"type" : "picker",
			"validate" : {
				"type" : "date",
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
			"id" : "4",
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
			"id" : "5",
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
			"id" : "6",
			"title" : "You are done",
			"type" : "info",
			"repeat" : 0
		}
	};

var callChatEnded = function (responseObj) {
	alert("Chat completed");
};

var smartChat = Alloy.createWidget("smartChat", {
	data: data,
	onFinish: callChatEnded
});

$.container.add(smartChat.getView());