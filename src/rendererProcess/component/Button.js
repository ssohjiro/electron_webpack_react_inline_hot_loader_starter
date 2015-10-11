import React from 'react';
import StyleSheet from 'react-inline';
import cx from 'classnames';

const { oneOf, bool } = React.PropTypes;

class Button extends React.Component {

	render() {

		const { size, busy, block, className } = this.props;
		const classes = cx( styles.default ,styles[ size ], block && styles.block, className );

		return <button {...this.props} className={classes} disabled={busy}>hih33</button>;
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
		padding: '6px 12px',
		fontSize: 14,
		lineHeight: 1.5,
		cursor: 'pointer',
		border: '1px solid #2e6da4',
		borderRadius: 4,
		//color: '#fff',
		color: '#fff',
		width: 300,
		//backgroundColor: '#337ab7',
		//backgroundColor: 'ornage',

'@media only screen and (max-width: 640px)': {
			display: 'block',
			width: '100%'
		},
		
		':hover': {

			color: 'gray',
			backgroundColor: '#286090',
			borderColor: '#122b40'
		},

		':focus': {
			color: '#fff',
			backgroundColor: '#286090',
			borderColor: '#122b40'
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
