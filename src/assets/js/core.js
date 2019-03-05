/**
 * @description [SEC core.js 通用各种基础函数]
 */


//定义SEC对象，定义二级对象
let SEC = {
  version: '0.0.1',
  time_stamp: +new Date(),
  system: {}, ///一些浏览器通用内容
  number: {}, //数字计算相关
  date: {}, //日期时间相关
  string: {}, //字符串相关
  cookie: {}, //cookie相关
  class: {}, //class相关
  object: {}, //object相关
  pages: {} //供页面级代码均挂在此对象下
};
/**************************************************************************************************************
* SEC.system
***************************************************************************************************************/
/**
* 常见浏览器类型检测
*/
SEC.system = (function () {
  let u = navigator.userAgent,
      ua = u.toLowerCase(),
      app = navigator.appVersion;
  return {
      is_trident: u.indexOf('Trident') > -1, //IE内核
      is_presto: u.indexOf('Presto') > -1, //opera内核
      is_webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      is_gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      is_mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      is_ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      is_android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      is_iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者SECSECHD浏览器
      is_iPad: u.indexOf('iPad') > -1, //是否iPad
      is_webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      is_weixin: ua.indexOf('micromessenger') > -1, //是否微信
      is_weibo: ua.match(/WeiBo/i) == 'weibo', //在新浪微博客户端打开
      is_qq: ua.match(/\sQQ/i) == ' qq' //是否qq
  };
})();
/**
* [系统语言 language]
*/
SEC.system.language = (navigator.browserLanguage || navigator.language).toLowerCase();

/**
* [操作mate分享信息]
* 建议传入对象格式：shareObj = {shareImg: '', shareDes: ''}
* 分享对象包含：需要分享的图片的路径及分享内容描述
*/
SEC.system.shareFB = function (shareObj) {
  if (shareObj) {
      let shareImg = document.getElementById('share-img');
      let shareDes = document.getElementById('share-des');
      if (shareObj.shareImg && shareObj.shareDes) {
          shareImg.content = shareObj.shareImg;
          shareDes.content = shareObj.shareDes;
      } else {
          for (let k in shareObj) {
              shareObj[k].indexOf('http') ?
                  shareDes.content = shareObj[k] :
                  shareImg.content = shareObj[k];
          }
      }
      shareImg = null;
      shareDes = null;
  }
};

/**************************************************************************************************************
* SEC.number
***************************************************************************************************************/
/**
* @description 格式化数字,小数位不足被0
* @param {Number} num 被格式化的数字【必选】
* @param {Number} decimal  小数位【可选】
* @param {Number} round 如何舍入 可选值为1，0，-1 ,465分别表示：只入不舍ceil,四舍五入round，只舍不入floor,四舍六入五留双【可选】
* @return {String} 被格式化后的字符串型的数字
* @example SEC.number.format(123.456,2,0);
*/
SEC.number.format = function (num, decimal, round) {
  let pow = undefined;
  decimal = typeof (decimal * 1) !== 'number' || isNaN(decimal * 1) ? 2 : Math.abs(decimal);
  pow = Math.pow(10, decimal);
  num *= 1;
  //f_num处理浮点数问题，能保证保留10位小数以内计算得到正常结果
  let f_num = 0.000000000099999;
  switch (round) {
      case 1:
          num = Math.ceil(num * pow) / pow;
          break;
      case -1:
          num = Math.floor(num * pow + f_num) / pow;
          break;
      case 465:
          //四舍六入五成双,如保留两位小数，第三位小数如果是5，则看第二位是奇偶，如果是奇，则进位，否则舍去
          let is_jo = Math.floor(num * pow + f_num) % 10 % 2;
          //要进位上数字是否是5
          let is_five = Math.floor(num * pow * 10 + f_num) % 10 == 5;
          let step = is_five && !is_jo ? 1 / pow : 0;
          num = SEC.number.format(num, decimal) - step;
          break;
      default:
          num = (num * pow + f_num) / pow;
  }
  return (num.toFixed(decimal) + '').replace(/^\./g, '0.').replace(/\.$/, '');
};
/**
* @description 把数字格式化成货币型
* @param {Number} num 被格式化的数字【必选】
* @param {Number} decimal 小数位  默认两位【可选】
* @param {Number} round  如何舍入 可选值为1，0，-1
* 分别表示：只入不舍ceil四舍五入round，只舍不入floor默认四舍五入【可选】
* @return {String} 货币格式的字符串型的数字
* @example SEC.number.currency(1234567.456,2,0)=>1,234,567.46
*/
SEC.number.currency = function (num, decimal, round) {
  let arr = [];
  if (typeof decimal !== 'undefined') {
      num = SEC.number.format(num, decimal, round);
  }
  arr = (num + '').split('.');
  arr[0] = arr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  return (arr[0] + (arr.length == 2 ? '.' + arr[1] : '')).replace(/^\./g, '0.');
};
/**
* @description 格式成百分比，根据参数来格式化一个数的百分比或是千分比等
* @param {Number} num 被格式化的数字【必选】
* @param {Number} percent 比率，如100则是百分比，1000则是千分比，默认百分比【可选】
* @param {Number}  decimal小数位，默认两位【可选】
* @param {Number} round 如何舍入可选值为1，0，-1分别表示：只入不舍ceil四舍五入round，只舍不入floor默认0【可选】
* @return {String} 百分比,不带%
* @example SEC.number.format(1/3,100,2,0)
*/
SEC.number.percent = function (num, percent, decimal, round) {
  return SEC.number.format(num * 1 * (percent || 100), decimal, round);
};
/**
* 字符串转化为数字
*/
SEC.number.to_number = function (val) {
  val = val - 0;
  val = isNaN(val) ? 0 : val;
  return val;
};

