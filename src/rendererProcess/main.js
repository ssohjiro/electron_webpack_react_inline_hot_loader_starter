import React from 'react';
import MainMenu from 'component/MainMenu';
import layoutStore from 'store/layoutStore';
import action from 'action/action';
import StoreMonitor from 'component/StoreMonitor';
import $ from 'jquery';
import _ from 'underscore';

//import sections from 'component/section/_allSection';
var section = {};

window.$ = $;
class Main extends React.Component {

	constructor( props ) {
		super( props );

		layoutStore.addChangeListener( this.onChangeLayoutStore.bind(this) );

		var width = window.document.documentElement.clientWidth;
		var height = window.document.documentElement.clientHeight;
		action.updateWindowSize( width, height );

		$( window ).on('resize', () => {
			var width = window.document.documentElement.clientWidth;
			var height = window.document.documentElement.clientHeight;
			action.updateWindowSize( width, height );
		});

		$( document ).on('keypress', ( e ) => {

			if( e.which === 109 ) this.setState({ storeMonitor: !this.state.storeMonitor });
		});

		this.state = this.getNewState();
	 }

	 getNewState() {

		var _new = layoutStore.getAllData();
		return { openedSection: _new.get('openedSection') };
	 }

	 onChangeLayoutStore() {

		 console.log('onChangeLayoutStore');
		 this.setState( this.getNewState() );
	 }

	onClick( id ) {

		console.log('enterSection');
		action.enterSection( id );
		//ipc.send('enterSection', { sectionId: id });
	}

	getRowLength() {

		var i = 0;
		while( this.state.get('sections').size > i*i ) i++;
		return i;
	}

	render() {

		var Section;
		if( this.state.openedSection ) {
			Section = sections[ this.state.openedSection.sectionId ];
		}

		return (
			<div id="app">
				<MainMenu style={{zIndex: 1}} />
				{Section && <Section />}
				{ __DEVELOPEMENT__ && this.state.storeMonitor && <StoreMonitor store={layoutStore} />}
			</div>
		);
	}
}

React.render( <Main />, document.body );
