Ext.define('po.common.Utils', {

	msg: function (conf) {
		if(conf.icon === undefined) conf.icon = Ext.MessageBox.INFO;
		if(conf.fun === undefined) conf.fun = null;
		if(conf.buttons === undefined)conf.buttons = Ext.Msg.OK;
		return Ext.Msg.show(conf);
	},

	msgOk: function (msg) {
		Ext.Msg.show({
			title: "Подтверждение",
			msg: msg,
			closable:false,
			buttons: Ext.Msg.OK,
			icon: Ext.MessageBox.INFO,
			scope: Ext
		});

		if(typeof this['getStatusBar'] === 'function'){
        	this.getStatusBar().setStatus({
	        	text:msg,
	        	iconCls: 'x-status-valid'
	        });
	    }
		return false;
	},

	msgErr: function (msg){
		/*if(!LoadingMask.isHidden()){			
			LoadingMask.hide();
		}*/
		Ext.Msg.show({
			title: "Ошибка",
			msg: msg,
			closable:false,
			buttons: Ext.Msg.OK,
			icon: Ext.MessageBox.ERROR,
			scope: Ext
		});

		if(typeof this['getStatusBar'] === 'function'){
        	this.getStatusBar().setStatus({
	        	text:msg,
	        	iconCls: 'x-status-error'
	        });
	    }
		return false;
	},

	msgWarn: function (msg){
		if(typeof this['getStatusBar'] === 'function'){
        	this.getStatusBar().setStatus({
	        	text:msg,
	        	iconCls: 'x-status-error'
	        });
	    }
	    else{
	    	this.msgWarnPopup(msg);
	    }
		
	},

	msgWarnPopup: function (msg, rusumeLoadmask){
		
/*		if(LoadingMask !== undefined ) {
			if(!LoadingMask.isHidden()){
				LoadingMask.hide();
			}
		}*/

		Ext.Msg.show({
			title: "Предупреждение",
			msg: msg,
			buttons: Ext.Msg.OK,
			icon: Ext.MessageBox.WARNING
		});
		
		//if(rusumeLoadmask && LoadingMask !== undefined ) LoadingMask.show();
			
	},

	msgClear: function(){
		this.getStatusBar().clearStatus({
			useDefaults : true
		});
	},

	translate: function (str){
    	for (var search in Config['Monitor'].translate){
    		str = str.replace(new RegExp(search,'g'), Config['Monitor'].translate[search]);
    	}
		return str;
	},

    // Получение цветовой схемы по id
    getColor: function ( id ){
        var colors = Config['Main'].colors;
        var ret = new Object();
        for(col in colors){
            ret[col] = (colors[col][id] !== undefined) ? colors[col][id] : colors[col][0];
        }
        return ret;
    },


	is_object: function ( mixed_var ) {
		if (Object.prototype.toString.call(mixed_var) === '[object Array]') 
			return false;

		return mixed_var !== null && typeof mixed_var === 'object';
	},

	copy_object: function (o) {
		var no = {};
		for (var k in o) {
			no[k] = o[k];
		}
		return no;
	}
});