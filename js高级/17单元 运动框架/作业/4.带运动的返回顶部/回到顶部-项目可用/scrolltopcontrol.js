
addLoadEvent(motionTop);

function motionTop(){
	
	//创建元素，添加样式，并添加到body中
	var oDiv = document.createElement("div");
	oDiv.style.cssText = "width:100px;height:100px;background:#f00;position:absolute;right:0;top:0;filter:alpha(opacity=0);opacity:0;";
	document.body.appendChild(oDiv);
	
	var bottomH = 50;	//按钮距底的距离
	var rightW = 50;	//按钮距右的距离
	var scrolltopcontrol_Timer = null;		//定时器
	
	setTop();
	window.onscroll = function(){
		setTop();
	}
	
	//点击返回
	oDiv.onclick = function(){
		clearInterval(scrolltopcontrol_Timer);
		var iCur = iSpeed = 0;		//滚动条的当前值和速度，初始化都为0
		scrolltopcontrol_Timer = setInterval(function(){
			iCur = document.documentElement.scrollTop || document.body.scrollTop;
			iSpeed = Math.floor( ( 0 - iCur ) / 8 );
			if( iCur == 0 ){		//等于0，说明运动到顶部了，否则就给滚动条赋值
				clearInterval(scrolltopcontrol_Timer);
			}else{
				document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
			}
		},30)
	}
	
	//固定在右下角
	function setTop(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;								//滚动条的距离
		oDiv.style.top = scrollTop + document.documentElement.clientHeight - oDiv.offsetHeight - bottomH + "px";	//滚动条+可视区-元素高
		oDiv.style.right = rightW + "px";
		if( scrollTop<100 ){
			startMove(oDiv,{opacity:0},function(){
				oDiv.style.display = "none";
			});
		}else{
			oDiv.style.display = "block";
			startMove(oDiv,{opacity:100});
		}
	}
	
}


//以下三个函数是公共函数

//替换window.onload可添加多个
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
};

//运动函数
function startMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iCur = 0;
	var iSpeed = 0;
		
	obj.iTimer = setInterval(function() {
		
		var iBtn = true;
					
		for ( var attr in json ) {
							
			var iTarget = json[attr];
			
			if (attr == 'opacity') {
				iCur = Math.round(getStyle( obj, 'opacity' ) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			
			iSpeed = ( iTarget - iCur ) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if (iCur != iTarget) {
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			
		}
		
		if (iBtn) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
		
	}, 30);
}

//获取元素样式函数
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

