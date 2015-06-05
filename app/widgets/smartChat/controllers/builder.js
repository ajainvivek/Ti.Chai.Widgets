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
	};
	
	/***
	 * @method _buildMessageRow
	 * @desc Build Message Row
	 */
	UIBuilder.prototype._buildMessageRow = function (msg, type) {
		var self = this;
		var row = Ti.UI.createTableViewRow();
		row.applyProperties(self._style.tableViewRow);
		
		var outerBubble = Ti.UI.createView();
		outerBubble.applyProperties(self._style.outerBubble);
		outerBubble.addEventListener("click", function () {
			alert("clicked");
		});
		
		var bubble = Ti.UI.createView();
		bubble.applyProperties(self._style["bubble" + type]);

		var label = Ti.UI.createLabel({
			text: msg
		});
		label.applyProperties(self._style["label" + type]);

		bubble.add(label);
		outerBubble.add(bubble);
		row.add(outerBubble);
		
		return row;
	};
	
	/***
	 * @method _setRowStyle
	 * @desc Sets the row style
	 */
	UIBuilder.prototype._style = {
		tableViewRow : $.createStyle({ classes: ['messageRow'] }),
		outerBubble : $.createStyle({ classes: ['outerBubble'] }),
		bubbleBot : $.createStyle({ classes: ['bubble', 'bubbleBot'] }),
		bubbleUser : $.createStyle({ classes: ['bubble', 'bubbleUser'] }),
		labelBot : $.createStyle({ classes: ['message', 'messageBot'] }),
		labelUser : $.createStyle({ classes: ['message', 'messageUser'] })
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
	 * @method renderMessage
	 * @desc Renders the message on ui based on type bot/user
	 */
	UIBuilder.prototype.renderMessage = function () {
		var self = this;
		var row = this._buildMessageRow("Hi Ajain. How are you. Can we meet? Hi Ajain. How are you. Can we meet?", "Bot");
		var row2 = this._buildMessageRow("Hi Bot", "User");
		this.tableView.appendRow(row);
		setTimeout(function () {
			self.tableView.appendRow(row2);
		}, 2000);
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
	UIBuilder.prototype.triggerAnswerControl = function () {
		
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

