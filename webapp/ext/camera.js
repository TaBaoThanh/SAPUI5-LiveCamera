sap.ui.define([
	"sap/base/Log",
	"sap/ui/core/Control",
	"sap/ui/thirdparty/jquery",
	'sap/ui/dom/includeStylesheet',
	"sap/custom/liveCamera/liveCamera/lib/jslib-html5-camera-photo/camera.min"
], function (
	Log,
	Control,
	jQuery,
	includeStylesheet,
	camera
) {
	"use strict";

	var Camera = Control.extend("sap.custom.liveCamera.liveCamera.ext.camera", {
		metadata: {
			properties: {
				height: {
					type: "sap.ui.core.CSSSize",
					group: "Dimension",
					defaultValue: "100%"
				},
				width: {
					type: "sap.ui.core.CSSSize",
					group: "Dimension",
					defaultValue: "100%"
				},
				/**
				 * If set to true, the camera will be close after taking photo
				 */
				autoStop: {
					type: "boolean",
					defaultValue: true
				}
			},
			events: {
				takePhotoFinished: {
					parameters: {
						src: {
							type: "string"
						}
					}
				},
			}
		},

		init: function () {
			includeStylesheet('css/style.css');
		}

	});

	Camera.prototype._getRenderWidth = function () {
		return "100%";
	};

	Camera.prototype._getRenderHeight = function () {
		return this.getHeight();
	};

	Camera.prototype.setWidth = function (sWidth) {
		this.setProperty("width", sWidth, true);
		var oDomRef = this.$();
		if (oDomRef === null) {
			return this;
		}

		oDomRef.css("width", this._getRenderWidth());
		return this;
	};

	Camera.prototype.setHeight = function (sHeight) {
		this.setProperty("height", sHeight, true);
		var oDomRef = this.$();
		if (oDomRef === null) {
			return this;
		}

		oDomRef.css("height", this._getRenderHeight());
		return this;
	};

	Camera.prototype.onAfterRendering = function (oControl) {
		this._initialCamera();
	};

	Camera.prototype._initialCamera = function () {
		var oVideoElement = this.$().find("video")[0];
		var that = this;
		
		if (!oVideoElement) {
			throw Error("Underlying video was not found in DOM.");
			return;
		}
		
		if (oVideoElement) {
			if (!this._cameraPhoto) {
				this._cameraPhoto = new JslibHtml5CameraPhoto.default(oVideoElement);
				this._startCamera().done(function() {
					that.$().find(".camerajs-container-circles").on('click', function () {
						that._takePhoto();
					});
				});
			}
		}
	};
	
	Camera.prototype._startCamera = function () {
		var FACING_MODES = JslibHtml5CameraPhoto.FACING_MODES;
		var that = this;
		var promise = $.Deferred();
		this._cameraPhoto.startCamera(FACING_MODES.ENVIRONMENT).then(() => {
			promise.resolve();
		}).catch((error) => {
			promise.reject();
			console.error('Camera not started!', error);
		});
		
		return promise;
	};
	
	Camera.prototype._takePhoto = function () {
		var sizeFactor = 1;
		var imageType = JslibHtml5CameraPhoto.IMAGE_TYPES.JPG;
		var imageCompression = 1;
		var config = {
			sizeFactor,
			imageType,
			imageCompression
		};
		var dataUri = this._cameraPhoto.getDataUri(config);
		var oSourceImage = this.$().find("img");

		if (oSourceImage[0]) {
			oSourceImage[0].src = dataUri;
		}
		
		this.fireTakePhotoFinished({
			src: dataUri
		});
		
		if (this.getProperty("autoStop")) {
			this._closeCamera();
		}
	};
	
	Camera.prototype._closeCamera = function () {
		this._cameraPhoto.stopCamera().then(() => {
			console.log('Camera stoped!');
		}).catch((error) => {
			console.log('No camera to stop!:', error);
		});
	}

	return Camera;
});