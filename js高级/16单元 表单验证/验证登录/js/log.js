var aInputText = document.getElementsByTagName('input'); // input元素
var oUserName = document.getElementById('UserName'); // 用户名
var oPassWord = document.getElementById('PassWord'); // 秘码
var oValidateCode = document.getElementById('ValidateCode'); // 验证码
var oText = getElementsByClassName(document, 'test-wrap')[0]; // 四字母
var ValidateHref = document.getElementById('ValidateHref'); // 换一换
var loginBtn = getElementsByClassName(document, 'loginbtn')[0]; // 提交
var aTip = getElementsByClassName(document, 'input_tip'); // 所有提示

// 换一换
var hyh = test(4);
oText.innerHTML = hyh;
ValidateHref.onclick = function() {
	hyh = test(4);
	oText.innerHTML = hyh;
}

// input得到焦点时，提示消息隐藏
for(var i = 0; i < aInputText.length; i++) {
	aInputText[i].onfocus = function() {
		var oParent = this.parentNode;
		var message = getElementsByClassName(oParent, 'input_tip')[0];
		message.style.display = 'none';
	}
}

// 用户名
oUserName.onblur = function() {
	var name = getAV('username', this.value);
	var oParent = this.parentNode;
	var message = getElementsByClassName(oParent, 'input_tip')[0];
	if(name >= 0) {
		message.style.display = 'none';
		oPassWord.focus();
	} else {
		message.style.display = 'block';
	}
}

// 秘码
oPassWord.onblur = function() {
	var name = getAV('username', oUserName.value);
	var oParent = this.parentNode;
	var message = getElementsByClassName(oParent, 'input_tip')[0];
	if(name < 0) {
		message.style.display = 'block';
		return false;
	} else if(users[name].password === this.value) {
		message.style.display = 'none';
	} else {
		message.style.display = 'block';
	}
}

// 验证码
oValidateCode.onblur = function() {
	var oParent = this.parentNode;
	var message = getElementsByClassName(oParent, 'input_tip')[0];
	if(this.value.toUpperCase() === hyh) {
		message.style.display = 'none';
	} else {
		message.style.display = 'block';
	}
}

// 提交
loginBtn.onclick = function() {
	if(!oUserName.value || !oPassWord.value || !oValidateCode.value) {
		oUserName.focus();
		oPassWord.focus();
		oValidateCode.focus();
		return false;
	}
	var name = getAV('username', oUserName.value);
	if(name >= 0 && users[name].password === oPassWord.value && hyh === oValidateCode.value.toUpperCase()) {
		open('http://login.html?username=' + encodeURI(oUserName.value) + '&' + 'password=' + encodeURI(oPassWord.value));
	} else {
		oUserName.focus();
		oPassWord.focus();
		oValidateCode.focus();
	}
}

function getAV(attr, value) {
	for(var i = 0; i < users.length; i++) {
		if(users[i][attr] === value) {
			return i;
		}
	}
	return -1;
}

//返回两个数之间的随机数。如返回2到10之间的，包括2和10。selectFrom(2, 10)
function selectFrom(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

function test(n) {
	var newArr = [];
	var arr = 'abcdefgjhiklmnopqrstuvwxyz'.split('');
	for(var i = 0; i < n; i++) {
		newArr.push(arr.splice(selectFrom(0, arr.length - 1), 1)[0]);
	}
	return newArr.join('').toUpperCase();
}