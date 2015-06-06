/***
 * @class: Data Interface Class
 * @extends: Helper Class
 */
exports.module = (function () {
	var instance;
	var DataInterface = function () {
		this.currentQuestion = {};
		this.prevQuestion = {};	
		this.summary = [];
		this.data = {};
	};
	
	/***
	 * @method setSummary
	 * @desc Set the summary
	 */
	DataInterface.prototype.setSummary = function (qs) {
		this.summary = qs;
	};
	
	/***
	 * @method getSummary
	 * @desc Get the summary
	 */
	DataInterface.prototype.getSummary = function () {
		return this.summary;
	};
	
	
	/***
	 * @method setNextQuestion
	 * @desc Set the next question
	 */
	DataInterface.prototype.setCurrQuestion = function (currQs) {
		this.currQuestion = currQs;
	};
	
	/***
	 * @method getNextQuestion
	 * @desc Fetches the next question
	 */
	DataInterface.prototype.getCurrQuestion = function () {
		return this.currQuestion;
	};
	
	/***
	 * @method setPrevQuestion
	 * @desc Sets the previous question
	 */
	DataInterface.prototype.setPrevQuestion = function (prevQs) {
		this.prevQuestion = prevQs;
	};
	
	/***
	 * @method prevQuestion
	 * @desc Fetches the previous question
	 */
	DataInterface.prototype.getPrevQuestion = function () {
		return this.prevQuestion;
	};
	
	/***
	 * @method updateAnswer
	 * @desc Updates the answer based on the qs id
	 * @param {String} id - question id
	 */
	DataInterface.prototype.updateAnswer = function (id, answer) {
		
	};
	
	/***
	 * @method update
	 * @desc Updates the next/prev/curr qs
	 */
	DataInterface.prototype.update = function (id) {
		var currQuestion = this.data[id];
		var prevQuestion = this.getCurrQuestion();
		this.setPrevQuestion(prevQuestion);
		this.setCurrQuestion(currQuestion);
	};
	
	
	/***
	 * @method setData
	 * @desc Set the data model
	 */
	DataInterface.prototype.setData = function (data) {
		this.data = data;
	};
	
	/***
	 * @method getData
	 * @desc Get the data model
	 */
	DataInterface.prototype.getData = function () {
		return this.data;
	};
	
	//Create Singleton Instance
	var createInstance = function () {
		var dataInterface = new DataInterface();
		return dataInterface;
	};
	
	//Destroy Instance
	var destroyInstance = function () {
		delete instance;
	};
	
	return {
		getInstance : function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
		destroyInstance : destroyInstance 
	};
}());
