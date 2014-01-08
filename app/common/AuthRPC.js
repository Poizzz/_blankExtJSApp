Ext.define('po.common.AuthRPC', {

    mixins: {
        util:'po.common.Utils',
        observable: 'Ext.util.Observable'
    },

    constructor: function(config) {
        config = config||{};
        this.initConfig(config);

        this.mixins.observable.constructor.call(this);
    },


    check: function() {
        var userCookie = Ext.util.Cookies.get ("user_data");

        if(userCookie === null) {
            this.fireEvent('__authNO');
            return true;
        }

       Ext.RPC.Auth.remoteCheckLogin ({
            scope: this,
            callback: function(records,obj,success) {
                if(success === true) {
                    if(records['success'] === false) {
                        if(records['code'] === 403){
                            this.fireEvent('__authNO');
                        } else {
                            this.msgErr("Server: "+records['msg']);
                        }
                    } else {
                        this.fireEvent('__authOK');
                    }
                    
                }
            }
            
        });

        return true;
    },

    login : function(form) {
        form.submit({
            scope: this,

            success: function(form, action) {
                this.fireEvent('__authOK');
            },

            failure: function(form, action) {
                if(action.result !== undefined){
                    this.msgWarn(action.result.msg);
                }
            }

        });
    },

    logout : function() {
        // TODO
        console.log('logout');
    }

});