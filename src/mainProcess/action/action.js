var dispatcher = require('dispatcher');
var ipc = require('ipc');

// constants
var actionType = constants.actionType;
var ENTER_SECTION = actionType('ENTER_SECTION');


var actions = {
	enterSection: function( sectionID ) {
		dispatcher.dispatch({ type: ENTER_SECTION, sectionId: sectionId });
	}
};

_.each( actions, function( val, key ) { ipc.on( key, val ); });

module.exports = actions;
