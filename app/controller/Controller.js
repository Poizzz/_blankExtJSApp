/*
* Blank for new Controller
*/

Ext.define('App.controller.Controller', {
    extend: 'Ext.app.Controller',

    //stores: ['Controller.Store'],
    //views: ['Controller.View'],
    requires: ['App.common.Tabs'],
    refs:[{ref: 'MainTabPanel', selector: 'viewport > #MainTabPanel'}],

    title: 'Пример',

    LoadingMask: null,
    Panel: null,

    //Create panel for Controller (after Viewport created)
    onLaunch: function() { 
        this.Panel = App.common.Tabs.getTab(this.getMainTabPanel(), {
                itemId: this.id,
                title : this.title,
                layout: 'fit'
            }, false);
        this.LoadingMask = new Ext.LoadMask(this.Panel, {msg:"Загрузка..."});
        this.control(App.common.Tabs.tabchange);
    },

    //Controller turn on
    show: function(){
        this.LoadingMask.show();
        this.doSomething();
    },

    //Controller turn off (tab is not active)
    hide: function (){
        this.doSomethingElse();
    },

    //Method examples
    doSomething: function(){ 
        console.log('Controller is active');
        this.LoadingMask.hide();
    },

    doSomethingElse: function(){ 
        console.log('Controller is disable');
    },

});
