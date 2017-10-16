<template>
	<div>
		<div class="all" style="background:#fff;box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.24);">
			<div class="center" style="width:1200px;margin:0 auto;position:relative;">
				<div @click="logoDidClick" class="" style="cursor: pointer;width:150px;height:64px;background:#ff9710;position:absolute;z-index:100">
					<div class="logo"></div>
				</div>
				<div class="menus" style="height:50px;margin-left:275px;display:inline-block;">
					<div v-for="(item,index) in menus" :key="item.menuId" @click="menuChange(index)" class="menu" style="line-height:47px;color:#333333;margin-right:75px;display:inline-block;">
						<div class="title" style="height:47px;font-size:15px;">{{item.title}}</div>
						<div class="border" :style="item.selected==true?'background:#ff9710':''" style="height:4px;width:100%"></div>
					</div>
					<!-- <div @click="menuChange(0)" class="ub ub-ver ub-ac ub-pc" style="color:#333333;width:30px;">
            <div class="ub ub-ac" style="height:47px;font-size:15px;">首页</div>
            <div class="ub ub-ae" :style="styles[selectIndex][0]" style="height:3px;width:100%"></div>
        </div>
        <div @click="menuChange(1)" class="ub ub-ver ub-ac ub-pc" style="margin-left:75px;color:#333333;width:30px;">
            <div class="ub ub-ac" style="height:47px;font-size:15px;">用车</div>
            <div class="ub ub-ae" :style="styles[selectIndex][1]" style="height:3px;width:100%"></div>
        </div>
        <div @click="menuChange(2)" class="ub ub-ver ub-ac ub-pc" style="margin-left:75px;color:#333333;width:60px;">
            <div class="ub ub-ac" style="height:47px;font-size:15px;">使用指南</div>
            <div class="ub ub-ae" :style="styles[selectIndex][2]" style="height:3px;width:100%"></div>
        </div>
        <div @click="menuChange(3)" class="ub ub-ver ub-ac ub-pc" style="margin-left:75px;color:#333333;width:60px;">
            <div class="ub ub-ac" style="height:47px;font-size:15px;">车队入驻</div>
            <div class="ub ub-ae" :style="styles[selectIndex][3]" style="height:3px;width:100%"></div>
        </div> -->
				</div>
				<div class="login_register" style="font-size:15px;height:50px;line-height:50px;color:#666666;;display:inline-block;float:right;">
					<div v-if="userInfo.isLogin==false" class="" style="display:inline-block;">
						<div @click="btnLogin()" class="login" style="cursor:pointer;display:inline-block;">登录</div>
						<div class="" style="padding:0 8px;color: #cccccc;display:inline-block;">/</div>
						<div @click="btnRegister()" class="register" style="cursor:pointer;display:inline-block;">注册</div>
					</div>
					<div v-else class="" style="display:inline-block;">
						<div @click="btnMyOrder" class="hightlight" style="cursor: pointer;color: #333333;display:inline-block;">我的订单</div>
						<!--<div   title="退出登录">退出</div>-->
						<div  @click="btnLogOut" style="display:inline-block;">
							<Tooltip content="退出登录" class="fonthover"   style="margin-left: 20px;cursor: pointer;color: #999999;">退出</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
		<login-view ref="login" @loginSuccess="loginSuccess"></login-view>
	</div>
</template>

