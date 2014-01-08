Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
    }
});

Ext.application({
    name: 'po',

    extend: 'po.Application',

    refs    : [
        {ref: 'PanelMenu', selector: 'viewport > #MainPanel > #PanelMenu'},
        {ref: 'PanelContent', selector: 'viewport > #MainPanel > #PanelContent'},
        {ref: 'StatusBar', selector: 'viewport > #MainPanel > #StatusBar'}
    ],
    
    autoCreateViewport: true,

    // Before Viewport create
    init: function () {
        Ext.Direct.addProvider(Ext.RPC.APIDesc);
    },

    launch:function(){

        this.ctrConfig = this.getController('Config');
        this.ctrLogin  = this.getController('Login');

        this.ctrConfig.start();

        this.ctrConfig.on('__ready', function (){ this.ctrLogin.start(); }, this);
        this.ctrLogin.on( '__ready', this.finishPrepare, this);

     
    },

    finishPrepare:function(){
        // Добавление кнопки Выход
        if(app.Config.Main.auth !== false){
            this.getStatusBar().insert(4, this.getStatusBar().exit);
            this.getStatusBar().insert(5, '-');
        }

        //Генерация всех контроллеров
        for (var i = 0; i < this.controllers.keys.length; i++) {
            if(this.getController(this.controllers.keys[i])['afterInit']){
                this.getController(this.controllers.keys[i]).afterInit();
            }
        }   
    }

});
