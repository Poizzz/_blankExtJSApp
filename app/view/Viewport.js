Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    cls: 'noselect',
    
    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: 'tabpanel',
                id: 'MainTabPanel',
                //alias: 'widget.MainTabPanel'
            }]       
        });

        this.callParent(arguments);
    }
    
});
