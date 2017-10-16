//author:fuhc
// import info from 'infoType.js'
import env from './env'
import infoType from './infoType'

export default {

	/** @description 打印的次数 */
	logCount: 0,
	/** @description 访问域名  */
	baseUrl: env.baseUrl,
	/**
	 * @param {obj} vue-obj
	 * @param {String} url
	 * @param {Object} data
	 * @param {Function} success(res_data)
	 * @param {Function} error()
	 * @description VUE-post HTTP
	 */
	post: function(param = {}) {
		let obj = param.obj || null;
		if (obj == null) {
			console.warn('post请求中的obj值为当前this,必传');
			return;
		}
		let url = param.url || '';
		let data = param.data || {};
		let success = param.success || function() {};
		let error = param.error || function() {};

		obj.$http.post(env.baseUrl + url, data, {
			emulateJSON: true
		}).then(function(res) {
			let res_data = res['body'];
			if (typeof(success) == "function") {
				if (success) {
					success(res_data);
				}
			}
		}, function(err) {
			if (typeof(error) == "function") {
				if (error) {
					error();
				}
			}
		});
	},
	/**
	 * @description 判断是否登录
	 * */
	isLogin: function(param) {
		let url = '/site/check-login';
		let success = param.success || function() {};
		let error = param.error || function() {};
		let obj = param.obj || null;
		let token = this.getStorage(infoType.codeToken);
		let userInfo = this.getStorage(infoType.codeUserKey)
		if (obj == null) console.error('the type of param.obj is Object,But get a null');
		if (token) {
			if (typeof(success) == 'function') {
				if (success) {
					success(userInfo, token)
				} else {
					console.error('no where use the success');
				}
			} else {
				console.error('success want a function');
			}
			return;
		}
		obj.$http.post(env.baseUrl + url, {}, {
			emulateJSON: true
		}).then((res)=> {
			let res_data = res['body'];
			if(res_data.flag==false){
				if (typeof(error) == "function") {
					if (error) {
						error();
					}
				}
			}else{
				if (typeof(success) == "function") {
					if (success) {
						let user = res_data.data.user;
						this.setStorage(user, infoType.codeUserKey);
						success(res_data);
					}
				}
			}

		}, (error)=> {
			if (typeof(error) == "function") {
				if (error) {
					error();
				}
			}
		});
	},
	//模仿$router.push()
	$router:{
		push:function(item){
			let routerObj = item.router || null;
			let name = item.name || "";
			let param = item.query || {};
			if(routerObj==null){
				console.error('routerObj is not null')
			}
			// let routes = routerObj.router.options.routes;
			let routes = routerObj.options.routes;
			let routesKeyVal = {};
			for(var i=0;i<routes.length;i++){
				let key = routes[i].name;
				let val = routes[i].path;
				routesKeyVal[key]=val;
			}
			let path = routesKeyVal[name];
			//拼接url
			let url = '';
			let arr = [];
			for(var key in param){
				var val = param[key]?param[key]:"";
				arr.push(key+'='+val);
			}
			url+=arr.join('&');
			window.open('#'+path+'?'+url);
		},
	},
	/**
	 * @param {Function} function
	 * @param {Number} time
	 * @description 延迟函数
	 * */
	delay: (function() {
		var timer = 0;
		return function(callback, time) {
			clearTimeout(timer);
			timer = setTimeout(callback, time);
		};
	})(),
	/**
	 * @description 定时器
	 * */
	timer : function() {
		var data = {
			toDo: arguments[0].toDo || function() {},
			didStop: arguments[0].didStop || function() {},
			interval: arguments[0].interval || 1000,
			repeats: arguments[0].repeats || false
		}
		var timer_t = null;
		var count = 1;
		var obj = {
			clear: function() {
				clearInterval(timer_t);
				data.didStop();
			}
		}
		timer_t = setInterval(function() {
			if(data.repeats) {
				data.toDo(obj);
			} else {
				if(count > 0) {
					count--;
					data.toDo(obj);
				} else {
					clearInterval(timer_t);
					timer_t = null;
					data.didStop();
				}
			}
		}, data.interval);
	},
	/**
	 * @description 得到uuid
	 */
	getUUID: function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
	/**
	 * @description 克隆
	 */
	clone: function(obj) {
		var o;
		if (typeof obj == "object") {
			if (obj === null) {
				o = null;
			} else {
				if (obj instanceof Array) {
					o = [];
					for (var i = 0, len = obj.length; i < len; i++) {
						o.push(this.clone(obj[i]));
					}
				} else {
					o = {};
					for (var j in obj) {
						o[j] = this.clone(obj[j]);
					}
				}
			}
		} else {
			o = obj;
		}
		return o;
	},
	/**
	 * @param {Number}
	 * @description 得到随机字符串
	 * */
	getRdStr: function(len) {
		len = len || 1;
		var rdmString = "";
		for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
		return rdmString.substr(0, len);
	},
	/**description 自定义打印日志*/
	ZZLog(...type) {
		//		var isLog = true; //是否打印
		this.logCount++;
		var isLog = env.printLog;
		if (isLog) {
			console.group("第" + this.logCount + "次打印");
			type.forEach(v => {
				if (typeof(v) == 'object') {
					console.log(v);
				} else {
					console.log('%c' + v, 'color:#666699');
				}
			})
			console.groupEnd();
		} else {
			if (this.logCount == 1) {
				this.ZZLogConsole();
			}
		}
	},
	ZZLogConsole: function() {
		// console.log("一张网页，要经历怎样的过程，才能抵达用户面前？\n一位新人，要经历怎样的成长，才能站在技术之巅？\n探寻这里的秘密；\n体验这里的挑战；\n成为这里的主人；\n加入蜘蛛，加入网页搜索，你，可以影响世界。\n")
		// console.log("请将简历发送至 %c HR@zhizhuchuxing.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）", "color:red")
		// console.log("公司介绍：http://www.zhizhuchuxing.com/")
	},
	/**
	 * @param {String} par
	 * @description  从URL上获得参数
	 */
	getPar(par) {
		//获取当前URL
		var local_url = document.location.href;
		local_url = decodeURI(local_url);
		//获取要取得的get参数位置
		var get = local_url.indexOf(par + "=");
		if (get == -1) {
			return "";
		}
		//截取字符串
		var get_par = local_url.slice(par.length + get + 1);
		//判断截取后的字符串是否还有其他get参数
		var nextPar = get_par.indexOf("&");
		if (nextPar != -1) {
			get_par = get_par.slice(0, nextPar);
		}
		return get_par;
	},
	/**
	 * @param {String} name
	 * @param {String} value
	 * @param {String} time
	 * @description 设置cookie   eg:time='d30|s30|h24'
	 * */
	setCookie: function(name, value, time) {
		var strsec = getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec * 1);
		document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();

		function getsec(str) {
			var str1 = str.substring(1, str.length) * 1;
			var str2 = str.substring(0, 1);
			if (str2 == "s") {
				return str1 * 1000;
			} else if (str2 == "h") {
				return str1 * 60 * 60 * 1000;
			} else if (str2 == "d") {
				return str1 * 24 * 60 * 60 * 1000;
			}
		}
	},
	/**
	 * @param {String} name
	 * @description 删除指定cookie
	 * */
	delCookie: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
	},
	/**
	 * @param {String} name
	 * @description 得到指定cookie
	 * */
	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	/**
	 * @param {String} objName
	 * @param {String} objValue
	 * @param {String} time
	 * @description 设置字符串类型的本地缓存
	 * */
	setStorage: function(objName, objValue, time) {
		time = time || 'd180';
		var strsec = getsec(time);
		var nowTime = this.getDateTime(4) - 0;
		var setTime = nowTime + strsec / 1000;
		var obj = {};
		obj['maxage'] = setTime;
		obj['value'] = objValue;

		function getsec(str) {
			var str1 = str.substring(1, str.length) * 1;
			var str2 = str.substring(0, 1);
			if (str2 == "s") {
				return str1 * 1000;
			} else if (str2 == "h") {
				return str1 * 60 * 60 * 1000;
			} else if (str2 == "d") {
				return str1 * 24 * 60 * 60 * 1000;
			}
		}

		var sto = window.localStorage;
		if (sto)
			sto.setItem(objName, JSON.stringify(obj));
	},
	/**
	 * @param {String} objName
	 * @description 读取字符串类型的本地缓存
	 * */
	getStorage: function(objName) {
		var sto = window.localStorage;
		var resu = '';
		if (sto) {
			var ret = JSON.parse(sto.getItem(objName));
			if (ret) {
				var maxage = ret['maxage'] - 0;
				var nowTime = this.getDateTime(4) - 0;
				if (maxage - nowTime >= 0) {
					resu = ret['value'];
				} else {
					this.clearStorage(objName);
				}
			}
		}
		return resu;
	},
	/**
	 * @param {String} objName
	 * @description 清除本地缓存，如没指定名称则为清空所有缓存
	 * */
	clearStorage: function(objName) {
		var sto = window.localStorage;
		if (sto) {
			if (objName)
				sto.removeItem(objName);
			else
				sto.clear();
		}
	},
	/**
	 * @param {String} objName
	 * @param {Object} json
	 * @description 设置Json类型的本地缓存
	 * */
	setStorJson: function(objName, json) {
		if (json) setStorage(objName, JSON.stringify(json));
	},
	/**
	 * @param {String} objName
	 * @description 读取Json类型的本地缓存
	 * */
	getStorJson: function(objName) {
		var ret = null;
		var str = getStorage(objName);
		if (str)
			ret = JSON.parse(str);
		return ret;
	},
	/**
	 * @param {Date} day
	 * @description js判断一个日期是星期几 传入 年/月/日
	 * */
	getWeekDay: function(day) {
		var a = new Array("日", "一", "二", "三", "四", "五", "六");
		var week = new Date(day).getDay();
		var str = "星期" + a[week];
		return str;
	},
	/**
	 * @param {Date} date
	 * @description 获取前一天日期 传入指定时间
	 * */
	before: function(date) {
		var d = date;
		d = new Date(d);
		d = +d - 10006060 / 3 * 24;
		d = new Date(d);
		//格式化
		var year = ";" + d.getFullYear() + ";";
		var month = ";" + (d.getMonth() + 0 + 1) + ";";
		var day = ";" + d.getDate() + ";";
		if (year.length < 4) {
			year = "0" + year;
		}
		if (month.length < 4) {
			month = "0" + month;
		}
		if (day.length < 4) {
			day = "0" + day;
		}
		var datestr = year + "-" + month + "-" + day;
		datestr = datestr.replace(/;/g, "");
		return datestr;
	},
	/**
	 * @param {Number} addDayCount
	 * @param {Date} curDate
	 * @description 获取指定日期的前后几天
	 * */
	getDateByDay: function(addDayCount, curDate) {
		var d = new Date(curDate);
		d.setDate(d.getDate() + addDayCount); //获取AddDayCount天后的日期
		//格式化
		var year = ";" + d.getFullYear() + ";";
		var month = ";" + (d.getMonth() + 0 + 1) + ";";
		var day = ";" + d.getDate() + ";";
		if (year.length < 4) {
			year = "0" + year;
		}
		if (month.length < 4) {
			month = "0" + month;
		}
		if (day.length < 4) {
			day = "0" + day;
		}
		var datestr = year + "-" + month + "-" + day;
		datestr = datestr.replace(/;/g, "");
		return datestr;
	},
	/**
	 * @param {Date} date
	 * @description 获取后一天日期  传入指定时间
	 * */
	after: function(date) {
		var d = date;
		d = new Date(d);
		d = +d + 10006060 / 3 * 24;
		d = new Date(d);
		//格式化
		var year = ";" + d.getFullYear() + ";";
		var month = ";" + (d.getMonth() + 0 + 1) + ";";
		var day = ";" + d.getDate() + ";";
		if (year.length < 4) {
			year = "0" + year;
		}
		if (month.length < 4) {
			month = "0" + month;
		}
		if (day.length < 4) {
			day = "0" + day;
		}
		var datestr = year + "-" + month + "-" + day;
		datestr = datestr.replace(/;/g, "");
		return datestr;
	},
	/**
	 * @description 解决冒泡
	 * */
	solveBubbing: function() {
		var e = getEvent();
		if (window.event) {
			e.cancelBubble = true; //阻止冒泡
		} else if (e.preventDefault) {
			e.stopPropagation(); //阻止冒泡
		}
		//得到事件
		function getEvent() {
			if (window.event) {
				return window.event;
			}
			func = getEvent.caller;
			while (func != null) {
				var arg0 = func.arguments[0];
				if (arg0) {
					if ((arg0.constructor == Event || arg0.constructor == MouseEvent ||
							arg0.constructor == KeyboardEvent) ||
						(typeof(arg0) == "object" && arg0.preventDefault &&
							arg0.stopPropagation)) {
						return arg0;
					}
				}
				func = func.caller;
			}
			return null;
		}
	},
	/**
	 * @description 得到浏览器
	 * */
	myBrowser: function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var ua = {};
        var isOpera = userAgent.indexOf("Opera") > -1;
        //判断是否Opera浏览器
        ua.isOpera = isOpera;
        //判断是否Firefox浏览器
        var isFirefox = userAgent.indexOf("Firefox") > -1;
        ua.isFirefox = isFirefox;
        //判断是否Chrome浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1;
        ua.isChrome = isChrome;
        //判断是否Safari浏览器
        var isSafari = userAgent.indexOf("Safari") > -1;
        ua.isSafari = isSafari;
        var isIE = false;
        var isIE_1_10 = false;
        var IEVersion = -1;
        var isEdge = false;
        var isIE11 = false;
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          isIE = true;
          isIE_1_10 = true;
          //判断是IE几
          var browser = navigator.appName;
          var b_version = navigator.appVersion;
          var version = b_version.split(';');
          var IENAME = "Microsoft Internet Explorer";

          var trim_Version = version[1].replace(/[ ]/g, "");

          if (IENAME == browser && trim_Version == "MSIE6.0") IEVersion = 6;
          else if (IENAME == browser && trim_Version == "MSIE7.0") IEVersion = 7;
          else if (IENAME == browser && trim_Version == "MSIE8.0") IEVersion = 8;
          else if (IENAME == browser && trim_Version == "MSIE9.0") IEVersion = 9;
          else IEVersion = 10;
          // return "IE";
        }; //判断是否IE浏览器
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
          var _isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
          var _isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
          isEdge = _isEdge;
          isIE11 = _isIE11;
          isIE = true;
          if(isIE11)IEVersion=11;
        }
        ua.isIE = isIE;
        ua.isIE_1_10 = isIE_1_10;
        ua.IEVersion = IEVersion;
        ua.isEdge = isEdge;
        ua.isIE11 = isIE11;
        return ua;
	},
	/**
	 * @param {Number} nTypeFlag
	 * @description 得到时间组合
	 * */
	getDateTime: function(nTypeFlag) {
		var tNowTime = new Date();
		var myYear = ';' + tNowTime.getFullYear() + ';';
		var myMonth = ';' + (tNowTime.getMonth() + 1 - 0) + ';';
		var myDay = ';' + tNowTime.getDate() + ';';
		var myHour = ';' + tNowTime.getHours() + ';';
		var myMinu = ';' + tNowTime.getMinutes() + ';';
		var mySecond = ';' + tNowTime.getSeconds() + ';';

		if (myMonth.length < 4) myMonth = '0' + myMonth;
		if (myDay.length < 4) myDay = '0' + myDay;
		if (myHour.length < 4) myHour = '0' + myHour;
		if (myMinu.length < 4) myMinu = '0' + myMinu;
		if (mySecond.length < 4) mySecond = '0' + mySecond;

		var cNewTimeStr;
		//alert(tNowTime);
		switch (nTypeFlag + 1 - 1) {
			case 0:
				cNewTimeStr = myYear + '-' + myMonth + '-' + myDay;
				break;
			case 1:
				cNewTimeStr = myYear + myMonth + myDay;
				break;
			case 2:
				cNewTimeStr = myHour + ':' + myMinu + ':' + mySecond;
				break;
			case 3:
				cNewTimeStr = myHour + myMinu + mySecond;
				break;
			case 4:
				cNewTimeStr = myYear + myMonth + myDay + myHour + myMinu + mySecond;
				break;
			case 5:
				cNewTimeStr = myYear + '年' + myMonth + '月' + myDay + '日';
				break;
			case 6:
				cNewTimeStr = myYear;
				break;
			case 7:
				cNewTimeStr = myYear + '-' + myMonth;
				break;
			case 8: //得到上一个月的今天
				var date = getDateTime(0);
				var arr = date.split('-');
				var year = arr[0]; //获取当前日期的年份
				var month = arr[1]; //获取当前日期的月份
				var day = arr[2]; //获取当前日期的日
				var days = new Date(year, month, 0);
				days = days.getDate(); //获取当前日期中月的天数
				var year2 = year;
				var month2 = parseInt(month) - 1;
				if (month2 == 0) {
					year2 = parseInt(year2) - 1;
					month2 = 12;
				}
				var day2 = day;
				var days2 = new Date(year2, month2, 0);
				days2 = days2.getDate();
				if (day2 > days2) {
					day2 = days2;
				}
				if (month2 < 10) {
					month2 = '0' + month2;
				}
				cNewTimeStr = year2 + '-' + month2 + '-' + day2;
				break;
			case 9: //得到下一个月的今天
				var date = getDateTime(0);
				var arr = date.split('-');
				var year = arr[0]; //获取当前日期的年份
				var month = arr[1]; //获取当前日期的月份
				var day = arr[2]; //获取当前日期的日
				var days = new Date(year, month, 0);
				days = days.getDate(); //获取当前日期中的月的天数
				var year2 = year;
				var month2 = parseInt(month) + 1;
				if (month2 == 13) {
					year2 = parseInt(year2) + 1;
					month2 = 1;
				}
				var day2 = day;
				var days2 = new Date(year2, month2, 0);
				days2 = days2.getDate();
				if (day2 > days2) {
					day2 = days2;
				}
				if (month2 < 10) {
					month2 = '0' + month2;
				}

				var t2 = year2 + '-' + month2 + '-' + day2;
				return t2;
				break;
			default:
				cNewTimeStr = myYear + '-' + myMonth + '-' + myDay + ' ' + myHour + ':' + myMinu + ':' + mySecond;
				break;
		}

		cNewTimeStr = cNewTimeStr.replace(/;/g, "");

		return cNewTimeStr;
	}
}
