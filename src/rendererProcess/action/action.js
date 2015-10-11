var ipc = window.require('ipc');

//import dispatcher from 'dispatcher';
//import constants from 'appConstants';

var requirish = require('requirish');
if( requirish ) requirish._(module);
var dispatcher = require('src/dispatcher');
var constants = require('src/appConstants');

// constants
const ENTER_SECTION = constants.actionType('ENTER_SECTION');
const RESIZE_WINDOW = constants.actionType('RESIZE_WINDOW');

function ipcAPI( actionType, payload ) {

	ipc.send( actionType, payload );
}

var actions = {

	enterSection: function( sectionId ) {
		dispatcher.dispatch({ type: ENTER_SECTION, sectionId: sectionId });
	},

	updateWindowSize: function( width, height ) {
		dispatcher.dispatch({ type: RESIZE_WINDOW, width: width, height: height });
		
	}
};

module.exports = actions;
