/***
 * @class: Helper Class
 */
exports.module = (function () {
	
	/***
	 * @method snatchFocus 
	 */
	var snatchFocus = function () {
		
	};
	
	/***
	 * @method keyboardTypeMap
	 * @desc Key value map for keyboard type map
	 * @param {String} type - type of keyboard
	 * @return {String} keyboardType  
	 */
	var keyboardTypeMap = function (type) {
		var keyboardMap = {
			"number" : Titanium.UI.KEYBOARD_NUMBER_PAD,
			"alpha" : Titanium.UI.KEYBOARD_DEFAULT,
			"email" : Titanium.UI.KEYBOARD_EMAIL,
			"phone" : Titanium.UI.KEYBOARD_PHONE_PAD
		};
		
		return keyboardMap[type];
	};
	
	
	return {
		snatchFocus: snatchFocus,
		keyboardTypeMap: keyboardTypeMap
	};
}());
