/***
 * @class: Data Interface Class
 * @extends: Helper Class
 */
exports.module = (function () {
	var instance;
	var DataInterface = function () {
		this.currentQuestion = {};
		this.prevQuestion = {};
		this.nextQuestion = {};	
	};
	
	/***
	 * @method nextQuestion
	 * @desc Fetches the next question
	 */
	DataInterface.prototype.nextQuestion = function () {
		return  {
			title: "What is your age ?",
			type: "numeric"
		};
	};
	
	/***
	 * @method prevQuestion
	 * @desc Fetches the previous question
	 */
	DataInterface.prototype.prevQuestion = function () {
		
	};
	
	/***
	 * @method updateAnswer
	 * @desc Updates the answer based on the qs id
	 * @param {String} id - question id
	 */
	DataInterface.prototype.updateAnswer = function (id) {
		
	};
	
	/***
	 * @method _updateData
	 * @desc Update the data model
	 */
	DataInterface.prototype._updateData = function () {
		
	};
	
	/***
	 * @method setData
	 * @desc Set the data model
	 */
	DataInterface.prototype.setData = function () {
		
	};
	
	/***
	 * @method getData
	 * @desc Get the data model
	 */
	DataInterface.prototype.getData = function () {
		
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