/**************************************************************************************************************
* SEC.date
***************************************************************************************************************/
/**
* @description 把日期对象格式化字符串格式
* @example SEC.date.format(new Date())
* @param {Date/Number} date 时期对象或由Date.getTime()得到的时间数【必选】
* @param {String} format_style 格式化样式，默认为YYYY-MM-DD hh:mm:ss【可选】
* 可自定义。YYYY四位年份，YY两位年分，MM月份，DD天，hh小时，mm分种，ss秒
* @return {String} 格式化后的字符串
*/
SEC.date.format = function (date, format_style) {
  let [YYYY, YY, MM, DD, hh, mm, ss] = '';
  date = typeof date == 'object' ? date : new Date(date * 1);
  format_style = format_style || 'YYYY-MM-DD hh:mm:ss';
  YYYY = date.getFullYear();
  MM = date.getMonth() + 1;
  DD = date.getDate();
  hh = date.getHours();
  mm = date.getMinutes();
  ss = date.getSeconds();
  YY = (YYYY + '').replace(/^\d\d/g, '');
  MM = MM < 10 ? '0' + MM : MM;
  DD = DD < 10 ? '0' + DD : DD;
  hh = hh < 10 ? '0' + hh : hh;
  mm = mm < 10 ? '0' + mm : mm;
  ss = ss < 10 ? '0' + ss : ss;
  return SEC.string.mul_replace(format_style, [[/YYYY/, YYYY], [/YY/, YY], [/MM/, MM], [/DD/, DD], [/hh/, hh], [/mm/, mm], [/ss/, ss]]);
};
/**
* @description 把日期字符串转成日期对象
* @example SEC.date.to_date('2011-09-09 12:12:12')
* @param {String} dateStr 时期字符串，只支持国内日期格式，如2011-6-12 12:15:20【必选】
* @return {Date} 转化后时间对象
*/
SEC.date.to_date = function (dateStr) {
  let [str, date, time] = '';
  str = this.trim(dateStr).split(' ');
  date = str[0].split(/[\-\/]/);
  time = str[1] ? str[1].split(':') : [0, 0, 0];
  return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
};

