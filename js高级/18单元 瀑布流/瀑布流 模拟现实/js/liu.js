window.onload = function() {

	var oBox = document.getElementById('box'); // 大盒子
	var clientHeight = document.documentElement.clientHeight; // 可视区的高
	var clientWidth = document.documentElement.clientWidth; // 可视区的宽
	setPos(); // 执行排列

	// 滚动的时候再执行排列
	window.onscroll = function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条
		var aImgBox = getElementsByClassName(oBox, 'imgBox'); // 所有的img元素
		var lastImgTop = getPos(aImgBox[aImgBox.length - 1]).top; // 最后一个元素到页面顶部的距离
		// 如果最后一个显示到页面中了，则重新加载
		if(lastImgTop < scrollTop + clientHeight) {
			setPos();
		}
	}

	function setPos() {
		// 根据数据渲染元素
		for(var i = 0; i < data.length; i++) {
			var src = data[i].src;
			var w = 200;
			var h = w * data[i].height / data[i].width;
			var oDiv = document.createElement('div');
			oDiv.className = 'imgBox';
			oDiv.innerHTML = '<div><img src="' + src + '" width="' + w + '" height="' + h + '" /></div>';
			oBox.appendChild(oDiv);
		}

		var aImgBox = getElementsByClassName(oBox, 'imgBox'); // 所有的元素
		var imgWidth = aImgBox[0].offsetWidth; // 单个元素宽
		var num = Math.floor(clientWidth / imgWidth); // 能放几列
		var arrHeight = [];
		oBox.style.width = num * imgWidth + 'px'; // 大盒子的宽度

		for(var i = 0, len = aImgBox.length; i < len; i++) {
			var oImg = aImgBox[i]; // 当前这个元素
			var imgHeight = oImg.offsetHeight; // 当前这个元素的高

			if(i < num) {
				// 即第一排时
				arrHeight.push(imgHeight);
			} else {
				// 第二排及以后
				var minObj = arrMin(arrHeight);
				oImg.style.position = 'absolute';
				oImg.style.left = minObj.index * imgWidth + 'px';
				oImg.style.top = minObj.value + 'px';
				arrHeight[minObj.index] += imgHeight;
			}
		}
	}

}