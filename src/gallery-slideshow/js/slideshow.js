var _S = 	function() {
						_S.superclass.constructor.apply(this, arguments);
						this._imageLoader = new Y.ImgLoadGroup({ timeLimit: 1 });
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
					validator: Y.Lang.isArray,
					setter: function(v) {
						Y.Array.each(v, function(i, d, a) {
							this._imageLoader.registerImage({srcUrl: i.src});
						}, this);
					}
				},
			animation: {
					validator: function(v) {
						return Y.Lang.isObject(Y.Anim) && v instanceof Y.Anim;
					},
					setter: function(v) {
						v.on('end', function() {
							this.endTransition();
						}, this);
					}
				}
		};

Y.extend(_S, Y.Widget, 
	{ 
		renderUI: function() {
			var cb = this.get('contentBox'), img = this.get("images");
			
			this._currentImage = Y.Node.create("<div class='yui-ss-img'><img /></div>");
			this.setImage(this._currentImage, img[0]);
			this._currentImage.setStyle('position', 'absolute');
			this._currentImage.setStyles({zIndex: 2, visibility: 'visible'});
			this._nextImage = Y.Node.create("<div class='yui-ss-img'><img /></div>");
			this._nextImage.setStyle('position', 'absolute');
			this.setImage(this._nextImage, img[1]);
			this._nextImage.setStyles({zIndex: 1, visibility: 'hidden'});
			this._currentIndex = 2;
			
			cb.insert(this._currentImage);
			cb.insert(this._nextImage);
		},
		bindUI: function() {
			Y.later(this.get('delay'), this, "beginTransition");
		},
		setImage: function(node, img) {
			var i = node.one('img'), img_width, img_height, width = this.get('width'), height = this.get('height'), padding_left, padding_top;
			i.set('src', img.src);
			i.setStyles({width: 'auto', height: 'auto'});
			img_width = img.width || i.get('width');
			img_height = img.height || i.get('height');
			padding_left = (width - img_width) / 2;
			padding_top = (height - img_height) / 2;
			i.setStyles({width: img_width, height: img_height});
			node.setStyles({padding: padding_top + " " + padding_left});
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
			
			this.setImage(this._nextImage, img[this._currentIndex++]);
			if (this._currentIndex == img.length) { this._currentIndex = 0; }
			
			Y.later(this.get('delay'), this, "beginTransition");
		}
	});

Y.SlideShow = _S;