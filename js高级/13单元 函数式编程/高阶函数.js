// 自己实现的forEach方法，它没有返回值，传入两个参数，一个是要遍历的数组，一个是回调，回调函数接收三个参数，value, index, arr
function foreach(arr, callback) {
	for(var i = 0, len = arr.length; i < len; i++) {
		callback(arr[i], i, arr);
	}
}

// 自己实现的map方法，返回操作每一项返回的值组成的新数组。它接收两个参数，一个要遍历的数组，一个回调函数，回调函数接收三个参数，分别是value, index, arr
function mapFn(arr, callback) {
	var newArr = [];
	for(var i = 0, len = arr.length; i < len; i++) {
		newArr.push(callback(arr[i], i, arr));
	}
	return newArr;
}

// 自己实现的filter方法，有返回值，返回回调函数返回true时的项组成的数组。它接收两个参数，一个是要遍历的数组，一个是回调函数，回调函数接收三个参数，分别是value, index, arr
function filter(arr, callback) {
	var newArr = [];
	for(var i = 0, len = arr.length; i < len; i++) {
		if(callback(arr[i], i, arr)) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
