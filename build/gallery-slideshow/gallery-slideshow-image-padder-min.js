<<<<<<< HEAD
YUI.add("gallery-slideshow-image-padder",function(B){var A=function(C){this._ss=C.host;A.superclass.constructor.apply(this,arguments);};A.NS="padder";A.NAME="slideshowImagePadder";B.extend(A,B.Plugin.Base,{initializer:function(C){this.doAfter("_createImage",this._padImage);},_padImage:function(C){B.later(500,this,function(K,G){var E=parseInt(G.getStyle("height"),10),H=parseInt(G.getStyle("width"),10),J=parseInt(K.one("img").getStyle("height"),10),F=parseInt(K.one("img").getStyle("width"),10),I=(H-F)/2,D=(E-J)/2;K.setStyle("padding",D+" "+I);},[C._node,this._ss.get("bodyNode")]);}});B.SlideShow.ImagePadder=A;},"@VERSION@",{requires:["gallery-slideshow-base","plugin"]});
=======
YUI.add("gallery-slideshow-image-padder",function(B){var A=function(C){this._ss=C.host;A.superclass.constructor.apply(this,arguments);};A.NS="padder";A.NAME="slideshowImagePadder";B.extend(A,B.Plugin.Base,{initializer:function(C){this.doAfter("_createImage",this._padImage);},_padImage:function(C){B.later(500,this,function(K,G){var E=parseInt(G.getStyle("height"),10),H=parseInt(G.getStyle("width"),10),J=parseInt(K.one("img").getStyle("height"),10),F=parseInt(K.one("img").getStyle("width"),10),I=(H-F)/2,D=(E-J)/2;K.setStyle("padding",D+" "+I);},[C._node,this._ss.get("bodyNode")]);}});B.SlideShow.ImagePadder=A;},"gallery-2010.03.23-17-54",{requires:["gallery-slideshow","plugin"]});
>>>>>>> 94439ec26f261e2b796f74cb22f5a85434b025c4