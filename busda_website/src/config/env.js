/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let config = {
	baseUrl: '',
    printLog:false
}

if (process.env.NODE_ENV == 'development') {
	config.baseUrl = "http://www.testbusda.cn";
	config.printLog = true;
} else if (process.env.NODE_ENV == 'production') {
	config.baseUrl = '';
	config.pringLog = false;
}
// export baseUrl;
// export routerMode;
// export imgBaseUrl;
export default config;
