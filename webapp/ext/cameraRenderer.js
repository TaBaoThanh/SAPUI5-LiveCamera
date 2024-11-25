sap.ui.define([], function () {
	"use strict";

	var cameraRenderer = {};

	cameraRenderer.render = function (oRm, oControl) {
		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl._getRenderWidth());
		oRm.addStyle("height", "auto");
		oRm.addStyle("position", "relative");
		oRm.addStyle("text-align", "center");
		oRm.writeStyles();
		oRm.write(">");
		this.renderLiveVideo(oRm, oControl);
		this.renderCircleButton(oRm, oControl);
		this.renderImageSource(oRm, oControl);
		oRm.write("</div>");
	};

	cameraRenderer.renderCircleButton = function (oRm, oControl) {
		oRm.write("<div");
		oRm.addClass("camerajs-container-circles");
		oRm.writeClasses();
		oRm.write(">");
		
		oRm.write("<div");
		oRm.addClass("camerajs-outer-circle");
		oRm.writeClasses();
		oRm.write(">");
		
		oRm.write("<div");
		oRm.addClass("camerajs-inner-circle");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("</div>");
		
		oRm.write("</div>");
		
		oRm.write("</div>");
	};

	cameraRenderer.renderLiveVideo = function (oRm, oControl) {
		oRm.write("<video");
		oRm.writeAttribute("autoplay", 'true');
		oRm.addStyle("transform", "none");
		oRm.addStyle("display", "inline-block");
		oRm.writeStyles();
		oRm.write(">");
		oRm.write("</video>");
	};
	
	cameraRenderer.renderImageSource = function (oRm, oControl) {
		oRm.write("<img");
		oRm.writeAttribute("alt", 'camerajs-imgId');
		oRm.addStyle("display", "none");
		oRm.writeStyles();
		oRm.write(">");
		oRm.write("</video>");
	};
	
	return cameraRenderer;
	
}, true);