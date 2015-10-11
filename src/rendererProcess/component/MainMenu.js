import React from 'react';

import MainRectBtn from 'component/MainRectBtn';
import action from 'action/action';
import layoutStore from 'store/layoutStore';
import _ from 'underscore';

export default class Component extends React.Component {

	constructor( props ) {

		super( props );
		this.onChangeLayoutStore = this.onChangeLayoutStore.bind(this);
		layoutStore.addChangeListener( this.onChangeLayoutStore );
		this.state = this.getNewState();
	}

	getNewState() {

		var _new = layoutStore.getAllData();
		return {
			width: _new.get('width'),
			height: _new.get('height'),
			sections: _new.get('sections')
		};
	}

	onClick( idx, sectionId ) {

		console.log('enterSection');
		action.enterSection( sectionId );
		this.setState({ selectedIdx: idx });
	}

	onChangeLayoutStore() {

		console.log('onChangeLayoutStore');
		this.setState( this.getNewState() );
	}

	getRowLength() {
		var i = 0;
		while( this.state.sections.length > i*i ) i++;
		return i;
	}

	componentDidUnmount() {
		layoutStore.removeChangeListener( this.onChangeLayoutStore );
	}

	render() {

		var rowLength = this.getRowLength();
		var rectBtns = this.state.sections.map( (info,i) => {

			var newInfo = _.clone( info );
			newInfo.style = {};
			newInfo.style.width = Math.floor( this.state.width / rowLength );
			newInfo.style.height = Math.floor( this.state.height / rowLength );
			if( (i+1) % rowLength === 0 ) newInfo.style.borderRight = 'none';
			if( i+1 > rowLength*(rowLength-1) ) newInfo.style.borderBottom = 'none';

			newInfo.onClick = this.onClick.bind( this, i, info.sectionId );
			newInfo.isSelected = ( i === this.state.selectedIdx );

			return <MainRectBtn {...newInfo}/>;
		});

		return <div id="mainMenu" style={{height: '100%'}}>{rectBtns}</div>;
	}
}
