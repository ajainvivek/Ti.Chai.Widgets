var helper = Alloy.createWidget('smartChat', 'helper').module;
var data = Alloy.createWidget('smartChat', 'data').module;
var dataInstance = data.getInstance();

/***
 * @class: Chat UI Builder Class
 * @extends: Helper Class
 */
exports.module = (function () {
	var instance;
	var UIBuilder = function (options) {
		this.currentRow = {};
		this.tableView = options.tableView || {};
		this.inputContainer = options.inputContainer || {};
		this.data = options.data || {};
		
		//Set data
		dataInstance.setData(this.data);
	
		//Set Initial Question
		dataInstance.setCurrQuestion(this.data.q1);
	};
	
	/***
	 * @method: _buildInputControl
	 * @desc: build input control based on type
	 * @param {String} type - numeric / alpha pad
	 */
	UIBuilder.prototype._buildInputControl = function (options) {
		var self = this;
		
		var inputContainer = Ti.UI.createView();
		inputContainer.applyProperties(self._style.inputContainer);
		
		var inputField = Ti.UI.createTextField();
		inputField.applyProperties(self._style.inputField);
		
		var answerButton = Ti.UI.createButton();
		answerButton.applyProperties(self._style.answerButton);
		
		var infoButton = Ti.UI.createButton();
		infoButton.applyProperties(self._style.infoButton);
		
		//On submit of answer
		answerButton.addEventListener("click", function () {
			var value = inputField.getValue();
			options.success(value);
		});
		
		//On textfield change show/hide btn's
		inputField.addEventListener("change", function (e) {
			var value = e.source.getValue();
			if (value.length > 0) {
				infoButton.setVisible(false);
				answerButton.setVisible(true);
			} else {
				infoButton.setVisible(true);
				answerButton.setVisible(false);
			}	
		});
		
		inputContainer.add(inputField);
		inputContainer.add(answerButton);
		inputContainer.add(infoButton);
		
		return inputContainer;
	};
	
	/***
	 * @method _buildMessageRow
	 * @desc Build Message Row
	 */
	UIBuilder.prototype._buildMessageRow = function (options) {
		var self = this;
		var row = Ti.UI.createTableViewRow();
		row.applyProperties(self._style.tableViewRow);
		
		var outerBubble = Ti.UI.createView();
		outerBubble.applyProperties(self._style.outerBubble);
		
		var bubble = Ti.UI.createView();
		bubble.applyProperties(self._style["bubble" + options.type]); 
		bubble.addEventListener("click", function () {
			self.triggerAnswerControl(options.msg);
		});

		var label = Ti.UI.createLabel({
			text: options.msg
		});
		label.applyProperties(self._style["label" + options.type]);

		bubble.add(label);
		outerBubble.add(bubble);
		row.add(outerBubble);
		
		return row;
	};
	
	/***
	 * @method _style
	 * @desc contains style for each elements
	 */
	UIBuilder.prototype._style = {
		tableViewRow : $.createStyle({ classes: ['messageRow'] }),
		outerBubble : $.createStyle({ classes: ['outerBubble'] }),
		bubbleBot : $.createStyle({ classes: ['bubble', 'bubbleBot'] }),
		bubbleUser : $.createStyle({ classes: ['bubble', 'bubbleUser'] }),
		labelBot : $.createStyle({ classes: ['message', 'messageBot'] }),
		labelUser : $.createStyle({ classes: ['message', 'messageUser'] }),
		inputContainer : $.createStyle({ classes: ['inputContainer'] }),
		inputField : $.createStyle({ classes: ['inputField'] }),
		answerButton : $.createStyle({ classes: ['buttonAnswer'] }),
		infoButton : $.createStyle({ classes: ['buttonInfo'] })
	};
	
	/***
	 * @method scrollToRow
	 * @desc scroll to specific row position
	 * @param {String} id - question id
	 */
	UIBuilder.prototype.scrollToRow = function (id) {
		
	};
	
	/***
	 * @method _updateMessages
	 * @desc Update all the consecutive messages
	 */
	UIBuilder.prototype._updateMessages = function () {
		
	};
	
	/***
	 * @method renderQuestion
	 * @desc Renders the message on ui based on type bot/user
	 */
	UIBuilder.prototype.renderQuestion = function () {
		var self = this;
		var currQs = dataInstance.getCurrQuestion();
		var qs = this._buildMessageRow({
			msg : currQs.title,
			type : "Bot"
		});
		setTimeout(function () {
			self.tableView.appendRow(qs);
			self.triggerAnswerControl(currQs);
		}, 1000);
	};
	
	/***
	 * @method renderAnswer
	 * @desc Renders the message on ui based on type bot/user
	 */
	UIBuilder.prototype.renderAnswer = function (obj) {
		var answer = this._buildMessageRow({
			msg : obj.text,
			type : "User"
		});
		this.tableView.appendRow(answer);
		if (obj.qsId !== null) {
			dataInstance.update(obj.qsId);
			this.renderQuestion();
		} else {
			alert("get summary details");
		}
		
	};
	
	/***
	 * @method renderAllMessages
	 * @desc Renders all the messages in the chatter box
	 */
	UIBuilder.prototype.renderAllMessages = function () {
		
	};
	
	/***
	 * @method triggerAnswerControl
	 * @desc Triggers the answer control based on the type of question
	 */
	UIBuilder.prototype.triggerAnswerControl = function (currQs) {
		var self = this;
		var inputControl = this._buildInputControl({
			type: "numeric",
			success: function (val) {
				self.renderAnswer({
					text: val,
					qsId: currQs.nextQuestionId
				});
			},
			validate: function (val) {
				return true;
			}
		});
		this.inputContainer.add(inputControl);	
	};
	
	//Add event listener for answer reply to trigger next question
	Ti.App.addEventListener('answer', function(e) { 
	     Ti.API.log("Answered");
	});
	
	//Create Singleton Instance
	var createInstance = function (options) {
		var uiBuilder = new UIBuilder(options);
		return uiBuilder;
	};
	
	//Destroy Instance
	var destroyInstance = function () {
		delete instance;
	};
	
	return {
		getInstance : function (options) {
            if (!instance) {
                instance = createInstance(options);
            }
            return instance;
        },
		destroyInstance : destroyInstance 
	};
}());

