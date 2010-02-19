var _S = 	function() {
						_S.superclass.constructor.apply(this, arguments);
					};
					
_S.NAME = "SlideShow";
_S.NS = "SlideShow";
_S.ATTRS = 
		{
			delay: { 
					value: 5000,
					validator: Y.Lang.isNumber
				},
			images: {
					validator: Y.Lang.isArray
				},
			animation: {
					validator: function(v) {
						return Y.Lang.isObject(Y.Anim) && v instanceof Y.Anim;
					},
					setter: function(v) {
						var s = this;
						v.on('end', function() {
							s.endTransition();
						});
					}
				}
		};

Y.extend(_S, Y.Widget, 
	{ 
		renderUI: function() {
			var cb = this.get('contentBox'), img = this.get("images");
			this._currentImage = Y.Node.create("<img style='position: absolute; visibility: visible; z-index: 2;' />");
			this._currentImage.set('src', img[0].src);
			this._nextImage = Y.Node.create("<img style='position: absolute; visibility: hidden; z-index: 1;' />");
			this._nextImage.set('src', img[1].src);
			this._currentIndex = 2;
			
			cb.insert(this._currentImage);
			cb.insert(this._nextImage);
		},
		bindUI: function() {
			this.on("slideshow:endTransition", this.endTransition);
			this.on("slideshow:beginTransition", this.beginTransition);
			Y.later(this.get('delay'), this, "beginTransition");
		},
		beginTransition: function() {
			this._nextImage.setStyle('visibility', 'visible');
						
			var anim = this.get('animation');
			
			if (anim) {
				anim.set('node', this._currentImage);
				anim.run();
			} else {
				this.endTransition();
			}
		},
		endTransition: function() {
			var temp = this._currentImage, img = this.get('images'), anim = this.get('animation');
			temp.setStyle('zIndex', 1);
			this._nextImage.setStyle('zIndex', 2);
			temp.setStyle('visibility', 'hidden');
			this._currentImage = this._nextImage;
			this._nextImage = temp;
			
			if (anim) { this._nextImage.setStyles(anim.get('from')); }
			
			this._nextImage.set('src', img[this._currentIndex++].src);
			if (this._currentIndex == img.length) { this._currentIndex = 0; }
			
			Y.later(this.get('delay'), this, "beginTransition");
		}
	});

Y.SlideShow = _S;