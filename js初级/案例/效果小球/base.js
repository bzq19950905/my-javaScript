function sj(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr]; //678支持
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

//运动框架
//参数解析obj:要动的对象data:包含属性及要改变为的目标fn:连接
function startMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iCur = 0;
	var iSpeed = 0;

	obj.iTimer = setInterval(function() {

		var iBtn = true;

		for(var attr in json) {

			var iTarget = json[attr];

			if(attr == 'opacity') {
				iCur = Math.round(getStyle(obj, 'opacity') * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			iSpeed = (iTarget - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if(iCur != iTarget) {
				iBtn = false;
				if(attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}

		}

		if(iBtn) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}

	}, 30);
}