var ImageScaling = function(config) {
	this._ss = config.host;

	ImageScaling.superclass.constructor.apply(this, arguments);
};

ImageScaling.NS = 'scaling';
ImageScaling.NAME = 'slideshowImageScaler';

ImageScaling.ATTRS = {
	height: {
		validator: Y.Lang.isNumber
	},
	width: {
		validator: Y.Lang.isNumber
	},
	scaleFactor: {
		validator: Y.Lang.isNumber
	}
};

Y.extend(ImageScaling, Y.Plugin.Base, {
	initializer: function(config) {
		this.doAfter("createImage", this._scaleImage);
	},
	_scaleImage: function(img) {
		var scaleFactor = this.get('scaleFactor'),
		    width = img.width || this.get('width'),
		    height = img.height || this.get('height');

		if (scaleFactor) {
			img._node.setStyles({height: scaleFactor + '%', width: scaleFactor + '%'});
		} else {
			if (width) { img._node.setStyle('width', width); }
			if (height){ img._node.setStyle('height', height); }
		}
	}
});

Y.SlideShow.ImageScaler = ImageScaling;
