Ext.define('po.extend.ux.StatusBar', {
    
    extend: 'Ext.ux.StatusBar',

    initComponent: function() {
        this.ModuleText = {};
        this.callParent(arguments);
    },

    setStatus: function(o) {
        
        if (Ext.isString(o)) 
            o = {text:o};
        
        // if(o.text === undefined) 
        //     o.text = false;

    	if(o.clear === undefined) 
    		o.clear = false; 

        if (o.iconCls === undefined) 
            o.iconCls = this.defaultIconCls;

        this.callParent(arguments);

        if(o.clear === false){

/*            var ActiveTab = this.up().getActiveTab();
            if(ActiveTab !== null){
                var parent = this.up().getActiveTab().getItemId( );
                this.ModuleText[parent] = {
                    "text": this.text,
                    "iconCls": this.currIconCls
                };
            }*/
        }
        //console.log(this.ModuleText);
    },

    getModuleStatus : function (parent) {
        if(this.ModuleText[parent] === undefined){
            this.ModuleText[parent] = {
                "text": this.defaultText,
                "iconCls": this.defaultIconCls
            };
        }

        this.setStatus (this.ModuleText[parent]);
    },
    
    clearStatus : function(o) {
        var parent = this.up( ).getActiveTab( ).getItemId( );
            defaultText = this.defaultText;
            defaultIconCls = this.defaultIconCls;

        this.defaultText = this.ModuleText[parent].text;
        this.defaultIconCls = this.ModuleText[parent].iconCls;

        this.callParent(arguments);  
        
        this.defaultText = defaultText;
        this.defaultIconCls = defaultIconCls;
    },

    onDestroy : function (){
        this.ModuleText.destroy();
        this.callParent(arguments);
    }

});