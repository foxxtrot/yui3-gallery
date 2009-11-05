YUI.add("gallery-chromahash",function(C){var B='<label for="{id}" class="{color} chroma-hash"></label>',A=function(D){A.superclass.constructor.apply(this,arguments);this._animations=[];};A.NAME="ChromaHash";A.ATTRS={bars:{value:3,validator:function(D){if(D<1||D>4){return false;}}},salt:{value:"7be82b35cb0199120eea35a4507c9acf"},minimum:{value:6},node:{setter:function(D){var E=C.get(D);if(!E&&!E.test("input[type=password]")){C.fail("ChromaHash: Invalid node provided: "+D);}return E;}}};C.extend(A,C.Widget,{renderUI:function(){var F=["primary","secondary","tertiary","quaternary"].slice(0,this.get("bars")),K=this.get("contentBox"),J=this.get("node"),G,I,H=J.get("clientWidth"),E=J.get("clientHeight"),D=J.getXY();for(G=0;G<F.length;G+=1){I=C.Node.create(B.replace(/\{id\}/g,J.get("id")).replace(/\{color\}/g,F[G]));I.setStyles({position:"absolute",height:E+"px",width:"8px",margin:"5px",marginLeft:"0px",backgroundColor:this.get("node").getStyle("backgroundColor")});K.insert(I);I.setXY([D[0]+H-2+(-8*(G+1)),D[1]+3]);this._animations.push(new C.Anim({node:I,duration:0.5}));}},bindUI:function(){this._keyHandler=this.get("node").on("keyup",this._handleKey,this);},hide:function(){this.get("boundingBox").setStyle("display","none");},clear:function(){this.hide();this.get("boundingBox").set("innerHTML","");},destroy:function(){this._keyHandler.detach();this._clear();},_handleKey:function(J){var K=this.get("node"),I=K.get("value"),F,E=[],D=this.get("bars"),H,G;if(I===""){for(F=0;F<D;F+=1){E.push("fff");}}else{H=C.Crypto.MD5(""+I+":"+this.get("salt"));E=H.match(/([\dABCDEF]{6})/ig);if(I.length<this.get("minimum")){for(F=0;F<D;F+=1){G=(parseInt(E[F],16)%15).toString(16);E[F]=G+G+G;}}}C.Array.each(this._animations,function(L,M){var N=L.get("node");L.stop();L.set("from",{backgroundColor:N.getStyle("backgroundColor")});L.set("to",{backgroundColor:"#"+E[M]});L.run();});}});C.ChromaHash=A;},"@VERSION@",{requires:["widget","stylesheet","collection","anim-color","gallery-crypto-md5"]});