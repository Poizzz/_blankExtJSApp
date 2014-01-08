Ext.define('po.controller.Config', {
    extend: 'Ext.app.Controller',

    mixins: ['po.common.Utils'],

    Configs: {
        'Main'   : null
    },

    start: function() {
        var type = null;

        app = {};
        app.Config = {};

        for (type in this.Configs) {
            this.get(type);
        }
    },

    get: function (type){
        Ext.RPC.Config.get(
            type,
            { 
                callback: function(data, e, a, b){
                    if(data.success){
                        this.prepare(this.parce(data.result, type)); 
                    }
                    else{
                        this.msgErr(data.result);
                    }
                },
                scope:this
            }
        );
    }, 

    parce: function(records, type){ 
        return {
            'type' : type, 
            'data' : records
        };
    },

    prepare : function (input) {
        var type = null;
        
        app.Config[input.type] = input.data;
        delete this.Configs[input.type]; // удаляем как обработанный

        // Стартуем только при получении всех Config
        for (type in this.Configs)
            return false;

        this.fireEvent ('__ready');
        
    }

});
