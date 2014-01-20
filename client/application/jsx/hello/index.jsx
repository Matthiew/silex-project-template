/** @jsx React.DOM */
define([
	'react',
	'react.backbone'
], function(
	React
) {
	return React.createBackboneClass({
		render : function() {
			return <div className="hi">{this.getModel().get('message')}</div>;
		}
	});
});