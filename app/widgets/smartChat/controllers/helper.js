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
			"numeric" : Titanium.UI.KEYBOARD_NUMBER_PAD,
			"alpha" : Titanium.UI.KEYBOARD_DEFAULT,
			"email" : Titanium.UI.KEYBOARD_EMAIL,
			"phone" : Titanium.UI.KEYBOARD_PHONE_PAD
		};
		
		return keyboardMap[type];
	};
	
	/***
	 * @method inputValidate
	 * @desc validates the input text based on the validation rules passed
	 * @param {Object} rule - validation rule
	 * {
	 *  	type : string/numeric/email/phone,
	 *  	maxLength: 10,
	 *  	minLength: 1,
	 *  	minValue: 10, //only for numeric
	 *  	maxValue: 100, //only for numeric
	 *  	required: true/false
	 * }
	 * @param {String} val - value passed
	 * @return {Boolean} isValid   
	 */
	var inputValidate = function (rule, val) {
		var type = rule.type || "";
		var message = "";
		var isValid = false;
		
		//validate is numeric
		var _isNumeric = function (val) {
			if (!isNaN(val)) {
				return true;
			}
			message += "Please enter numeric value \n";
			return false;
		};
		
		//validate is string
		var _isString = function (val) {
			if (typeof val === "string") {
				return true;
			}
			message += "Please enter string value \n";
			return false;
		};
		
		//validate is phone
		var _isPhone = function (val) {
			if (typeof val === "numeric" && val.length === 10) {
				return true;
			}
			message += "Please enter valid phone number \n";
			return false;
		};
		
		//validate is email
		var _isMail = function (val) {
			var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (mail.test(val)) {
				return true;
			}
			message += "Please enter valid email \n";
			return false;
		};
		
		//validate length
		var _validateLength = function (val, min, max, isValid) {
			//if type value is not satisfied then return the state
			if (!isValid) {
				return false;
			}
			
			var isValid = false;
			if ((min !== undefined) && val.length >= min) {
				isValid = true;
			} else {
				message += "Minimun length has to be "+ min +" \n";
				return false;
			}
			
			if (max && val.length <= max) {
				isValid = true;
			} else {
				message += "Maximum length has to be "+ max +" \n";
				return false;
			}
			
			return isValid;
		};
		
		//validate max and min value
		var _validateMinMax = function (val, min, max, isValid) {
			//if type value is not satisfied then return the state
			if (!isValid) {
				return false;
			}
			
			var isValid = false;
			if ((min !== undefined) && val >= min) {
				isValid = true;
			} else {
				message += "Minimum value has to be "+ min +" \n";
				return false;
			}
			
			if (max && val <= max) {
				isValid = true;
			} else {
				message += "Maximum value has to be "+ max +" \n";
				return false;
			}
			
			return isValid;
		};
		
		switch (type) {
			case "numeric":
				var val = parseInt(val);
				isValid = _isNumeric(val);
				if (rule.maxLength || rule.minLength) {
					isValid = _validateLength(val, rule.minLength, rule.maxLength, isValid);
				}
				if (rule.maxValue || rule.minValue) {
					isValid = _validateMinMax(val, rule.minValue, rule.maxValue, isValid);
				}
				break;
			case "string":
				isValid = _isString(val);
				if (rule.maxLength || rule.minLength) {
					isValid = _validateLength(val, rule.minLength, rule.maxLength, isValid);
				}
				break;
			case "email":
				isValid = _isMail(val);
				break;
			case "phone":
				isValid = _isPhone(val);
				break;
			default:
				Ti.API.error("Invalid type passed.");
				return;
				break;
		}
		
		return {
			isValid : isValid,
			message: message
		};
	};
	
	
	return {
		snatchFocus: snatchFocus,
		keyboardTypeMap: keyboardTypeMap,
		inputValidate: inputValidate
	};
}());
