<template>
	<div>
		<header-view  ref="headerView"></header-view>
		<div style="background: #EEEEEE;padding-top: 54px;padding-bottom: 153px;">
			<div style="width: 1200px;height: 500px;margin: 0 auto;background: #FFFFFF;padding: 36px 53px;">
				<div style="font-size: 14px;font-weight: 500;text-align: left;">找回密码</div>

				<div class="" style="margin-top: 41px;overflow: auto;margin-left: 157px;">
					<div class="one_status" v-for="(item,index) in items" style="float: left;">
						<div class="" style="clear: both;overflow: auto;">
							<div class="left wait_line_w" v-if="item.status_type=='wait'" style="width: 111px;height: 5px;float: left;margin-top: 15px;"></div>
							<div class="left wait_line_p" v-else-if="item.status_type=='progress'" style="width: 111px;height: 5px;float: left;margin-top: 15px"></div>
							<div class="left wait_line_f" v-else style="width: 111px;height: 5px;float: left;margin-top: 15px"></div>
							<div style="width: 38px;height: 38px;font-size: 18px;font-weight: 500;border-radius: 19px;float: left;" class="wait_line" v-if="item.status_type=='wait'">{{item.status_id}}</div>
							<div style="width: 38px;height: 38px;font-size: 18px;font-weight: 500;border-radius: 19px;float: left;" class="progress_line" v-else-if="item.status_type=='progress'">{{item.status_id}}</div>
							<div style="width: 38px;height: 38px;font-size: 18px;font-weight: 500;border-radius: 19px;float: left;" class="finish_line" v-else="item.status_type=='finish'">
								<Icon type="checkmark" style="font-size:20px;color: #FFCB87;"></Icon>
							</div>
							<div class="right wait_line_w" v-if="item.status_type=='wait'" style="width: 111px;height: 5px;float: left;margin-top: 15px"></div>
							<div class="right wait_line_p" v-else-if="item.status_type=='progress'" style="width: 111px;height: 5px;float: left;margin-top: 15px"></div>
							<div class="right wait_line_f" v-else style="width: 111px;height: 5px;float: left;margin-top: 15px"></div>
						</div>
						<div v-if="item.status_type=='progress'" class="pro_font">{{item.status_name}}</div>
						<div v-else class="did_font">{{item.status_name}}</div>
					</div>
				</div>
				<!---->
				<!--确认账号-->
				<div class="" style="margin-top: 116px;text-align: center;" v-show="status.confirm == true">
					<div style="display: inline-block;">
						<Form ref="confrim_form" :model="confirm_obj" :rules="confrim_rule">
						<FormItem label="" prop="phone">
							<Input v-model="confirm_obj.phone" style="width:300px;" placeholder="请输入手机号"></Input>
						</FormItem>
					</Form>
					<div class="next_btn" style="margin-top: 25px;margin: 0 auto;" @click="nextOne">下一步</div>
					</div>
				</div>
				<!--身份验证-->
				<div class="" style="margin-top: 116px;text-align: center;" v-show="status.check == true">
					<div style="display: inline-block;">
					<Form ref="check_form" :model="check_obj" :rules="check_rule">
						<FormItem label="" prop="code" style="overflow: auto;width:300px;margin: 0 auto;">
							<Input  v-model="check_obj.code" style="width:200px;margin-right: 12px;float: left;" placeholder="请输入手机验证码"></Input>
							<div :class="count_down_time == 0 ? 'refresh' : 'dis_fresh'" style="width: 88px;height: 32px;border-radius: 2px; cursor: pointer;float: left;line-height: 32px;" v-if="count_down_time == 0" class="" @click="resetTime">重新获取</div>
							<div :class="count_down_time == 0 ? 'refresh' : 'dis_fresh'" style="width: 88px;height: 32px;border-radius: 2px; cursor: pointer;float: left;line-height: 32px;"  v-else class="">剩余{{count_down_time}}s</div>
						</FormItem>
					</Form>
					<div class="next_btn" style="margin: 0 auto;margin-top: 25px;" @click="nextTwo">下一步</div>
					</div>
				</div>
				<!--身份验证-->
				<div class="" style="margin-top: 58px;text-align: center;" v-show="status.setpwd == true">
					<div style="display: inline-block;">
					<Form ref="setpwd_form" :model="setpwd_obj" :rules="setpwd_rule">
						<FormItem label="" prop="password">
							<Input type="password" v-model="setpwd_obj.password" style="width:300px;" placeholder="请输入密码"></Input>
						</FormItem>
						<FormItem label="" prop="right_pwd">
							<Input type="password" v-model="setpwd_obj.right_pwd" style="width:300px;" placeholder="请确认密码"></Input>
						</FormItem>
					</Form>
					<div class="next_btn" style="margin: 0 auto;margin-top: 25px;" @click="nextThree">下一步</div>
					</div>
				</div>

				<div style="cursor: pointer;color: #ff9710;margin-top: 22px;" class="backlogin" @click="backLogin">返回登录</div>

			</div>
		</div>
		<login-view ref="login" @loginSuccess="loginSuccess"></login-view>
		<footer-view></footer-view>
	</div>
