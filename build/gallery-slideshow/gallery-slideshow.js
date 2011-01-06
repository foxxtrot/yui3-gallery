YUI.add('gallery-slideshow', function(Y) {

var _S = function() {
		this._imageList = [];
		_S.superclass.constructor.apply(this, arguments);
	},
	ZINDEX = 'zIndex',
	SLIDESHOW = "SlideShow",
	SLIDESHOW_LC = "slideshow",
	ISNUMBER = Y.Lang.isNumber,
	getClassName = Y.ClassNameManager.getClassName,
	CLASSNAMES = {
		header: getClassName(SLIDESHOW_LC, "header"),
		body: getClassName(SLIDESHOW_LC, "body"),
		footer: getClassName(SLIDESHOW_LC, "footer")
	};
					
_S.NAME = SLIDESHOW;
_S.NS = SLIDESHOW;

_S.HTML_PARSER = 
	{
		title: function(contentBox) {
<<<<<<< HEAD
			var node = contentBox.one('.' + CLASSNAMES.header);
			return node ? node.get('innerHTML') : "";
		},
		image_height: function(contentBox) {
			var node = contentBox.one('.' + CLASSNAMES.body);
			return node ? parseInt(node.getStyle('height'), 10) : null;
		},
		image_width: function(contentBox) {
			var node = contentBox.one('.' + CLASSNAMES.body);
			return node ? parseInt(node.getStyle('width'), 10) : null;
		},
		bodyNode: 'ul.' + CLASSNAMES.body,
		headerNode: 'div.' + CLASSNAMES.header,
		footerNode: 'div.' + CLASSNAMES.footer,
		images: function(contentBox) {
			contentBox.all('.' + CLASSNAMES.body + ' li').each(function(node, index) {
=======
			var node = contentBox.one(CLASSNAMES.header);
			return node ? node.get('innerHTML') : "";
		},
		image_height: function(contentBox) {
			var node = contentBox.one(CLASSNAMES.body);
			return node ? parseInt(node.getStyle('height'), 10) : null;
		},
		image_width: function(contentBox) {
			var node = contentBox.one(CLASSNAMES.body);
			return node ? parseInt(node.getStyle('width'), 10) : null;
		},
		bodyNode: CLASSNAMES.body,
		headerNode: CLASSNAMES.header,
		footerNode: CLASSNAMES.footer,
		images: function(contentBox) {
			contentBox.all(CLASSNAMES.body + ' li').each(function(node, index) {
>>>>>>> 94439ec26f261e2b796f74cb22f5a85434b025c4
				var img = {};
				this._parseImage(node, img);
				img._node.setStyle(ZINDEX, -1*index);
				// imageList is empty at this point
				this._imageList.push(img);
			}, this);
		}
	};
_S.ATTRS = 
	{
		delay: { 
				value: 5000,
				validator: ISNUMBER
			},
		animation: {
				validator: Y.Lang.isObject,
				setter: function(v) {
					if (! (v instanceof Y.Anim) ) {
						v = new Y.Anim(v);
					}
					v.on('end', function() {
						this.endTransition();
					}, this);
					return v;
				}
			},
		image_height: {
			validator: ISNUMBER,
			setter: function(value) {
				if (this.get('rendered')) {
					this.get('bodyNode').setStyle('height', value);
				}
				return value;
			}
		},
		image_width: {
			validator: ISNUMBER,
			setter: function(value) {
				if (this.get('rendered')) {
					this.get('bodyNode').setStyle('width', value);
				}
				return value;
			}
		},
		title: {
			value: "",
			validator: Y.Lang.isString,
			setter: function(value) {
				if (this.get('rendered')) {
					this._setHeaderContents(value);
				}
				return value;
			}
		},
		images: {
			lazyAdd: false,
			validator: Y.Lang.isArray,
			getter: function() {
				return this._imageList;
			},
			setter: function(value) {
				this.clearImages();
				this.addImages(value);
			}
		},
		bodyNode: {
			writeOnce: true
		},
		headerNode: {
			writeOnce: true
		},
		footerNode: {
			writeOnce: true
		}
	};

Y.extend(_S, Y.Widget, 
	{
		TEMPLATES: {
			header: "<div class='" + CLASSNAMES.header + "'></div>",
			body:   "<ul class='" + CLASSNAMES.body + "'></ul>",
			footer: "<div class='" + CLASSNAMES.footer + "'></div>"
		},
		_renderImages: function() {
			var zIndex = 1, bodyNode = this.get('bodyNode');
			bodyNode.all('li').each(function(node) { 
				var z = +node.getStyle(ZINDEX) || 2; 
				zIndex = zIndex > z ? z : zIndex; 
			});
			Y.Array.each(this._imageList, function(value, index) {
<<<<<<< HEAD
				zIndex -= 1;
				if (!Y.Lang.isValue(value._node)) {
					this._createImage(value, zIndex);
				} else {
					value._node.setStyle(ZINDEX, zIndex);
				}
				if (index === 0) { this.currentImage = value._node; }
=======
				if (!Y.Lang.isValue(value._node)) {
					zIndex -= 1;
					var x = this._createImage(value, zIndex);
					if (index === 0) { this.currentImage = x; }
				}
>>>>>>> 94439ec26f261e2b796f74cb22f5a85434b025c4
			}, this);
		},
		_createImage: function(img, z) {
			var cb = this.get('bodyNode'),
			    div = Y.Node.create("<li><img /></li>"), 
			    div_img = div.one('img');
			div_img.set('src', img.src);
			div.setStyle(ZINDEX, z);
			img._node = div;
			cb.insert(div);
			Y.later(1000, this, function(di, cb) {
				di.setXY(cb.getXY());
			}, [div, cb]);
			return div;
		},
		_setHeaderContents: function(title) {
			var headerNode = this.get('headerNode');
			if (!Y.Lang.isValue(headerNode)) {
				headerNode = this._addTemplate(this.TEMPLATES.header, 0);
				this.set('headerNode', headerNode);
			}
			headerNode.set('innerHTML', title);
		},
		_addTemplate: function(template, where) {
			var node = Y.Node.create(template);
			this.get('contentBox').insert(node, where);
			return node;
		},
		_parseImage: function(imgNode, imgObj) {
			imgObj._node = imgNode;
			imgObj.src = imgNode.one('img').get('src');
		},
		clearImages: function() {
			if(this.get('rendered')) {
				this._destroyImagesUI();
			}
			this._imageList = [];
		},
		addImages: function(value) {
			if (Y.Lang.isArray(value)) {
				Y.Array.each(value, function(val) {
					this._imageList.push(val);
				}, this);
			} else {
				this._imageList.push(value);
			}
			if (this.get('rendered')) {
				this._renderImages();
			}
		},
		_destroyImagesUI: function() {
			this.get('bodyNode').all('li').remove();
			Y.Array.each(this._imageList, function (item) {
				delete item._node;
			});
		},
		renderUI: function() {
			var bodyNode = this.get('bodyNode'), title = this.get('title'), image_height = this.get('image_height'), image_width = this.get('image_width');

<<<<<<< HEAD
			if (title.length > 0) { this._setHeaderContents(title); }
			if (!Y.Lang.isValue(bodyNode)) { 
				bodyNode = this._addTemplate(this.TEMPLATES.body);
				this.set('bodyNode', bodyNode);
			}
=======
			if (title.length > 0) { this._setHeaderContents(title);
			if (!Y.Lang.isValue(bodyNode)) { 
				bodyNode = this._addTemplate(this.TEMPLATES.body);
				this.set('bodyNode', bodyNode);
			}}
>>>>>>> 94439ec26f261e2b796f74cb22f5a85434b025c4
			if (image_width) { bodyNode.setStyle('width', image_width); }
			if (image_height) { bodyNode.setStyle('height', image_height); }
			this._renderImages();
		},
		bindUI: function() {
			Y.later(this.get('delay'), this, "beginTransition");
		},
		beginTransition: function() {
			var anim = this.get('animation');
			
			if (anim) {
				anim.set('node', this.currentImage);
				anim.run();
			} else {
				this.endTransition();
			}
		},
		endTransition: function() {
			var images = this.get('bodyNode').all('li'),
					anim = this.get('animation');
			
			images.each(function(img, index, array) {
				var z = +img.getStyle(ZINDEX), 
				    l = -1 * array.size();
				if (z === -1) { this.currentImage = img; }
				img.setStyle(ZINDEX, z === 0 ? l + 1 : z + 1);
			}, this);
			images.setStyles(anim.get('from'));
			
			Y.later(this.get('delay'), this, "beginTransition");
		}
	});

Y.SlideShow = _S;
<<<<<<< HEAD
var ImagePadding = function(config) {
	this._ss = config.host;

	ImagePadding.superclass.constructor.apply(this, arguments);
};

ImagePadding.NS = 'padder';
ImagePadding.NAME = 'slideshowImagePadder';

Y.extend(ImagePadding, Y.Plugin.Base, {
	initializer: function(config) {
		this.doAfter("_createImage", this._padImage);
	},
	_padImage: function(img) {
		Y.later(500, this, function(imageNode, contentBox) {
			var height = parseInt(contentBox.getStyle('height'), 10),
			    width  = parseInt(contentBox.getStyle('width'), 10),
			    img_height = parseInt(imageNode.one('img').getStyle('height'), 10),
			    img_width = parseInt(imageNode.one('img').getStyle('width'), 10),
			    padding_width = (width - img_width)/2,
			    padding_height = (height - img_height)/2;
			imageNode.setStyle('padding', padding_height + ' ' + padding_width); 
		}, [img._node, this._ss.get('bodyNode')]);
	}
});

Y.SlideShow.ImagePadder = ImagePadding;
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
		this.doAfter("_createImage", this._scaleImage);
	},
	_scaleImage: function(img) {
		var scaleFactor = this.get('scaleFactor'),
		    width = img.width || this.get('width'),
		    height = img.height || this.get('height'),
		    imageNode = img._node.one('img');

		if (scaleFactor) {
			imageNode.setStyles({height: scaleFactor + '%', width: scaleFactor + '%'});
		} else {
			if (width) { imageNode.setStyle('width', width); }
			if (height){ imageNode.setStyle('height', height); }
		}
	}
});

Y.SlideShow.ImageScaler = ImageScaling;


}, '@VERSION@' ,{requires:['widget', 'substitute', 'plugin'], optional:['anim']});
=======


}, 'gallery-2010.03.23-17-54' ,{requires:['widget', 'substitute'], optional:['anim']});
>>>>>>> 94439ec26f261e2b796f74cb22f5a85434b025c4
