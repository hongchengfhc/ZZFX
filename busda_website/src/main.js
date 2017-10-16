// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'

import VueAMap from "vue-amap"
import VueAwesomeSwiper from "vue-awesome-swiper"


//import iviewcss from 'iview/src/styles/index.less'
import myiviewcss from '@/assets/css/my-iview-css/myiviewcss.less'
// import uibox from '@/assets/css/ui-box.css'
import common from '@/assets/css/common.less'
import overwritemyiviewcss from '@/assets/css/my-iview-css/overwritemyiviewcss.css'

Vue.config.productionTip = false
// Vue.http.interceptors.push((request,next)=>{
// 	// request.headers.set('X-Requested-With','XMLHttpRequest');
// 	// request.headers.set('tokenaaa','fdsafadsfasd');
// 	console.log(request);
// 	next((response)=>{
// 		return response;
// 	})
// })
//将ivuew的Message设置在距顶部30%的地方
let h = document.documentElement.scrollHeight || document.body.scrollHeight;
iview.Message.config({
	top:h/3
})

Vue.use(iview);

Vue.use(VueAMap)
Vue.use(VueAwesomeSwiper)

VueAMap.initAMapApiLoader({
	key:"6d2101ba8cc1914507f3e00bce3bba14",
	plugin:['Amap.MapType']  //'AMap.Scale','AMap.OverView','AMap.ToolBar','Amap.MapType'
});
// Vue.config.errorHandler = function (err, vm) {
//     var componentName = Vue.util.formatComponentName(vm),
//         propsData = vm.$options.propsData;
//     fundebug.notifyError(err, {
//         metaData: {
//             componentName: componentName,
//             propsData: propsData
//     }});
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
