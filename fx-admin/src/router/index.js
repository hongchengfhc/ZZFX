import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
//import Hello from '@/components/Hello'

//import commission from '@/components/commission_details'
import order_list from '@/components/order_list'
//import with_drawal from '@/components/withdrawal_list'

Vue.use(Router)
Vue.use(Resource)


const router =  new Router({
	mode:"history",
	base:__dirname,
	routes: [
//	alias:"/1000"   //取别名
		{ path: '/',alias:"/order_list",meta:{title:"订单列表"},component: order_list},
		{ path: '/1001',alias:"/order_list", name: "order_list", meta:{title:"订单列表"},component: function(resolve){
			require(['@/components/order_list'],resolve);
		} },
		{ path: '/1002',alias:"/commission_details", name: "commission_details",meta:{title:"佣金明细"}, component: function(resolve){
			require(['@/components/commission_details'],resolve);
		} },
		{ path: '/1003',alias:"/withdrawal_list", name: "withdrawal_list", meta:{title:"提线申请列表"},component: function(resolve){
			require(['@/components/withdrawal_list'],resolve);
		} }
	]
})
router.afterEach((to,from,next)=>{
	if(to.meta.title)document.title = to.meta.title;
})
export default router;
//router.afterEach(function(transition){
//	if (transition.to.title) {
//      document.title = transition.to.title;
//  }
//})
