'use strict';

var keyMirror = require('key-mirror');
//var debug = require('debug')('constants');

function getConstants(context, key) {
	var val = this[key];
	if (!val) return console.error('no constants by key: ' + context + '.' + key);

	return val;
}

var constants = getConstants.bind(keyMirror({
	HELLO: null
}), '');

constants.eventType = getConstants.bind(keyMirror({
	CHANGE: null,
	IIEEE: null
}), 'eventType');

constants.actionType = getConstants.bind(keyMirror({
	CHANGE: null,
	ENTER_SECTION: null,
	RESIZE_WINDOW: null
}), 'actionType');

module.exports = constants;
