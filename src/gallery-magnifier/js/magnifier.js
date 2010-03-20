var _C = function(conf) { 
	this._image = {};
	_C.superclass.constructor.apply(this, arguments);
   },
   MAGNIFIER = 'Magnifier',
   MAGNIFIER_LC = 'magnifier',
   CLASSNAME = Y.ClassNameManager.getClassName(MAGNIFIER_LC, 'display'),
   HIDECLASS = Y.ClassNameManager.getClassName(MAGNIFIER_LC, 'hidden'),
   TEMPLATE = "<div><div><img /></div></div>";

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
		    host = this.get('host'),
		    img;
		if (!Y.Lang.isValue(display)) {
			display = Y.Node.create(TEMPLATE);
			this.set('display', display);
			this.get('host').get('parentNode').append(display);
		}
		img = display.one('img');
		if (Y.Lang.isValue(height)) { display.setStyle('height', height); }
		if (Y.Lang.isValue(width)) { display.setStyle('width', width); }
		display.addClass(CLASSNAME);
		this._configureImage();
		display.addClass(HIDECLASS);
	},
	_configureImage: function() {
		var magnificationFactor = this.get('zoom'),
		    display = this.get('display'),
		    img = display.one('img'),
		    host = this.get('host'),
		    host_xy = host.getXY(),
		    img_xy = display.getXY();

		img.set('src', host.get('src'));
		img.setStyles({height: this._image.height * magnificationFactor,
                               width: this._image.width * magnificationFactor}); 
		// The following will work when the image zoom follows the cursor
		//img.setXY(host.getXY());
		img.setXY(img_xy);
	},
	_moveViewport: function(e) {
		var magnificationFactor = this.get('zoom'),
		    view = this.get('display').one('div'),
		    host = this.get('host'),
		    x = e.pageX - host.getX(),
		    y = e.pageY - host.getY(),
		    newX = -x * magnificationFactor + this.get('height')/2,
		    newY = -y * magnificationFactor + this.get('width')/2;

		//Y.log("Setting to: [" + newX + ", " + newY + "]");
		view.setXY([newX, newY]);
	}
});
Y.Magnifier = _C;
