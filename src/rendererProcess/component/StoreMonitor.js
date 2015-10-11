'use strict';

import React from 'react';
import _ from 'underscore';

export default class Component extends React.Component {

	constructor( props ) {
		super( props );
		this.onChangeStore = this.onChangeStore.bind( this );
		props.store.addChangeListener( this.onChangeStore );
		this.state = { 
			top: 0, left: 0,
			storeData: props.store.getAllData() };
	}

	onChangeStore() {
		this.setState({ storeData: this.props.store.getAllData() });
	}

	onMouseDown( e ) {
		this.setState({ isDrag: true, x: e.clientX, y: e.clientY });
	}
	onMouseUp() {
		this.setState({ isDrag: false });
	}
	onMouseMove( e ) {
		if( ! this.state.isDrag ) return;
		this.setState({
			x: e.clientX, y: e.clientY,
			top: this.state.top + (e.clientY - this.state.y),
			left: this.state.left + (e.clientX - this.state.x)
		});
	}

	componentDidUnmount() {
		this.props.store.removeChangeListener( this.onChangeStore );
	}

	render() {
		var values = [];
		_.each( this.state.storeData.toJS(), function( val, key ) {
			var valStr = typeof val === 'object' ? JSON.stringify( val ) : val;
			values.push( <div><span>{key}</span>{':' + valStr}<span></span></div> );
		});

		var style = {
			top: this.state.top,
			left: this.state.left,
			position: 'absolute',
			backgroundColor: 'gray',
			width: 300,
			height: 500,
			opacity: 0.8,
			wordWrap: 'break-word',
			display: this.state.hide ? 'none' : 'block'
		};

		return (
			<div 
				onMouseUp={this.onMouseUp.bind(this)} 
				onMouseDown={this.onMouseDown.bind(this)} 
				onMouseMove={this.onMouseMove.bind(this)} 
				style={style}>{values}
			</div>
		);
	}
}
