Ext.define("po.view.login.AuthForm", {
    
    extend: 'Ext.window.Window',

    requires:[
        'Ext.layout.container.Fit',
        'Ext.form.Panel'
    ],    

    layout:'fit',
    width: 400,
    autoHeight: true,
    closable: false,
    resizable: false,
    plain: true,
    border: false,
    hidden: true,
    alias : 'widget.loginWindow',
    title: 'Авторизация',

    items:[],

   
    initComponent: function(cfg){

        var form_param = {
            //xtype: 'form',
            border: false,
            id: 'LoginForm',
            frame: true,
            defaultType: 'textfield',
            buttonAlign: 'right',
            defaults: {
                anchor: '98%'
            },
            layoutConfig: {
                labelSeparator: ' '
            },
            bodyPadding: '5 5 0',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 120
            },
            items:[
            {
                fieldLabel: "Имя пользователя",
                emptyText: "Введите имя пользователя",
                name: 'j_username',
                id:'j_username',
                allowBlank: false,
                maxLength: 64,
                vtype: 'alphanum'
            },{
                fieldLabel: "Пароль",
                name: 'j_password',
                inputType: 'password',
                maxLength: 32
            }],
            buttons: [{
                handleMouseEvents: true,
                text: "Войти",
                action : "sendLogin"
            }]

        };

        Ext.apply(form_param, this.initialConfig);
       
        Ext.apply(this, {items: Ext.create('Ext.form.Panel', form_param)});

        this.callParent();

    },

    listeners:{
        render: function (){
            var nav = new Ext.util.KeyNav({
                target : this.el,
                enter  : function(e){
                    this.query('#LoginForm button[action=sendLogin]')[0].fireEvent('click');
                },
                scope : this
            });
        }
    }


});
