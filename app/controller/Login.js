Ext.define('po.controller.Login', {
    extend: 'Ext.app.Controller',

    views: ['login.AuthForm'],

    mixins: ['po.common.Utils'],

    refs    : [
        {ref: 'LoginForm', selector: 'loginWindow > #LoginForm'},
        {ref: 'MainPanel', selector: 'viewport > #MainPanel'}
    ],

    Auth: null,

    LoginWindow : null,

    start: function() {

        switch (app.Config.Main.auth) {
            
            case "RPC" : this.Auth = Ext.create( 'po.common.AuthRPC', {} ); break;
            case "Other": //Other auth method
            default:
                this.showViewport();
                return;
        }

        this.Auth.on('__authOK', this.showViewport,  this);
        this.Auth.on('__authNO', this.showLoginForm, this );
        
        this.Auth.check();

        this.control({
            'loginWindow > #LoginForm button[action=sendLogin]': {
                click: this.login
            },
            'viewport > #MainPanel > #StatusBar > #ExitButton' : {
                click: function (){
                    this.Auth.logout();
                }
            }
        });

    },

    login: function () {
        var form = this.getLoginForm().getForm();
        this.Auth.login (form);
    },

    showViewport: function () {
        this.getMainPanel().show();

        if(this.LoginWindow !== null){
            this.LoginWindow.close();
        }

        this.fireEvent ('__ready');
        
    },

    showLoginForm: function () {
        
        this.getMainPanel().hide();

        this.LoginWindow = Ext.create('po.view.login.AuthForm',
            (function ( scope ) {
                return ( app.Config.Main.auth === "RPC") ? { api: {submit: 'Ext.RPC.Auth.login'} } : {};
            })(this)
        ).show();
    }

});
