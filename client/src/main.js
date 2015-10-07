import React from 'react';
import Button from 'component/Button';
var ipc = window.require('ipc');

class Main extends React.Component {

	onClick() {

		ipc.send('ping', { age: 26 });


		console.log('click');
	}

	render() {

		return (

			<div onClick={this.onClick}>
				<Button />
				<br />
				<div>{this.props.str}</div>
				<br />
				<Button />
				<br />
				<br />
				<Button />
				<br />
				<Button />
				<br />
				<Button />
				<br />
			</div>
		);
	}
}


//var eRequire = window.require;
ipc.send('ping', { age: 26 });

console.log('hi');

React.render( <Main />, document.body );
