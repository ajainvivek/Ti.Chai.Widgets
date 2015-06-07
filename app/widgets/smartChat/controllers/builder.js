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
		this.isCompleted = false;
		
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

		var label = Ti.UI.createLabel({
			text: options.msg
		});
		label.applyProperties(self._style["label" + options.type]);
		
		if (options.type === "User") {
			//Add event on bubble click for inline edit
			bubble.addEventListener("click", function (e) {
				var qs = dataInstance.getData()[options.id];
				bubble.setBorderWidth("1dp");
				bubble.setBorderColor("green");
				self.triggerAnswerControl(qs, {
					label : label,
					bubble : bubble
				});
			});
		}
		

		bubble.add(label);
		outerBubble.add(bubble);
		row.add(outerBubble);
		
		return row;
	};
	
	/***
	 * @method _spinnerAnimate
	 * @desc Animate the spinner 
	 */
	UIBuilder.prototype._spinnerAnimate = function (loader) {
		loader.image = WPATH("spinner/frame_" + this.loaderIndex + ".png");
		this.loaderIndex++;
		if (this.loaderIndex === 23) {
			this.loaderIndex = 0;
		}
	};
	
	/***
	 * @method _buildSpinnerRow
	 * @desc Build Spinner Row
	 */
	UIBuilder.prototype._buildSpinnerRow = function (options) {
		var self = this;
		var row = Ti.UI.createTableViewRow();
		row.applyProperties(self._style.tableViewRow);
		
		var outerBubble = Ti.UI.createView();
		outerBubble.applyProperties(self._style.outerBubble);
		
		var spinner = Ti.UI.createImageView();
		spinner.applyProperties(self._style["bubbleSpinner"]); 	 
		
		//Animate the gif
		this.loaderIndex = 0;
		var loaderAnimate = setInterval(function () {
			self._spinnerAnimate(spinner);
		}, 80);
		
		//Clear Interval
		setTimeout(function () {
			clearInterval(loaderAnimate);
		}, 2000); 		
		
		outerBubble.add(spinner);
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
		bubbleSpinner : $.createStyle({ classes: ['bubbleSpinner'] }),
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
		var spinner = this._buildSpinnerRow();
		var qs = this._buildMessageRow({
			msg : currQs.title,
			type : "Bot",
			id: currQs.id
		});
		this.tableView.appendRow(spinner);
		setTimeout(function () {
			self.tableView.deleteRow(spinner);
			self.tableView.appendRow(qs);
			self.triggerAnswerControl(currQs);
		}, 2000);
	};
	
	/***
	 * @method renderAnswer
	 * @desc Renders the message on ui based on type bot/user
	 */
	UIBuilder.prototype.renderAnswer = function (obj) {
		var currQs = dataInstance.getCurrQuestion();
		
		//if src is provided do inline edit
		if (obj.src) {
			obj.src.label.setText(obj.text);
			obj.src.bubble.setBorderWidth("0dp");
			obj.src.bubble.setBorderColor("transparent");
			this.inputContainer.removeAllChildren();
			if (!this.isCompleted) { //Check if all qs are asked
				this.triggerAnswerControl(currQs);
			}
			return;
		}
		
		var answer = this._buildMessageRow({
			msg : obj.text,
			type : "User",
			id : currQs.id
		});
		this.tableView.appendRow(answer);
		
		if (obj.qsId !== null) {
			dataInstance.update(obj.qsId);
			this.renderQuestion();
		} else {
			this.inputContainer.removeAllChildren();
			this.isCompleted = true;
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
	UIBuilder.prototype.triggerAnswerControl = function (currQs, src) {
		var self = this;
		var inputControl = this._buildInputControl({
			type: "numeric",
			success: function (val) {
				self.renderAnswer({
					text: val,
					qsId: currQs.nextQuestionId,
					src: src
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

