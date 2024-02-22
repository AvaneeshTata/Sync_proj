sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var busyind = new sap.m.BusyDialog();
	return ControllerExtension.extend('syncproject.ext.controller.SyncObjController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf syncproject.ext.controller.SyncObjController
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				onAfterBinding: async function(oBindingContext){
					debugger;
					this.base.getView().getContent()[0].getHeaderTitle().setVisible(false);
					this.base.getView().getContent()[0].getSections()[0].setVisible(false);
					this.base.getView().getContent()[0].addSection(new sap.uxap.ObjectPageSection());
					this.base.getView().getContent()[0].getSections()[1].destroyHeading()
					this.base.getView().getContent()[0].getSections()[1].addSubSection(new sap.uxap.ObjectPageSubSection());
					this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].destroyBlocks();
					this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].
					addBlock(new sap.m.MessageStrip({
								text:"Data is being synchronized.",
								type: 'Information'
							}));
					var oExtensionAPI = this.base.getExtensionAPI();
					var oModel = oExtensionAPI.getModel();
					var sFunctionName = "postProjectID";
					var tempspath = oBindingContext.sPath;
					var project_id = tempspath.match(/'([^']+)'/);
					var oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
					oFunction.setParameter("ID",project_id[1]);
					busyind.open();
					// let baseurl = this.base.getView().getModel().aBindings[0].oModel.sServiceUrl;
					// let url = baseurl+ "postProjectID(ID='"+ project_id[1] +"')"
					// await $.ajax({
					// 	url: url,
					// 	type: "GET",
					// 	success: async function(data){
							// debugger
							// busyind.close();
							// var href_For_Product_display = ( sap.ushell && sap.ushell.Container && await sap.ushell.Container.getServiceAsync("Navigation")) || "";
							// if(href_For_Product_display != ""){
							// 	await href_For_Product_display.navigate({
							// 		target : { semanticObject : "obj1", action : "display" },
							// 		params : { "PAN_Number" : data.value }
							// 	})
							// }
					// 	},
					// 	error: function(jqXHR, textStatus, errorThrown){
					// 		debugger
					// 	},
					// 	timeout:100000
					// })
					try{
						await oFunction.execute();
						var oContext = oFunction.getBoundContext().getValue();
						if(oContext.value.substring(0,3) == "Doc"){
							busyind.close();
							var href_For_Product_display = ( sap.ushell && sap.ushell.Container && await sap.ushell.Container.getServiceAsync("Navigation")) || "";
							if(href_For_Product_display != ""){
								await href_For_Product_display.navigate({
									target : { semanticObject : "obj1", action : "display" },
									params : { "PAN_Number" : oContext.value }
								})
							}

						} else {
							busyind.close();
							this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setType('Error');
							this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setText(oContext.value);
						}
	
						
					} catch (e) {
						this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setType('Error');
						this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setText(`${e?.error?.code} - ${e?.error?.message}`);
						busyind.close();
					}		
				}
			}
		}
	});
});
