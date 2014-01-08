Ext.define('po.view.Main', {
    extend: 'Ext.Panel',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    hidden: true,
    xtype: 'app-main',

    id: 'MainPanel',

    layout: {
        type: 'border'
    },
    
    bbar: Ext.create('po.view.Statusbar', {}),
    
    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150,
        id: "PanelMenu"
    },{
        region: 'center',
        xtype: 'tabpanel',
        id: "PanelContent",
        items:[]
    },
    Ext.create( 'po.view.Hint', {})
    ]
});