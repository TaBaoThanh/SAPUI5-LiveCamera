sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/custom/liveCamera/liveCamera/lib/jslib-html5-camera-photo/camera.min"
], function (Controller, Camera) {
	"use strict";

	return Controller.extend("sap.custom.liveCamera.liveCamera.controller.Main", {
		onInit: function () {
			var oViewModel = new sap.ui.model.json.JSONModel({
				sourceImage: null
			});
			this.getView().setModel(oViewModel, "model");
		},
		
		onTakePhotoFinished: function (oEvent) {
			this.getView().getModel("model").setProperty("/sourceImage",oEvent.getParameter("src"))
			console.log(oEvent.getParameter("src"));
		},
		
		onOpenCamera: function () {
			this.byId("cemere")._startCamera();
		}
	});
});