Ext.define('po.Application', {
    name: 'po',

    extend: 'Ext.app.Application',
    
    requires:[
        'Ext.direct.*',
        'Ext.data.*',

        'Ext.panel.*',
        'Ext.tab.Panel',
        'Ext.toolbar.TextItem',
        'Ext.layout.container.Fit',

        'Ext.util.Cookies',
        'Ext.util.Observable'
    ],

    uses: [
        'po.extend.ux.StatusBar',
        'po.common.AuthRPC'
    ],

    views: [
        //'Viewport',
        'Statusbar',
        'Hint'
    ],

    controllers: [
        'Config',
        'Login',
        'Controller'
    ],

    stores: [
        // TODO: add stores here
    ]
});

