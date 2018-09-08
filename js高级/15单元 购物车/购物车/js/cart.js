var data = []; // 数据
var oParent = null, // ul列表盒子
	aChild = null, // 列表项li
	aCheckBtn = null, // 单项产品的选择按钮label
	aProductTitle = null, // 商品名称
	aCost = null, // 单项产品的单价span
	aCountInput = null, // 单项产品的个数input
	aReduce = null, // 单项产品减的按钮
	aAdd = null, // 单项产品加的按钮
	aOneCost = null, // 单项产品的总金额
	aDeletBtn = null; // 单项产品删除按钮

var carFoot = getElementsByClassName(document, 'car-foot-bottom')[0], // 底部盒子
	oAllBtn = getElementsByClassName(carFoot, 'allBtn')[0], // 全选按钮
	oAllNum = getElementsByClassName(carFoot, 'allNum')[0], // 已选商品总件数
	oAllCost = getElementsByClassName(carFoot, 'allCost')[0]; // 已选商品总价格

getEle(); // 获取元素
init(); // 初始化
change(); // 操作

// 获取元素
function getEle() {
	oParent = document.getElementById('car-cont');
	aChild = oParent.children;
	aCheckBtn = getElementsByClassName(oParent, 'checkBtn');
	aProductTitle = getElementsByClassName(oParent, 'productTitle');
	aCost = getElementsByClassName(oParent, 'cost');
	aCountInput = getElementsByClassName(oParent, 'count-input');
	aReduce = getElementsByClassName(oParent, 'reduce');
	aAdd = getElementsByClassName(oParent, 'add');
	aOneCost = getElementsByClassName(oParent, 'oneCost');
	aDeletBtn = getElementsByClassName(oParent, 'deletBtn');
}

// 初始化数据
function init() {
	data = [];
	for(var i = 0; i < aChild.length; i++) {
		var listData = {};
		listData.isCheck = (hasClass(aCheckBtn[i], 'checked') >= 0) ? true : false; // 单个产品是否选中
		listData.title = aProductTitle[i].innerHTML; // 单个商品名
		listData.cost = parseFloat(aCost[i].innerHTML); // 单个产品单价
		listData.num = parseFloat(aCountInput[i].value); // 单个产品个数
		listData.oneCost = listData.cost * listData.num; // 单个产品总金额
		data.push(listData);
	}
	// console.log(data);
	viewFn(); // 渲染视图
}

// 渲染视图
function viewFn() {
	var count = 0; // 计数，计算单项产品选中的个数，当它同总个数相等时，全选也选中。
	var countNum = 0; // 总件数
	var allCostNum = 0; // 总金额

	for(var i = 0; i < aChild.length; i++) {
		aOneCost[i].innerHTML = data[i].oneCost; // 给单项产品添加总金额
		data[i].isCheck ? count++ : count; // 计数，用于是否全选
		// 只有选中的状态下，才计算总件数和总金额
		if(data[i].isCheck) {
			addClass(aChild[i], 'active');
			countNum += data[i].num;
			allCostNum += data[i].oneCost;
		} else {
			removeClass(aChild[i], 'active');
		}
	}
	// 是否全选
	(count === aChild.length && count > 0) ? addClass(oAllBtn, 'checked'): removeClass(oAllBtn, 'checked');
	// 总件数
	oAllNum.innerHTML = countNum;
	// 总金额
	oAllCost.innerHTML = allCostNum;
}

// 操作
function change() {
	// 点击单个按钮改变数据并同时渲染视图
	for(var i = 0; i < aCheckBtn.length; i++) {
		aCheckBtn[i].index = i;
		aCheckBtn[i].onclick = function() {
			if(hasClass(this, 'checked') >= 0) {
				removeClass(this, 'checked');
			} else {
				addClass(this, 'checked');
			}
			init();
		}
	}

	// 全选
	oAllBtn.onclick = function() {
		if(hasClass(this, 'checked') >= 0) {
			removeClass(this, 'checked');
			for(var i = 0; i < aCheckBtn.length; i++) {
				removeClass(aCheckBtn[i], 'checked');
			}
		} else {
			addClass(this, 'checked');
			for(var i = 0; i < aCheckBtn.length; i++) {
				addClass(aCheckBtn[i], 'checked');
			}
		}
		init();
	}

	// 单项商品加
	for(var i = 0; i < aAdd.length; i++) {
		aAdd[i].index = i;
		aAdd[i].onclick = function() {
			data[this.index].num++;
			aCountInput[this.index].value = data[this.index].num;
			init();
		}
	}

	// 单项商品减
	for(var i = 0; i < aReduce.length; i++) {
		aReduce[i].index = i;
		aReduce[i].onclick = function() {
			var n = data[this.index].num;
			n--;
			if(n <= 0) {
				n = 1;
			}
			aCountInput[this.index].value = n;
			init();
		}
	}

	// 更改商品个数的input输入框
	for(var i = 0; i < aCountInput.length; i++) {
		aCountInput[i].index = i;
		aCountInput[i].onchange = function() {
			var value = this.value;
			if(isNaN(value)) {
				alert('请输入数字');
				this.value = 1;
			} else {
				if(this.value < 1) {
					alert('请输入大于等于1的数字');
					this.value = 1;
				} else {
					init();
				}
			}
		}
	}

	for(var i = 0; i < aDeletBtn.length; i++) {
		aDeletBtn[i].index = i;
		aDeletBtn[i].onclick = function() {
			data.splice(this.index, 1);
			oParent.removeChild(aChild[this.index]);

			getEle(); // 获取元素
			init(); // 初始化
			change();
		}
	}
}