<template>
	<div>
		<header-view ref="headerView" :selectMenu="3"></header-view>

		<div style="background: #EEEEEE;padding-top: 55px;padding-bottom: 90px;">
			<div style="width: 1200px;margin: 0 auto;">
				<div class="content" style="position:relative;">
					<!--左侧-->
					<left ref="left" :defaultType="sel_type" @selType="selType"></left>
					<right ref="right" :type="sel_type"></right>
				</div>
			</div>
		</div>

		<footer-view @titleClick="titleClick"></footer-view>
	</div>
</template>

<script>
	import headerView from '../common/_header'
	import footerView from '../common/_footer'

	import left from "./view/_left"
	import right from "./view/_right"

	export default {
		data(){
			return {
				sel_type : 'common_problem',
				urlParam:{}
			}
		},
		mounted(){

//			document.body.scrollTop="0px";

			this.urlParam = this.$route.query;
			this.sel_type = this.urlParam.sel_type?this.urlParam.sel_type:'common_problem';
			// this.sel_type="contact_us";
		},
		beforeRouteEnter(to,from,next){
			next((vm)=>{
				vm.$refs.headerView.loginUserInfo();
			})
		},
		components : {
			headerView,footerView,left,right
		},
		methods: {
			selType(val){
				this.sel_type = val;
			},
			//footer 的回调
			titleClick(val){
				this.sel_type=val;
			}
		}
	}

</script>

<style>
</style>
