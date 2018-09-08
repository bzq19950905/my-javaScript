// 看obj是否有classname这个class名，没有返回-1，有返回012下标
function hasClass(obj, classname) {
	// 如果这个元素没有class，直接返回
	if(!obj.className) {
		return -1;
	}
	// 如果这个元素有class，则取得所有的class，拆分成数组，遍历，同classname比较，有同名的，则返回下标，否则返回-1
	var classArray = obj.className.split(' ');
	for(var i = 0, len = classArray.length; i < len; i++) {
		if(classArray[i] === classname) {
			return i;
		}
	}
	return -1;
}

// 给某个元素添加class
function addClass(obj, classname) {
	if(!obj.className) {
		// 元素没有class名，则直接添加
		obj.className = classname;
	} else {
		// 元素有class名，则分两种情况，看有没有给定的classname，如果有，则啥也不干，没有才添加
		if(hasClass(obj, classname) === -1) {
			obj.className += ' ' + classname;
		}
	}
}

// 删除某个元素上的class
function removeClass(obj, classname) {
	var index = hasClass(obj, classname);
	if(index !== -1) {
		// 得有这个classname，才删除
		var arr = obj.className.split(' ');
		arr.splice(index, 1);
		obj.className = arr.join(' ');
	}
}

// 通过classname获取元素，返回元素集合
function getElementsByClassName(parent, classname) {
	var arr = [];
	var elems = parent.getElementsByTagName("*");
	for(var i = 0, len = elems.length; i < len; i++) {
		if(hasClass(elems[i], classname) !== -1) {
			arr.push(elems[i]);
		}
	}
	return arr;
}

//获取ID的方法		如：var oW=id("welcome");
function id(obj) {
	return document.getElementById(obj);
}