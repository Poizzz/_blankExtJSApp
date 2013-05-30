Ext.application({
	name: 'App',
	appFolder: 'app',
	autoCreateViewport: true,

	requires: ['App.common.Utils'],
	controllers: ['Config','Controller'],
	refs:[{ref: 'MainTabPanel', selector: 'viewport > #MainTabPanel'}],

	statics:{
		Conf: new Object(),
		Utils: new Object()
	},

	launch: function(){
		Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
		
		Utils = App.common.Utils;
		//Загрузка конфига (только когда загружен конфиг, тогда загружаем остальные контроллеры)
		this.getController('Config').application.on('ConfigStoreLoaded', function (ConfData) {
			Conf = ConfData;

			//Указание начальной вкладки
			this.getMainTabPanel().setActiveTab( this.getController('Controller').id );
		});
	}

});