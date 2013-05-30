Ext.define('App.model.Config', {
	extend: 'Ext.data.Model',
	fields: ['params'],
	proxy: {
		type: 'ajax',
		url: 'config/config.json',
		reader: {
			type: 'json',
			root: 'result',
			successProperty: 'success'
		}
	}
});