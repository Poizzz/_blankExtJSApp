Ext.define('App.common.Utils', {
	singleton: true,

	// Message method for app
	msg: function (title,msg,icon,fun) {
		Ext.Msg.show({
			title: title,
			msg: msg,
			buttons: Ext.Msg.OK,
			fn: fun,
			icon: icon
		})
	},

});