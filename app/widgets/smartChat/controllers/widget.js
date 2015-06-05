var config = Alloy.createWidget('smartChat', 'config').module;
var builder = Alloy.createWidget('smartChat', 'builder').module;
var tableView = $.messages;

var builderInstance = builder.getInstance({
	tableView : tableView
});
builderInstance.renderMessage();


