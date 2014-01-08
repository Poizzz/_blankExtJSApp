Ext.define('po.view.Statusbar', {
    extend: 'po.extend.ux.StatusBar',

    id: 'StatusBar',
    clock : Ext.create('Ext.toolbar.TextItem'),

    legenda: {
        id: 'HintButton',
        text: 'Подсказка',
        iconCls: 'iconQuestion16',
        listeners:{
            render:{
                fn: function(){
                    this.hintWindow = Ext.getCmp('HintWindow');
                }
            },
            click:{
                fn: function(){
                    this.statusHintShow();
                }
            }
        },
        statusHintShow: function(hintWindow){
            var mainSize = Ext.getCmp('MainPanel').getSize();
            if(this.hintWindow.isHidden() === false){
                this.hintWindow.hide();
                return;
            }
            this.hintWindow.show();
            this.hintWindow.setPosition(mainSize.width-this.hintWindow.getWidth()-50, mainSize.height-this.hintWindow.getHeight()-35);
         }
    },
    exit:{
        // Кнопка добавляется в app.js в зависимости от настроек config-main.js
        id: 'ExitButton',
        text: 'Выход',
        iconCls: 'iconExit16'
    },
    autoClear : 5000,
    defaultText: 'Ready',
    defaultIconCls : 'x-status-valid',
    listeners: {
        render: {
            fn: function(){ 
                Ext.TaskManager.start({
                    run: function(){ this.clock.update(Ext.Date.format(new Date(), 'G:i:s')) }, 
                    interval: 1000,
                    scope: this
                });
                this.add(this.legenda);
                this.add('-'); 
                this.add(this.clock); 
            }
        }
    }
});