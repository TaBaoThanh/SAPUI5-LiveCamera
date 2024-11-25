/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/custom/liveCamera/liveCamera/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});