<script>
	import loginView from '../login/view/_login.vue'
	import Util from '../../config/Util'
	import infoType from '../../config/infoType'
	export default {
		name: "header",
		props: {
			selectMenu: [Number, String]
			// userInfo:[Object]
		},
		data() {
			return {
				userInfo: {
					isLogin: false,
					userName: ""
				},
				toUserCenter: false,
				menus: [{
						menuId: 1,
						title: "首页",
						selected: true
					},
					{
						menuId: 2,
						title: "用车",
						selected: false
					},
					{
						menuId: 3,
						title: "使用指南",
						selected: false
					},
					{
						menuId: 4,
						title: "车队入驻",
						selected: false
					}
				]
			}
		},
		components: {
			loginView
		},
		mounted: function() {
			this.$nextTick(() => {

				if(this.selectMenu) {
					this.menus.map(x => x.selected = false);
					this.menus.map(x => {
						if(x.menuId == this.selectMenu) x.selected = true
					});
				}
				this.loginUserInfo();
			});
		},
		methods: {
			loginUserInfo(){
				let user = Util.getStorage(infoType.codeUserKey);
				let token = Util.getStorage(infoType.codeToken);
				if(token) {
					this.userInfo = user;
				} else {
					this.userInfo = this.userInfo;
				}
			},
			//点击logo
			logoDidClick(){
				this.$router.push({
					name: "home"
				})
			},
			menuChange(index) {
				this.toUserCenter = false;

//				this.menus.map(x => x.selected = false);
//				this.menus[index].selected = true;
//				this.$emit('menuChange', this.menus[index]);
				let item = this.menus[index];
				if(item.menuId == 1) {
					this.$router.push({
						name: "home"
					})
				}
				if(item.menuId == 2) {
					this.$router.push({
						name: "busList",
						query:{
							bus_type:2,
							start_station_name:"",
							start_run_time:'08:00'
						}
					})
					// this.$router.go(0);
				}
				if(item.menuId == 3) {
					this.$router.push({
						name: "guide"
					})
				}
				if(item.menuId == 4) {
					this.$router.push({
						name: "fleetSettled"
					})
				}
				this.loginUserInfo();
				Util.ZZLog(this.userInfo);
			},
			btnLogin() {
				this.$refs.login.login_model = true;
				this.$refs.login.show_type = this.$refs.login.enumShowType.enumLogin;
			},
			btnRegister() {
				this.btnLogin();
				this.$refs.login.show_type = this.$refs.login.enumShowType.enumRegister;;
			},
			loginSuccess(user, token) {
				this.userInfo = user;
				this.$emit('loginSuccess', user, token);

			},
			btnMyOrder(){
				this.menus.map(x => {
					if(x.menuId == this.selectMenu) x.selected = false
				});
				this.$emit('btnMyOrder');
				this.$router.push({
					name: "userCenter"
				})
			},
			btnLogOut() {
				Util.post({
					obj: this,
					url: '/site/logout',
					success: (res_data) => {
						if(res_data.flag == false) {
							this.$Message.warning(res_data.msg);
						} else {
							Util.clearStorage(infoType.codeToken);
							Util.clearStorage(infoType.codeUserKey);
							this.userInfo.isLogin = false;

							this.$Message.success('退出登录成功！');
							Util.delay(()=>{
								this.$router.push({
									name: "home"
								})
							},500);
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
						this.$emit('orderCancelError');
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.hightlight:hover,.login:hover,.register:hover{
		color: #ff9710 !important;
	}

	.fonthover:hover{
		color: #666666 !important;
	}
	.menu:last-child {
		margin-right: 0px!important;
	}

	.menu {
		cursor: pointer;
	}

	.menu:hover,.menu:hover>.title {
		opacity: 0.8;
	}

	/*.menu:hover .menu:hover>.border {
		background:#ff9710;
	}*/

	.logo {
		background-image: url('../../assets/images/logo/hlogo.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 68px;
		height: 35px;
		margin:0 auto;
		position: relative;
		top: 50%;
		margin-top: -17.5px;
	}

	/*.menu:hover .border{
		transform: scaleX(0);
	    -webkit-transition: all 1s ease;
	    transition: all 1s ease;
	}*/
	.menu .title{
		position: relative;
	}
	.menu .title:after{
	    content: '';
	    position: absolute;
	    bottom: -4px;
	    left: 0;
	    width: 100%;
	    height: 4px;
	    background-color: #ff9710;
	    -webkit-transform: scaleX(0);
	    -ms-transform: scaleX(0);
	    transform: scaleX(0);
	    -webkit-transition: all .25s ease;
	    transition: all .25s ease;
	}
	.menu .title:hover:after {
	    -ms-transform: scaleX(1);
	    -webkit-transform: scaleX(1);
	    transform: scaleX(1);
	}
</style>
