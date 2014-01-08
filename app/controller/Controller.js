Ext.define('po.controller.Controller', {
    extend: 'Ext.app.Controller',

    stores: [

    ],
    views: [
        'ControllerView'
    ],

    refs    : [
        {ref: 'PanelContent', selector: 'viewport > #MainPanel > #PanelContent'},
    ],

    Panel: null,

    init: function () {
        //this.control();
    },

    //После инициации app
    afterInit: function() {
        this.Panel = Ext.create( 'po.view.ControllerView', {} );
        this.getPanelContent().add(this.Panel);
        //Тут запуск логики

    }


});
