import cx from 'classnames';
import React from 'react';
import _ from 'underscore';

const { oneOf, bool } = React.PropTypes;

const backgroundColors = [
	'#FFBF43','#E88B2D','#FF7B3E','#E8442D','#FF3A67','#FF497C','#E832DB','#C344FF','#6D32E8'
];

var i = 1;

class Button extends React.Component {

	constructor( props ) {
		super( props );
		this.state = { backgroundColor: backgroundColors[ i++ ] };
	}

	render() {

		const { size, busy, block, className } = this.props;
		const classes = cx( styles.default ,styles[ size ], block && styles.block, className );

		var style = _.extend( this.props.style, {
			backgroundColor: this.state.backgroundColor,
		});
		if( this.props.isSelected ) style.color = 'blue';

		return <button onClick={this.props.onClick} id={this.props.sectionId} style={style} className={classes}>{this.props.sectionName}</button>;
	}
}

Button.propTypes = {
	size: oneOf(['large', 'small']),
	block: bool,
	busy: bool
};

export default Button;

const styles = StyleSheet.create({

	default: {
		textAlign: 'center',
		fontSize: 18,
		lineHeight: 1.5,
		cursor: 'pointer',

		border: 'none',
		borderRight: '1px solid white',
		borderBottom: '1px solid white',

		paddingRight: 2,
		paddingBottom: 2,
		//borderRadius: 4,
		//color: '#fff',
		color: 'black',
		width: 300,
		//backgroundColor: '#337ab7',
		backgroundColor: 'orange',

		':hover': {
			color: 'gray',
			backgroundColor: '#286090'
		},

		':focus': {
			outline: 'none'
		},

		'[disabled]': {
			backgroundColor: '#337ab7',
			backgroundColor: 'red',
			borderColor: '#2e6da4',
			cursor: 'not-allowed',
			boxShadow: 'none',
			opacity: .65,
			pointerEvents: 'none'
		}
	},

	large: {
		padding: '10px 16px',
		fontSize: 18,
		lineHeight: 1.33,
		borderRadius: 6
	},

	small: {
		padding: '5px 10px',
		fontSize: 12,
		lineHeight: 1.5,
		borderRadius: 3
	},

	block: {
		display: 'block',
		width: '100%'
	}
});
