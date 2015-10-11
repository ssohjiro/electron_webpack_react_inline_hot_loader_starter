'use strict';

var ipc = require('ipc');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var Immutable = require('immutable');

require('requirish')._(module);
var dispatcher = require('dispatcher');
var constants = require('appConstants');
console.log( constants );

var _data = Immutable.fromJS({
	openedSection: null,
	sections: [
		{ sectionId: 'startScreenshot', sectionName: '스크린샷찍기' },
		{ sectionId: 'makeVideo', sectionName: '비디오만들기' },
		{ sectionId: 'openFinder', sectionName: '폴더보기' },
		{ sectionId: 'setting', sectionName: '셋팅' }
	]
});

// constants
var CHANGE = constants.eventType('CHANGE');
var actionType = constants.actionType;


var Store = _.extend({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit( CHANGE );
		ipc.send('layoutStore.change', Store);
	},
	addChangeListener: function(callback) { this.on( CHANGE , callback); },
	removeChangeListener: function(callback) { this.removeListener( CHANGE, callback); },

	getAllData: function() { return _data;}
});

Store.dispatchToken = dispatcher.register(function(action) {

	switch ( action.type ) {

		case actionType('ENTER_SECTION'):
			var selectedSection = _.findWhere({ sectionId: action.sectionId });
			_data = _data.set('openedSection', selectedSection );
			Store.emitChange();
		break;

		case actionType('RECEIVE_RAW_MESSAGES'):
			Store.emitChange();
		break;

		default:
			// do nothing
	}
});

ipc.on('layoutStore.getAllData', function( event, arg ) {
	console.log('layoutStore.getAllData');
	console.log( _data );
	event.returnValue = _data;
});

module.exports = Store;
