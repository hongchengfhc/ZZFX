import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

Vue.use(Router)
Vue.use(Resource)



import hello from '@/components/Hello'

import busList from '@/pages/bus/busList'
import busReserve from '@/pages/bus/busReserve'
import home from '@/pages/home/home'
import orderList from '@/pages/order/orderList'
import orderDetail from '@/pages/order/orderDetail.vue'
import pay from '@/pages/pay/pay'
import findPwd from '@/pages/login/findPwd'
import userCenter from '@/pages/user/userCenter'
import guide from '@/pages/guide/guide'
import fleetSettled from '@/pages/fleet/fleetSettled'
import successApply from '@/pages/fleet/successApply'
import paySuccess from '@/pages/pay/paySuccess'
import protocol from '@/pages/protocol/protocol'		//协议

//自定义组件
// import header from '@/pages/common/_header'
// import footer from '@/pages/common/_footer'
// import search from '@/pages/home/view/_poiInput'
// import busPhoto from '@/pages/bus/view/_bus_photo'
// import ecode from '@/pages/pay/view/_ecode'
// import login from '@/pages/login/view/_login'

const router = new Router({
	// mode: "history",
	base: __dirname,
	routes: [
		//	alias:"/1000"   //取别名   path和alias不能一样，否则报错
		{
			path: '/',
			redirect: "/home"
		},
		// {
		// 	path: '/hello',
		// 	name: "hello",
		// 	meta: {
		// 		title: "hello"
		// 	},
		// 	component: hello
		// },
		// {
		// 	path: '/search',
		// 	name: "search",
		// 	meta: {
		// 		title: "search"
		// 	},
		// 	component: search
		// },
		// {
		// 	path: '/busPhoto',
		// 	name: "busPhoto",
		// 	meta: {
		// 		title: "busPhoto"
		// 	},
		// 	component: busPhoto
		// },

		// {
		// 	path: '/ecode',
		// 	name: "ecode",
		// 	meta: {
		// 		title: "微信支付"
		// 	},
		// 	component: ecode
		// },
		// {
		// 	path: '/login',
		// 	name: "login",
		// 	meta: {
		// 		title: "登录"
		// 	},
		// 	component: login
		// },
		{
			path: '/orderList',
			name: "orderList",
			meta: {
				title: "订单列表"
			},
			component: orderList
		},
		{
			path: '/orderList/orderDetail',
			name: 'orderDetail',
			meta: {
				title: "订单详情"
			},
			component: orderDetail
		},
		{
			path: '/home',
			name: "home",
			meta: {
				title: "巴士达，旅游用车服务预订首选！"
			},
			component: home
		},
		{
			path: '/busList',
			name: "busList",
			meta: {
				title: "用车查询"
			},
			component: busList
		},
		{
			path: '/busList/busReserve',
			name: "busReserve",
			meta: {
				title: "用车订单填写"
			},
			component: busReserve
		},
		{
			path: '/pay/pay',
			name: "pay",
			meta: {
				title: "订单支付"
			},
			component: pay
		},
		{
			path: '/login/findPwd',
			name: "findPwd",
			meta: {
				title: "密码重置"
			},
			component: findPwd
		},
		{
			path: '/user/userCenter',
			name: "userCenter",
			meta: {
				title: "我的订单"
			},
			component: userCenter
		},
		{
			path: '/guide/guide',
			name: "guide",
			meta: {
				title: "使用指南"
			},
			component: guide
		},
		{
			path: '/fleet/fleetSettled',
			name: "fleetSettled",
			meta: {
				title: "车队入驻申请"
			},
			component: fleetSettled
		},
		{
			path: '/fleet/successApply',
			name: "successApply",
			meta: {
				title: "申请成功"
			},
			component: successApply
		},
		{
			path: '/pay/paySuccess',
			name: "paySuccess",
			meta: {
				title: "支付成功"
			},
			component: paySuccess
		},
		{
			path:'/protocol',
			name:"protocol",
			meta:{title:'巴士达服务协议'},
			component:protocol
		},
		{
			path: '*',
			name: "404",
			meta: {
				title: "首页"
			},
			component: home
		}
	]
})
router.afterEach((to, from, next) => {
	window.scrollTo(0,0);
	if (to.meta.title) document.title = to.meta.title;
})
export default router;
//router.afterEach(function(transition){
//	if (transition.to.title) {
//      document.title = transition.to.title;
//  }
//})
