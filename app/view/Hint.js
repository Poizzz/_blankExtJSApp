Ext.define("po.view.Hint", {
    
    extend: 'Ext.window.Window',

    requires:[
        'Ext.layout.container.Fit',
        'Ext.form.Panel'
    ],   
     
    title: 'Подсказка',
    id: "HintWindow",
    width: 400,
    height: 180,
    x: 0, y: 0,
    closeAction: 'hide',
    plain: true,
    headerPosition: 'right',
    layout: 'fit',
    draggable: true,
    resizable: false,
    style : {
        background: '#CAE4FF'
    },
    bodyStyle:{
        'background-color': '#FFFFFF', 
        'padding': "0px 2px 0px 2px"
    },
    html: '<p>Подсказок нет</p>',
    module_hint: {},
    listeners:{
        beforerender:{
            fn: function(){
                this.module_hint.test  = this.html;
            }
        },
        hide:{
            fn: function(){
                this.update(this.html);
            }
        },
        show:{
            fn: function(){
                var cur_tab = 'test';
                //var cur_tab = Ext.getCmp('MainTabPanel').getActiveTab().itemId;
                if(this.module_hint[cur_tab] !== undefined){
                    this.update(this.module_hint[cur_tab]);
                }
            }
        }
    }

});
