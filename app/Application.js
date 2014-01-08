Ext.define('po.Application', {
    name: 'po',

    extend: 'Ext.app.Application',
    
    requires:[
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

