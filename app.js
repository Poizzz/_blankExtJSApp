Ext.application({
	name: 'App',
	appFolder: 'app',
	autoCreateViewport: true,

	requires   : ['App.common.Utils'],
	controllers: ['Config','Controller'],
	refs       : [{ref: 'MainTabPanel', selector: 'viewport > #MainTabPanel'}],

	statics:{
		Conf : new Object(),
		Utils: new Object()
	},

	launch: function(){
		// Set cookie provider
		Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
		
		Utils = App.common.Utils;
		// Config loaded (Start controller action - only after config load)
		this.getController('Config').application.on('ConfigStoreLoaded', function (ConfData) {
			Conf = ConfData;

			// Set primary tab
			this.getMainTabPanel().setActiveTab( this.getController('Controller').id );
		});
	}

});