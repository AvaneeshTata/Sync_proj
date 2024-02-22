sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t=new sap.m.BusyDialog;return e.extend("syncproject.ext.controller.SyncObjController",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){debugger;this.base.getView().getContent()[0].getHeaderTitle().setVisible(false);this.base.getView().getContent()[0].getSections()[0].setVisible(false);this.base.getView().getContent()[0].addSection(new sap.uxap.ObjectPageSection);this.base.getView().getContent()[0].getSections()[1].destroyHeading();this.base.getView().getContent()[0].getSections()[1].addSubSection(new sap.uxap.ObjectPageSubSection);this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].destroyBlocks();this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].addBlock(new sap.m.MessageStrip({text:"Data is being synchronized.",type:"Information"}));var s=this.base.getExtensionAPI();var n=s.getModel();var i="postProjectID";var o=e.sPath;var a=o.match(/'([^']+)'/);var g=n.bindContext(`/${i}(...)`);g.setParameter("ID",a[1]);t.open();try{await g.execute();var r=g.getBoundContext().getValue();if(r.value.substring(0,3)=="Doc"){t.close();var c=sap.ushell&&sap.ushell.Container&&await sap.ushell.Container.getServiceAsync("Navigation")||"";if(c!=""){await c.navigate({target:{semanticObject:"obj1",action:"display"},params:{PAN_Number:r.value}})}}else{t.close();this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setType("Error");this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setText(r.value)}}catch(e){this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setType("Error");this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setText(`${e?.error?.code} - ${e?.error?.message}`);t.close()}}}}})});