/**
* @description 把日期字符串转成日期对象
* @param dateStr {String}  dateStr 时期字符串，只支持国内日期格式，如2011-6-12或20110612【必选】
* @ignore created  yinguohui@360.cn
* @return date {Date} 转化后时间对象
*/
SEC.date.get_date = function (dateStr) {
  let regExp = /^\s*(\d{4})-?(\d\d)-?(\d\d)\s*$/;
  let date = new Date(NaN);
  let  month = undefined;
  let parts = regExp.exec(dateStr);
  if (parts) {
      month = +parts[2];
      date.setFullYear(parts[1], month - 1, parts[3]);
      if (month != date.getMonth() + 1) {
          date.setTime(NaN);
      }
  }
  return date;
};
/**
* @description 获取日期在星期中的周几
* @example SEC.date.getWeekText("20140522")
* @param {String} dateStr 时期字符串，只支持8位纯数字日期或国内日期格式，如2011-06-12 2011/06/12【必选】
* @return {String} 返回日期所在的周几
*/
SEC.date.get_week_text = function (dateStr) {
  dateStr = dateStr.replace(/[\-\/]/g, '');
  let d = new Date(dateStr.substr(0, 4) * 1, dateStr.substr(4, 2) * 1 - 1, dateStr.substr(6, 2) * 1);
  let wi = d.getDay();
  let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weeks[wi];
};

