/** @jsx React.DOM */
define([
	'react'
], function(
	React
) {
	return React.createClass({
		render : function() {
			return <div>Yo, {this.props.name}.</div>;
		}
	});
});