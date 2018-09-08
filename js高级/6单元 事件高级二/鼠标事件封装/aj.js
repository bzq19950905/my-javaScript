// 参数为事件对象，返回120或-120，正为向上，负为向下
function getWheelDelta(ev) {
	if(ev.wheelDelta) {
		// ie/chrome
		return ev.wheelDelta;
	} else {
		// firefox
		return -ev.detail * 40;
	}
}

function bind(obj, ev, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	} else {
		obj.attachEvent('on' + ev, function() {
			fn.call(obj);
		});
	}
}