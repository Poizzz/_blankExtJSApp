Ext.define('App.common.Tabs', {
	singleton: true,

	//Получение закладки (если нет, то генерация)
	getTab: function(TabPanel,config,setActive){
		if(config['itemId'] == undefined ){
			Utils.msg( "Error", 'Error in Controller panel configs', Ext.MessageBox.ERROR);
			return false;
		}
		var Panel = TabPanel.down('#'+config['itemId']);
		if (Panel == null) {
			Panel = TabPanel.add(Ext.create('App.view.Panel', config ));
		}
		if(setActive == true) TabPanel.setActiveTab(Panel);
		return Panel;
	},

	//Контрол отслеживания переключения табов, для контроллеров
	tabchange : {
		'viewport > #MainTabPanel': {
			tabchange: function( tabPanel, newCard, oldCard, eOpts ){
				if(this.id == newCard.itemId){
					this.show();
				}
				else{
					if(oldCard == null) return;
					if(this.id == oldCard.itemId){
						this.hide();
					}
				}
			}
		}
	}
});