</template>

<script>
	import headerView from "../common/_header"
	import footerView from "../common/_footer"
	import loginView from './view/_login.vue'
	import Util from '../../config/Util'
	import infoType from '../../config/infoType'
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入密码'))
				} else {
//					if(this.password_obj.password !== '') {
//						callback(new Error('请输入密码'))
//					}
					callback();
				}
			};
			const validatePassCheck = (rule, value ,callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value != this.setpwd_obj.password){
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				userInfo:null,
				timer_t : null,
				count_down_time : 59,
				items: [{
					status_type: 'progress',
					status_id: '1',
					status_name: '确认账号'
				}, {
					status_type: 'wait',
					status_id: '2',
					status_name: '身份验证'
				}, {
					status_type: 'wait',
					status_id: '3',
					status_name: '重设密码'
				}],
				status: {
					confirm : true,
					check : false,
					setpwd : false
				},
				confirm_obj : {
					phone : ''
				},
				confrim_rule : {
					phone: [{
							required: true,
							message: '手机号不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 11,
							message: '手机号格式不正确',
							trigger: 'blur'
						}
					]
				},
				check_obj : {
					code : ''
				},
				check_rule : {
					code: [{
							required: true,
							message: '验证码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 4,
							message: '验证码格式不正确',
							trigger: 'blur'
						}
					]
				},
				setpwd_obj : {
					password : '',
					right_pwd : ''
				},
				setpwd_rule : {
					password: [{
						required: true,
						validator : validatePass,
						trigger: 'blur'
					}],
					right_pwd: [{
						required: true,
						validator : validatePassCheck,
						trigger: 'blur'
					}]
				}
			}
		},
		components: {
			headerView,
			footerView,
			loginView
		},
		mounted: function() {

		},
		beforeRouteEnter(to,from,next){
			next((vm)=>{
				vm.status.confirm = true;
				vm.status.check = false;
				vm.status.setpwd = false;
				vm.items[0].status_type = 'progress';
				vm.items[1].status_type = 'wait';
				vm.items[2].status_type = 'wait';
			})
		},
		methods: {
			nextOne(){
				Util.post({
					obj:this,
					url:'/site/send-msg-reset-pwd',
					data:{tel:this.confirm_obj.phone},
					success:(res_data)=>{
						if(res_data.flag==false){
							this.$Message.warning(res_data.msg);
						}else{
							let data = res_data.data;
							this.$Message.success('发送验证码成功');
							var _this = this;
							_this.timer_t = setInterval(function(){
								if (_this.count_down_time > 0) {
									_this.count_down_time --;
								} else{
									clearInterval(_this.timer_t);
									_this.timer_t = null;
								}
							},1000);
							_this.status.confirm = false;
							_this.status.check = true;
							_this.items[0].status_type = 'finish';
							_this.items[1].status_type = 'progress';
						}
					},error:()=>{
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			nextTwo(){
				let _data = {
					tel:this.confirm_obj.phone,
					auth_code:this.check_obj.code,
				}
				Util.post({
					obj:this,
					url:'/site/code-valid',
					data:_data,
					success:(res_data)=>{
						if(res_data.flag==false){
							this.$Message.warning(res_data.msg);
						}else{
							let data = res_data.data;
							this.status.confirm = false;
							this.status.check = false;
							this.status.setpwd = true;
							this.items[0].status_type = 'finish';
							this.items[1].status_type = 'finish';
							this.items[2].status_type = 'progress';
						}
					},error:()=>{
						this.$Message.error(infoType.infoApiError);
					}
				})


			},
			nextThree(){

				let _data = {
					tel:this.confirm_obj.phone,
					password_hash:this.setpwd_obj.password,
					repassword:this.setpwd_obj.right_pwd
				}
				Util.post({
					obj:this,
					url:"/site/request-password-reset",
					data:_data,
					success:(res_data)=>{
						if(res_data.flag==false){
							this.$Message.warning(res_data.msg);
						}else{
							let data = res_data.data;
							this.$Message.success('重置密码成功');
							this.clearParam();
							Util.delay(()=>{
								this.$router.push({
									name: "home"
								})
							},500);
						}
					},error:()=>{
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			clearParam(){
				this.confirm_obj.phone="";
				this.check_obj.code="";
				this.setpwd_obj.password = "";
				this.setpwd_obj.right_pwd="";
			},
			//重新获取验证码
			resetTime(){
				Util.post({
					obj:this,
					url:'/site/send-msg-reset-pwd',
					data:{tel:this.confirm_obj.phone},
					success:(res_data)=>{
						if(res_data.flag==false){
							this.$Message.warning(res_data.msg);
						}else{
							let data = res_data.data;
							this.$Message.success('发送验证码成功');
							var _this = this;
							_this.count_down_time = 5;
							_this.timer_t = setInterval(function(){
								if (_this.count_down_time > 0) {
									_this.count_down_time --;
								} else{
									clearInterval(_this.timer_t);
									_this.timer_t = null;
								}
							},1000);
						}
					},error:()=>{
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			backLogin (){
				this.$refs.headerView.btnLogin();
			},
			//header view的回调方法
			//login  登录成功
			loginSuccess(user,token){
				this.userInfo = user;
			}
		}
	}
</script>

<style scoped>
	.wait_line {
		border: 5px solid #CCCCCC;
		color: #CCCCCC;
	}

	.progress_line {
		border: 5px solid #FF9710;
		color: #FF9710;
	}

	.finish_line {
		border: 5px solid #ffcb87;
	}

	.wait_line_w {
		background: #cccccc;
	}

	.wait_line_p {
		background: #FF9710;
	}

	.wait_line_f {
		background: #ffcb87;
		;
	}

	.pro_font {
		color: #333333;
		font-size: 14px;
		margin-top: 15px;
	}

	.did_font {
		color: #999999;
		font-size: 14px;
		margin-top: 15px;
	}

	.one_status:first-child .left {
		background: #ffffff !important;
	}

	.one_status:last-child .right {
		background: #FFFFFF !important;
	}
	.next_btn{
		width: 300px;
		height: 37px;
		border-radius: 2px;
		background-color: #ff9710;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
		color: #FFFFFF;
		line-height: 1;
		font-size: 14px;
		cursor: pointer;
		line-height: 37px;
	}
	.next_btn:hover{
		background: #FFAC40;
	}
	.refresh {
		border: 1px solid #ff9710;
		background: #ffffff;
		color: #ff9710;
	}
	.dis_fresh{
		border: none;
		color: #666666;
		background: #EEEEEE;
	}
	.backlogin:hover{
		color: #FFAC40 !important;
	}
</style>
