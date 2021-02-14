(function () {
	"use strict";var TweenCanvas={defaults:{width:0,height:0,fill:0,canvas:0,tempCanvas:0,ctx:0,tempctx:0,paused:!1,objects:[],preload:[],idCount:0},create:function(t,e,i){return this.defaults.width=t,this.defaults.height=e,i&&(this.defaults.fill=i),this.defaults.canvas=document.getElementById("banner1_322183583"),this.defaults.tempCanvas=document.createElement("canvas"),this.defaults.canvas.width=t,this.defaults.canvas.height=e,this.defaults.canvas.style.position="absolute",this.defaults.tempCanvas.width=t,this.defaults.tempCanvas.height=e,this.defaults.ctx=this.defaults.canvas.getContext("2d"),this.defaults.tempctx=this.defaults.tempCanvas.getContext("2d"),this.rafFix(),this.defaults.canvas},rafFix:function(){for(var t=0,e=["webkit","moz"],i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,i){var a=(new Date).getTime(),s=Math.max(0,16-(a-t)),n=window.setTimeout(function(){e(a+s)},s);return t=a+s,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},extend:function(t,e){for(var i in e)if("object"!=typeof e[i]||Array.isArray(e[i]))e.hasOwnProperty(i)&&(t[i]=e[i]);else for(var a in e[i])e[i].hasOwnProperty(a)&&(t[i][a]=e[i][a]);return t},createEmptyObject:function(t){var e={id:0,x:0,y:0,scaleX:1,scaleY:1,centerX:0,centerY:0,transformOrigin: "50% 50%",rotation:0,alpha:1,mask:[],invertMask:!1,blendmode:"source-over",filter:"none"};return t.imageObj&&(e.imageObj={url:0,src:0}),t.pointObj&&(e.pointObj={points:[],closePath:!0,fill:{color:"white"},stroke:0}),t.textObj&&(e.textObj={text:0,font:"Arial",fontSize:10,lineHeight:0,textWidth:0,textHeight:0,textAlign:"left",lines:[],fill:{color:"white"},stroke:0,fontLoaded:0,bitmapText:0,bitMap:0}),t.arcObj&&(e.arcObj={radius:0,startAngle:0,endAngle:0,counterclockwise:!1,stroke:{color:"white",width:0}}),e=this.extend(e,t||{})},createObject:function(t){var e=this.createEmptyObject(t);return e.imageObj||e.textObj?this.defaults.preload.push(e):this.calcCenter(e),e.id||(e.id=this.defaults.idCount++),e.textObj&&(e.textObj.lines=e.textObj.text.split("<br>"),e.textObj.lineHeight||(e.textObj.lineHeight=e.textObj.fontSize)),this.defaults.objects.push(e),e},deleteObject:function(t){for(var e=0;e<this.defaults.objects.length;e++)if(this.defaults.objects[e].id===t.id){this.defaults.objects.splice(e,1);break}},setMask:function(t,e){for(var i=0;i<this.defaults.objects.length;i++)if(this.defaults.objects[i].id===e.id){t.mask.push(this.defaults.objects.splice(i,1)[0]);break}},preload:function(t){var e=this;if(this.defaults.preload.length){var i=this.defaults.preload.pop();if(i.imageObj){var a=new Image;a.onload=function(){i.imageObj.src=this,e.calcCenter(i),e.preload(t)},a.onerror=function(){console.warn("Image doesnt exist: "+this.src),e.preload(t)},a.src=i.imageObj.url;a.width=i.imageObj.width;a.height=i.imageObj.height;}if(i.textObj){var s=this.createTextMeasuringObj(i);document.body.appendChild(s);var n=setInterval(function(){if(e.defaults.ctx.font=i.textObj.fontSize+"pt "+i.textObj.font,e.fontLoaded(s,i.textObj.font)){if(clearInterval(n),i.textObj.textWidth=s.clientWidth,i.textObj.textHeight=s.clientHeight,i.textObj.fontLoaded=!0,document.body.removeChild(s),i.textObj.bitmapText){e.defaults.tempCanvas.width=i.textObj.textWidth,e.defaults.tempCanvas.height=i.textObj.textHeight;var a={id:0,x:0,y:0,scaleX:1,scaleY:1,centerX:0,centerY:0,rotation:0,alpha:1,textObj:i.textObj};e.drawObject(a,e.defaults.tempctx);var r=new Image;r.src=e.defaults.tempCanvas.toDataURL(),i.textObj.bitMap=r,e.defaults.tempctx.clearRect(0,0,e.defaults.width,e.defaults.height),e.defaults.tempCanvas.width=e.defaults.width,e.defaults.tempCanvas.height=e.defaults.height}e.calcCenter(i),e.preload(t)}},100)}}else t&&t()},calcCenter:function(t){if(t.pointObj){for(var e=t.pointObj.points.length,i=-1/0,a=-1/0,s=1/0,n=1/0;e--;)t.pointObj.points[e][0]>i&&(i=t.pointObj.points[e][0]),t.pointObj.points[e][1]>a&&(a=t.pointObj.points[e][1]),t.pointObj.points[e][0]<s&&(s=t.pointObj.points[e][0]),t.pointObj.points[e][1]<n&&(n=t.pointObj.points[e][1]);t.centerX=(i+s)/2,t.centerY=(a+n)/2,t.transformOrigin&&this.setTransformOrigin(t)}t.arcObj&&(t.centerX=t.centerY=t.arcObj.radius/2,t.transformOrigin&&this.setTransformOrigin(t)),t.imageObj&&(t.centerX=t.imageObj.src.width/2,t.centerY=t.imageObj.src.height/2,t.transformOrigin&&this.setTransformOrigin(t)),t.textObj&&(t.centerX=t.textObj.textWidth/2,t.centerY=t.textObj.textHeight/2,t.transformOrigin&&this.setTransformOrigin(t))},createTextMeasuringObj:function(t){var e=document.createElement("span");return e.style.width="auto",e.style.height="auto",e.style.display="inline-block",e.style.whiteSpace="nowrap",e.style.position="absolute",e.style.fontFamily=t.textObj.font,e.style.fontSize=t.textObj.fontSize+"pt",e.style.lineHeight=t.textObj.lineHeight+"pt",e.style.top="-3000px",e.style.left="-3000px",e.style.color="black",e.style.border="1px solid red",e.innerHTML=t.textObj.text,e},setTransformOrigin:function(t){var e=t.transformOrigin.replace(/%/gi,"").split(" ");2!=e.length||isNaN(Number(e[0]))||isNaN(Number(e[1]))?console.warn("transformOrigin values incorrect: "+t.transformOrigin):(t.centerX=Number(e[0])/100*t.centerX*2,t.centerY=Number(e[1])/100*t.centerY*2)},fontLoaded:function(t,e){for(var i=["serif","sans-serif","monospace","cursive","fantasy"],a=0,s=0,n=0;n<i.length;++n){if(t.style.fontFamily='"'+e+'",'+i[n],a=t.offsetWidth,n>0&&a!=s)return!1;s=a}return!0},clear:function(){this.defaults.ctx.clearRect(0,0,this.defaults.width,this.defaults.height)},listObjects:function(){for(var t=0;t<this.defaults.objects.length;t++)console.log(this.defaults.objects[t])},render:function(){if(!this.defaults.paused){this.clear(),this.defaults.ctx.save(),this.defaults.fill&&(this.defaults.ctx.fillStyle=this.defaults.fill,this.defaults.ctx.fillRect(0,0,this.defaults.width,this.defaults.height)),this.defaults.ctx.restore();for(var t=0;t<this.defaults.objects.length;t++){if(this.defaults.ctx.save(),this.defaults.objects[t].mask.length){this.defaults.tempctx.clearRect(0,0,this.defaults.width,this.defaults.height);for(var e=0;e<this.defaults.objects[t].mask.length;e++)this.defaults.tempctx.save(),this.drawObject(this.defaults.objects[t].mask[e],this.defaults.tempctx),this.defaults.tempctx.restore();this.defaults.objects[t].invertMask?this.defaults.tempctx.globalCompositeOperation="source-out":this.defaults.tempctx.globalCompositeOperation="source-in",this.defaults.tempctx.save(),this.drawObject(this.defaults.objects[t],this.defaults.tempctx),this.defaults.tempctx.restore(),this.defaults.ctx.globalCompositeOperation=this.defaults.objects[t].blendmode,this.defaults.ctx.drawImage(this.defaults.tempCanvas,0,0),this.defaults.tempctx.globalCompositeOperation="source-over",this.defaults.ctx.globalCompositeOperation="source-over"}else this.defaults.ctx.globalCompositeOperation=this.defaults.objects[t].blendmode,this.defaults.ctx.filter=this.defaults.objects[t].filter,this.drawObject(this.defaults.objects[t],this.defaults.ctx),this.defaults.ctx.filter="none",this.defaults.ctx.globalCompositeOperation="source-over";this.defaults.ctx.restore()}window.requestAnimationFrame(this.render.bind(this))}},drawObject:function(t,e){if(e.translate(t.x+t.centerX,t.y+t.centerY),e.rotate(t.rotation*Math.PI/180),e.scale(t.scaleX,t.scaleY),e.translate(-t.centerX,-t.centerY),e.globalAlpha=t.alpha,t.pointObj){e.beginPath(),e.moveTo(t.pointObj.points[0][0],t.pointObj.points[0][1]);for(var i=1;i<t.pointObj.points.length;i++)e.lineTo(t.pointObj.points[i][0],t.pointObj.points[i][1]);t.pointObj.closePath&&e.closePath(),t.pointObj.fill&&(t.pointObj.fill.gradient?e.fillStyle=this.gradient(t.pointObj.fill.gradient,e):e.fillStyle=t.pointObj.fill.color,e.fill()),t.pointObj.stroke&&(t.pointObj.stroke.gradient?e.strokeStyle=this.gradient(t.pointObj.fill.gradient,e):e.strokeStyle=t.pointObj.stroke.color,e.lineWidth=t.pointObj.stroke.width,e.stroke())}t.arcObj&&(e.beginPath(),e.arc(0,0,t.arcObj.radius,t.arcObj.startAngle/180*Math.PI,t.arcObj.endAngle/180*Math.PI,t.arcObj.counterclockwise),t.arcObj.fill&&(t.arcObj.fill.gradient?e.fillStyle=this.gradient(t.arcObj.fill.gradient,e):e.fillStyle=t.arcObj.fill.color,e.fill()),t.arcObj.stroke&&(t.arcObj.stroke.gradient?e.strokeStyle=this.gradient(t.arcObj.stroke.gradient,e):e.strokeStyle=t.arcObj.stroke.color,e.lineWidth=t.arcObj.stroke.width,e.stroke())),t.textObj&&t.textObj.fontLoaded&&(t.textObj.bitMap?e.drawImage(t.textObj.bitMap,0,0,t.textObj.bitMap.width,t.textObj.bitMap.height):(e.font=t.textObj.fontSize+"pt "+t.textObj.font,e.textBaseline="alphabetic",e.textAlign=t.textObj.textAlign,t.textObj.fill&&(e.fillStyle=t.textObj.fill.color),t.textObj.stroke&&(e.strokeStyle=t.textObj.stroke.color,e.lineWidth=t.textObj.stroke.width),t.textObj.lines.forEach(function(i,a){t.textObj.fill&&("left"===t.textObj.textAlign&&e.fillText(i,0,(a+1.25)*t.textObj.lineHeight),"center"===t.textObj.textAlign&&e.fillText(i,t.textObj.textWidth/2,(a+1)*t.textObj.lineHeight),"right"===t.textObj.textAlign&&e.fillText(i,t.textObj.textWidth,(a+1)*t.textObj.lineHeight)),t.textObj.stroke&&("left"===t.textObj.textAlign&&e.strokeText(i,0,(a+1.25)*t.textObj.lineHeight),"center"===t.textObj.textAlign&&e.strokeText(i,t.textObj.textWidth/2,(a+1)*t.textObj.lineHeight),"right"===t.textObj.textAlign&&e.strokeText(i,t.textObj.textWidth,(a+1)*t.textObj.lineHeight))}))),t.imageObj&&e.drawImage(t.imageObj.src,0,0,t.imageObj.src.width,t.imageObj.src.height)},gradient:function(t,e){var i;return"radial"==t.type&&(i=e.createRadialGradient(t.startX,t.startY,t.startRadius,t.endX,t.endY,t.endRadius),t.colorStop.forEach(function(e,a){i.addColorStop(t.colorStop[a][0],t.colorStop[a][1])})),"linear"==t.type&&(i=e.createLinearGradient(t.startX,t.startY,t.endX,t.endY),t.colorStop.forEach(function(e,a){i.addColorStop(t.colorStop[a][0],t.colorStop[a][1])})),i},pause:function(){this.defaults.paused=!0,window.cancelAnimationFrame(this.render)},start:function(){this.defaults.paused=!1,window.requestAnimationFrame(this.render.bind(this))}};
		
		var bannerCanvas = TweenCanvas.create(1440, 846, "#ffffff");
		document.body.appendChild(bannerCanvas);
		
		var img_113 = TweenCanvas.createObject({
			x: 0,
			y: 0,
			alpha: 0,
			imageObj: {
				url: "images/rectangle-2_971103759.svg",
				width: 1440,
				height: 689,
			},
		});
		
		var img_115 = TweenCanvas.createObject({
			x: 340,
			y: 94,
			alpha: 0,
			imageObj: {
				url: "images/img20190529174529-1_614640155.png",
				width: 1100,
				height: 595,
			},
		});
		
		var img_116 = TweenCanvas.createObject({
			x: 0,
			y: 94,
			alpha: 0,
			imageObj: {
				url: "images/rectangle-3_198734273.svg",
				width: 1440,
				height: 595,
			},
		});
		
		var img_114 = TweenCanvas.createObject({
			x: 150,
			y: 145,
			alpha: 0,
			imageObj: {
				url: "images/firma-wykonawcza_056132229.svg",
				width: 317,
				height: 49,
			},
		});
		
		var img_110 = TweenCanvas.createObject({
			x: 150,
			y: 232,
			alpha: 0,
			imageObj: {
				url: "images/1613311238555-1_135320662.png",
				width: 684,
				height: 382,
			},
		});
		
		var img_117 = TweenCanvas.createObject({
			x: 150,
			y: 24,
			alpha: 0,
			imageObj: {
				url: "images/dm_919894612.svg",
				width: 59,
				height: 49,
			},
		});
		
		var img_205 = TweenCanvas.createObject({
			x: 1230,
			y: 33,
			alpha: 0,
			imageObj: {
				url: "images/log-in_580508529.svg",
				width: 61,
				height: 31,
			},
		});
		
		var img_118 = TweenCanvas.createObject({
			x: 0,
			y: 686,
			alpha: 0,
			imageObj: {
				url: "images/wood-08-2k-base-color2-1_862193078.jpg",
				width: 1440,
				height: 33,
			},
		});
		
		TweenCanvas.preload(function() {
			startAnimation();
		});
		
		function startAnimation() {
			TweenCanvas.start();
			
			gsap.defaults({ transformOrigin: '0.5, 0.5' });
			
			gsap.to(img_113, { alpha: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_113, {
				duration: 0.5,
				delay: 1.1,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_115, { alpha: 0, x: 340, y: 94, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_115, {
				duration: 1.3,
				delay: 0.8,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 340, y: 94, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1.3, alpha: 1, x: 340, y: 94, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_116, { alpha: 0, x: 0, y: 94, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_116, {
				duration: 1.4,
				delay: 0,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 0, y: 94, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1.4, alpha: 1, x: 0, y: 94, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_114, { alpha: 0, x: 150, y: 145, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_114, {
				duration: 0.5,
				delay: 0.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 150, y: 145, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 150, y: 145, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_110, { alpha: 0, x: 150, y: 232, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_110, {
				duration: 1.1,
				delay: 0,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 150, y: 232, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1.1, alpha: 1, x: 150, y: 232, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_117, { alpha: 0, x: 150, y: 24, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_117, {
				duration: 0.9,
				delay: 0.6,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 150, y: 24, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.9, alpha: 1, x: 150, y: 24, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_205, { alpha: 0, x: 1230, y: 33, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_205, {
				duration: 1,
				delay: 0.6,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1230, y: 33, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 1, x: 1230, y: 33, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_118, { alpha: 0, x: 0, y: 686, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_118, {
				duration: 0.8,
				delay: 1.4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 0, y: 686, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.8, alpha: 1, x: 0, y: 686, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
		}})();