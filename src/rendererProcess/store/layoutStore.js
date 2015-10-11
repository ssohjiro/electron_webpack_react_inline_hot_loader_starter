'use strict';

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var Immutable = require('immutable');

var requirish = require('requirish');
if( requirish ) requirish._(module);

var dispatcher = require('src/dispatcher');
var constants = require('src/appConstants');

var _data = Immutable.fromJS({
	openedSection: null,
	width: -1,
	height: -1,
	sections: null
});

_data = _data.set('sections', [
	{ sectionId: 'Screenshot', sectionName: '스크린샷찍기', modulePath: 'component/section/ScreenshotSection' },
	{ sectionId: 'Video', sectionName: '비디오만들기', modulePath: 'component/section/VideoSection' },
	{ sectionId: 'Info', sectionName: '폴더보기', modulePath: 'component/section/InfoSection' },
	{ sectionId: 'Setting', sectionName: '셋팅', modulePath: 'component/section/SettingSection' }
]);


// constants
var CHANGE = constants.eventType('CHANGE');
var actionType = constants.actionType;


var Store = _.extend({}, EventEmitter.prototype, {

	emitChange: function() { this.emit( CHANGE ); },
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

		case actionType('RESIZE_WINDOW'):

			console.log( action );
			//_data = _data.set({ width: action.width, height: action.height });
			_data = _data.set('width', action.width );
			_data = _data.set('height', action.height );
			console.log( _data.toJS() );
			Store.emitChange();
			break;

		default:
			// do nothing
	}
});

module.exports = Store;
