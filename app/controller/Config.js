Ext.define('App.controller.Config', {
    extend: 'Ext.app.Controller',   

    stores: ['Config'],
    ConfData: null,

    init: function() {
        this.getConfigStore().on('load', function (store,operation,success) {
            if(success){
                this.ConfData = this.parceConfig(store);
                this.application.fireEvent('ConfigStoreLoaded',this.ConfData);
            }
            else Utils.msg("Error","Wrong settings of config file",Ext.MessageBox.ERROR);            
        }, this);

    },  

    //Config data from store
    parceConfig: function(store){
        return store.data.items[0].data;
    }

});
