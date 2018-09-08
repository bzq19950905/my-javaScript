window.onload = function() {
	var data = []; // 数据
	for(var i = 1; i <= 24; i++) {
		data.push('img/img' + i + '.jpg');
	}

	var oBox = document.getElementById('box'); // 大盒子
	var clientHeight = document.documentElement.clientHeight; // 可视区的高度
	
	setPos(); // 执行排列
	
	// 滚动的时候再执行排列
	window.onscroll = function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条
		var aImgBox = getElementsByClassName(oBox, 'imgBox'); // 所有的img元素
		var lastImgTop = getPos(aImgBox[aImgBox.length - 1]).top; // 最后一个元素到页面顶部的距离
		// 如果最后一个显到页面中了，则重新加载
		if(lastImgTop < scrollTop + clientHeight) {
			for(var i = 0; i < data.length; i++) {
				var oDiv = document.createElement('div');
				oDiv.className = 'imgBox';
				oDiv.innerHTML = '<div><img src="img/img' + i + '.jpg" alt="" /></div>';
				oBox.appendChild(oDiv);
			}
			setPos();
		}

	}

	function setPos() {
		var winWidth = document.documentElement.clientWidth; // 浏览器宽
		var aImgBox = getElementsByClassName(oBox, 'imgBox'); // 所有的元素
		var imgWidth = aImgBox[0].offsetWidth; // 单个元素宽
		var num = Math.floor(winWidth / imgWidth); // 能放几列
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
				// 返回arrHeight这个数组的最小值及下标，value为最小值，index为下标
				var minObj = arrMin(arrHeight);
				oImg.style.position = 'absolute';
				oImg.style.left = minObj.index * imgWidth + 'px';
				oImg.style.top = minObj.value + 'px';
				arrHeight[minObj.index] += imgHeight;
			}
		}
	}

}