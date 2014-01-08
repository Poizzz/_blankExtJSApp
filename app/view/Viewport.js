Ext.define('po.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    requires:[
        'Ext.layout.container.Fit',
        'po.view.Main'
    ],

    layout: {
        type: 'fit'
    },
    
    items: [{
        xtype: 'app-main'
    }]
});
