Ext.define('App.common.Tabs', {
	singleton: true,

	// Get Tab for Controller (create new if it not exist)
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

	// Events for change controller tabs
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