//@ui5-bundle syncproject/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"syncproject/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("syncproject.Component",{metadata:{manifest:"json"}})});
},
	"syncproject/ext/controller/Sync.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(n){"use strict";return n.extend("syncproject.ext.controller.Sync",{override:{onInit:function(){var n=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:async function(n){}}}})});
},
	"syncproject/ext/controller/SyncObjController.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t=new sap.m.BusyDialog;return e.extend("syncproject.ext.controller.SyncObjController",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){this.base.getView().getContent()[0].getHeaderTitle().setVisible(false);this.base.getView().getContent()[0].getSections()[0].setVisible(false);this.base.getView().getContent()[0].addSection(new sap.uxap.ObjectPageSection);this.base.getView().getContent()[0].getSections()[1].destroyHeading();this.base.getView().getContent()[0].getSections()[1].addSubSection(new sap.uxap.ObjectPageSubSection);this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].destroyBlocks();this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].addBlock(new sap.m.MessageStrip({text:"Data is being synchronized.",type:"Information"}));var s=this.base.getExtensionAPI();var n=s.getModel();var i="postProjectID";var o=e.sPath;var a=o.match(/'([^']+)'/);var g=n.bindContext(`/${i}(...)`);g.setParameter("ID",a[1]);t.open();try{await g.execute();var c=g.getBoundContext().getValue();if(c.value.substring(0,3)=="Doc"){t.close();var r=sap.ushell&&sap.ushell.Container&&await sap.ushell.Container.getServiceAsync("Navigation")||"";if(r!=""){await r.navigate({target:{semanticObject:"obj1",action:"display"},params:{PAN_Number:c.value}})}}else{t.close();this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setType("Error");this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setText(c.value)}}catch(e){this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setType("Error");this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0].setText(`${e?.error?.code} - ${e?.error?.message}`);t.close()}}}}})});
},
	"syncproject/i18n/i18n.properties":'# This is the resource bundle for syncproject\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\nflpTitle=Sync\n\nflpSubtitle=Data synchronizarion on-click\n',
	"syncproject/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"syncproject","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.12.2","toolsId":"e9300457-19fa-46db-b3e7-595a29cd07e3"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"Sync_Project_1-display":{"semanticObject":"Sync_Project_1","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}},"outbounds":{"obj1-display":{"semanticObject":"obj1","action":"display","parameters":{}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.120.4","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{},"sap.suite.ui.commons":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"syncproject.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"routes":[{"pattern":":?query:","name":"BooksList","target":"BooksList"},{"pattern":"SourcingProjectID({key}):?query:","name":"SourcingProjectIDObjectPage","target":"SourcingProjectIDObjectPage"}],"targets":{"BooksList":{"type":"Component","id":"BooksList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/SourcingProjectID","variantManagement":"Page","navigation":{"SourcingProjectID":{"detail":{"route":"SourcingProjectIDObjectPage"}}},"initialLoad":"Enabled"}}},"SourcingProjectIDObjectPage":{"type":"Component","id":"SourcingProjectIDObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"contextPath":"/SourcingProjectID","navigation":{}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ListReport.ListReportController#syncproject::BooksList":{"controllerName":"syncproject.ext.controller.Sync"},"sap.fe.templates.ObjectPage.ObjectPageController#syncproject::SourcingProjectIDObjectPage":{"controllerName":"syncproject.ext.controller.SyncObjController"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"sync_project_1"}}'
}});
