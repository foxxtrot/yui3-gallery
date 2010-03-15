var _S = function() {
	_S.superclass.constructor.apply(this, arguments);
}, 
	SLIDESHOW = "SlideShow", 
	ISNUMBER = Y.Lang.isNumber;
					
_S.NAME = SLIDESHOW;
_S.NS = SLIDESHOW;
_S.ATTRS = 
		{
			delay: { 
					value: 5000,
					validator: ISNUMBER
				},
			images: {
					validator: Y.Lang.isArray
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
				validator: ISNUMBER
			},
			image_width: {
				validator: ISNUMBER
			},
			title: {
				validator: Y.Lang.isString
			}
		};

Y.extend(_S, Y.Widget, 
	{
		CONTENT_TEMPLATE: "<div class='yui-slideshow-content'><div class='hd'><span class='yui-slideshow-title'></span></div><div class='bd'></div><div class='ft'></div></div>", 
		createImage: function(img, z) {
			var cb = this.get('contentBox').one('.bd'), 
					div = Y.Node.create("<div class='yui-slideshow-img'><img /></div>"), 
					div_img = div.one('img');
			div_img.set('src', img.src);
			div.setStyle('zIndex', z);
			cb.insert(div);
			Y.later(1000, this, function(di, cb) {
				di.setXY(cb.getXY());
			}, [div, cb]);
			return div;
		},
		renderUI: function() {
			var i = this.get('images'), contentBox = this.get('contentBox');
			// TODO: Add any .yui-slideshow-img instances to images array for progressive enhancement.
			contentBox.all('.yui-slideshow-img').remove();
			contentBox.one('.hd .yui-slideshow-title').set('innerHTML', this.get('title'));
			contentBox.one('.bd').setStyles({height: this.get('image_height'), width: this.get('image_width')});
			Y.Array.each(i, function(i, d, a) {
				var x = this.createImage(i, -1*d);
				if (d === 0) { this.currentImage = x; }
			}, this);
		},
		bindUI: function() {
			Y.later(this.get('delay'), this, "beginTransition");
		},
		setImage: function(node, img) {
			var i = node.one('img');
			i.set('src', img.src);
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
			var images = this.get('contentBox').all('.yui-slideshow-img'),
					anim = this.get('animation');
			
			images.each(function(img, index, array) {
				var z = +img.getStyle('zIndex'), 
				    l = -1 * array.size();
				if (z === -1) { this.currentImage = img; }
				img.setStyle('zIndex', z === 0 ? l + 1 : z + 1);
			}, this);
			images.setStyles(anim.get('from'));
			
			Y.later(this.get('delay'), this, "beginTransition");
		}
	});

Y.SlideShow = _S;
