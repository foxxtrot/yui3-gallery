var _C = function(conf) { 
	this._image = {};
	_C.superclass.constructor.apply(this, arguments);
   },
   MAGNIFIER = 'Magnifier',
   MAGNIFIER_LC = 'magnifier',
   CLASSNAME = Y.ClassNameManager.getClassName(MAGNIFIER_LC, 'display'),
   HIDECLASS = Y.ClassNameManager.getClassName(MAGNIFIER_LC, 'hidden'),
   TEMPLATE = "<div><img /></div>";

_C.NAME = MAGNIFIER;
_C.NS = MAGNIFIER;
_C.ATTRS = 
	{
		host: {
			validator:function(node) {
				if(!node.test('img')) {
					Y.fail(MAGNIFIER + " can't be attached to this node.");
					return false;
				}
				return true;
			}
		},
		follow: {
			value: false,
			validator: Y.Lang.isBoolean
		},
		display: {
			writeOnce: true,
			setter: function(node) {
				node = Y.one(node);
				return node;
			}
		},
		height: {
			value: 100,
			validator: Y.Lang.isNumber
		},
		width: {
			value: 100,
			validator: Y.Lang.isNumber
		},
		zoom: {
			value: 2,
			validator: Y.Lang.isNumber
		},
		staticX: {
			validator: Y.Lang.isNumber
		},
		staticY: {
			validator: Y.Lang.isNumber
		}
 };
Y.extend(_C, Y.Plugin.Base, {
	initializer: function() {
		var host = this.get('host');
		this._image.width = parseInt(host.getStyle('width'), 10);
		this._image.height = parseInt(host.getStyle('height'), 10);
		this._renderDisplay();
		this.bindEvents();
	},
	bindEvents: function() {
		var host = this.get('host'),
                    display = this.get('display');
		host.on('mouseover', function() {
			display.removeClass(HIDECLASS);
		}, this);
		host.on('mouseout', function() {
			display.addClass(HIDECLASS);
		}, this);
		host.on('mousemove', this._moveViewport, this);
	},
	_renderDisplay: function() {
		var display = this.get('display'),
		    height = this.get('height'),
		    width = this.get('width'),
		    img;
		if (!Y.Lang.isValue(display)) {
			display = Y.Node.create('<div></div>');
			this.set('display', display);
			this.get('host').get('parentNode').append(display);
		}
		display.setContent(TEMPLATE);
		img = display.one('img');
		if (Y.Lang.isValue(height)) { display.setStyle('height', height); }
		if (Y.Lang.isValue(width)) { display.setStyle('width', width); }
		if (!this.get('follow')) {
			display.setStyles({
				top: this.get('staticY'),
				left: this.get('staticX')
			});
		} else {
			display.setStyles({
				top: 0,
				left: 0
			});
		}
		display.setStyle('position', 'absolute');
		display.addClass(CLASSNAME);
		this._configureImage();
		display.addClass(HIDECLASS);
	},
	_configureImage: function() {
		var magnificationFactor = this.get('zoom'),
		    display = this.get('display'),
		    host = this.get('host'),
		    img = display.one('img'),
		    follow = this.get('follow');

		img.set('src', host.get('src'));
		img.setStyles({height: this._image.height * magnificationFactor,
                               width: this._image.width * magnificationFactor}); 
		if (follow) {
			img.setXY(host.getXY());
		} else {
			img.setStyles({ top: this.get('staticY'), left: this.get('staticX')});
		}	
	},
	_moveViewport: function(e) {
		var magnificationFactor = this.get('zoom'),
		    display = this.get('display'),
		    view = display.one('div'),
		    host = this.get('host'),
		    x = e.pageX - host.getX(),
		    y = e.pageY - host.getY(),
		    newX = -x * magnificationFactor + this.get('height')/2,
		    newY = -y * magnificationFactor + this.get('width')/2;
		
		if (this.get('follow')) {
			display.setStyles({
				top: e.pageY,
				left: e.pageX
			});
		}
		view.setXY([newX, newY]);
	}
});
Y.Magnifier = _C;
