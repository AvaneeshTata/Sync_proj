sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('syncproject.ext.controller.Sync', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf syncproject.ext.controller.Sync
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				onBeforeBinding: async  function(oBindingContext){

					// debugger;
					// let item = new sap.suite.ui.commons.TimelineItem({
					// 	title:"SomeTitle"
					// })
					// this.base.getView().getContent()[0].getContent().getContent().setVisible(false);
					// // await this.base.getView().getContent()[0].getContent().addMessage("The Data has been Synchronized","The Data has been Synchronized",true,'Information');
					// // this.base.getView().getContent()[0].getContent().getContent().mAggregations._content.setVisible(false);
					// this.base.getView().getContent()[0].getHeader().setVisible(false);
					// // this.base.getView().getContent()[0].getTitle().setVisible(false);
					// if (this.base.getView().getContent()[0].getTitle().getContent().length < 1){
					// this.base.getView().getContent()[0].getTitle().addContent(
					// 	new sap.m.MessageStrip({
					// 		text:"Data has been synchronized",
					// 		type: 'Information'
					// 	})
					// )
					// }
					// // this.base.getView().getContent()[0].getTitle().mAggregations._expandButton.setVisible(false);
					// this.base.getView().getContent()[0].getTitle().getHeading().setVisible(false);
					// this.base.getView().getContent()[0].getTitle().mAggregations._actionsToolbar.setVisible(false);
					// // this.base.getView().getContent()[0].getContent().setContent(
					// // 	new sap.m.Label({
					// // 		text: "Data has been synchronised"
					// // 	})
					// // );

					// // $.ajax({
					// // 	url:"/odata/v4/catalog/Books",
					// // 	type:"GET",
					// // 	success:function(data){
					// // 		debugger;
					// // 	}
					// // });
					
				}
			}
		}
	});
});