/**************************************************************************************************************
* SEC.string
***************************************************************************************************************/
/**
* @description 计算字符串长度，中文字符算两个
* @example SEC.string.len('adf2asd中国')
* @param {String} str 字符串【必选】
* @return {Number} 字符串的长度
*/
SEC.string.len = function (str) {
  return str.replace(/[^\x00-\xff]/g, '--').length;
};
/**
* @description 从字符串截取指定的长度，中文字符算两个,如果取到中文之符一半，则舍掉这个中文
* @example SEC.string.cut('adf2asd中国',5,'')
* @param {String} str 被截取的字符串【必选】
* @param {Number} len 要截取的长度【必选】
* @param {String} ext 超过指定长度后的后缀，默认为空【可选】
* @return {String} 截取后的字符串
*/
SEC.string.cut = function (str, len, ext) {
  ext = ext || '';
  if (SEC.string.len(str) <= len - ext.length) {
      return str;
  }
  len -= ext.length;
  //双字节字符替换成两个//去掉临界双字节字符//还原
  return str.substr(0, len).replace(/([^\x00-\xff])/g, '$1 ').substr(0, len).replace(/[^\x00-\xff]$/, '').replace(/([^\x00-\xff]) /g, '$1') + ext;
};
/**
* @description 取得URL中指定参数的值，简易版，复杂情况下没做考虑,如，多个同名参数，参数又是一个URL等
* @example SEC.string.get_url_param('par','http://mm.cn?par=test')
* @param {String} name 参数名字符串【必选】
* @param {String} url URL【可选】 默认为当前页面的URL
* @return {String} 指定参数的值
*/
SEC.string.get_url_param = function (name, url) {
  let [m, reg] = '';
  url = (url || window.location.href);
  m = url.match(new RegExp('([?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
  if (m) {
      return decodeURIComponent(m[0].split('=')[1]);
  } else {
      return '';
  }
};
/**
* @description 返回一个批量获取或设置url参数值的对象
* @example SEC.string.get_urlParams(['a', 'b'], this)
* @param {String} arr 数组
* @param {String} url 新生成项的上下文
* @return {object} 指定参数的值
*/
SEC.string.get_urlParams = function (arr, context) {
  context = context || {};
  for (let i = 0, len = arr.length; i < len; i++) {
      let item = arr[i];
      context['QS_' + item] = SEC.string.get_url_param(item);
  }
  return context;
};
/**
* @description 返回一个批量获取url参数值的对象
* @example string.parse_query_string(url)
* @param {String} url 数组
* @return {Json} 指定参数的对象
*/
SEC.string.parse_query_string = function (url) {
  let str = url.split('?')[1];
  let iterms = str.split('&');
  let arr = {};
  let Json = {};
  for (let i = 0; i < iterms.length; i++) {
      arr = iterms[i].split('=');
      Json[arr[0]] = arr[1];
  }
  return Json;
};
/**
* @description 批量替换
* @param {String} str 被替换的字符串 【必选】
* @param {Array} arr 替换规则 【必选】
* @return {String} 替换后的字符串
* @example SEC.string.mul_replace('test',[['t','h'],['st','llo']]);
*/
SEC.string.mul_replace = function (str, arr) {
  for (let i = 0, l = arr.length; i < l; i++) {
      str = str.replace(arr[i][0], arr[i][1]);
  }
  return str;
};
/**
* @description 把全角数字,空格，句号转换成半角
* @param {String} str 被转换的字符串 【必选】
* @return {Stirng} 替换后的字符串
*/
SEC.string.dbc_to_sbc = function (str) {
  return SEC.string.mul_replace(str, [[/[\uff01-\uff5e]/g,
      function (a) {
          return String.fromCharCode(a.charCodeAt(0) - 65248);
      }], [/\u3000/g, ' '], [/\u3002/g, '.']]);
};

/**************************************************************************************************************
* SEC.cookie
***************************************************************************************************************/
/**
* @description 得到指定的cookie值
* @example SEC.cookie.get('name')
* @param {String} name cookie名称【必选】
* @param {Boolean} encode 是否encodeURIComponent 默认false【可选】
* @return 指定cookie的值
*/
SEC.cookie.get = function (name, encode) {
  let m = document.cookie.match(new RegExp('(^| )' + name + '=([^;])*', 'gi')),
      v = !m ? '' : m[0].split(name + '=')[1];
  return (!!encode ? v : decodeURIComponent(v));
};
/**
* @description set设置cookie, del删除cookie,当expires小于0时即为删除cookie
* @param {Object} options={name:,value:,expires:,domain:,path:,secure:,encode:}【必选】
* @param {String} name cookie的名称【必选】
* @param {String} value cookie的值【必选】
* @param {Number} expires cookie的过期时间，为整数，单位为天，为负时删除cookie【可选】
* @param {String} domain  指定cookie所属的域【可选】
* @param {String} path  指定cookie 的路径【可选】
* @param {Boolean} secure  是否安全传输 当协议为https时才可用【可选】
* @param {Boolean} encode  是否对值进行encodeURIComponent【可选】
*/
SEC.cookie.set = SEC.cookie.del = function (options) {
  let ck = [];
  ck.push(options.name + '=');
  if (options.value) {
      ck.push(!!options.encode ? options.value : encodeURIComponent(options.value));
      //是否encodeURIComponent
  }
  if (options.expires) {
      let d = new Date();
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setTime(d.getTime() + options.expires * 86400000);
      //24 * 60 * 60 * 1000
      ck.push(';expires=' + d.toGMTString());
  }
  if (options.domain) {
      ck.push(';domain=' + options.domain);
  }
  ck.push(';path=' + (options.path || '/'));
  if (options.secure) {
      ck.push(';secure');
  }
  document.cookie = ck.join('');
};

/**
* @description 判断是否有class
* @example SEC.class.hasClass(ele, 'className')
* @param  {Object} ele Dom元素
* @param  {String} str 查找class字符串
* @return {Boolean}
*/
SEC.class.hasClass = function (ele, str) {
  let reg = new RegExp('\\b' + str + '\\b');

  if (reg.test(ele.className)) {
      return true;
  }
  return false;
};

/**
* @description 添加class
* @example SEC.class.addClass(ele, 'className')
* @param  {Object} ele Dom元素
* @param  {String} str 添加class字符串
* @return {Boolean}
*/
SEC.class.addClass = function (ele, cls) {
  if (!SEC.class.hasClass(ele, cls)) {
      ele.className += ' ' + cls;
  }
};

/**
* @description 删除class
* @example SEC.class.removeClass(ele, 'className')
* @param  {Object} ele Dom元素
* @param  {String} str 移除class字符串
* @return {Boolean}
*/
SEC.class.removeClass = function (ele, cls) {
  if (SEC.class.hasClass(cls)) {
      ele.className = ele.className.replace(new RegExp('\\b' + cls + '\\b', 'gi'), '');
  }
};

/**
* @description 将一个对象转换成url参数字符串
* @example SEC.object.toUrlParams({a:1, b:2, c:3}) === '?a=1&b=2&c=3'
* @param  {Object} obj 一个对象
* @return {String} res url参数字符串
*/
SEC.object.toUrlParams = function (obj) {
  let res = '?';
  for (let attr in obj) {
      let val = obj[attr] || '';
      if (val) {
          val = encodeURIComponent(val);
      }
      res += (attr + '=' + val + '&');
  }
  return res.replace(/&$/, '');
};
export default {
  SEC
};
