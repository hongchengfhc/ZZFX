<template>
<div>
	<Modal class="login" v-model="login_model" width="450" height="400" style="box-shadow:  0 0 25px 0 rgba(51, 51, 51, 0.4);">
		<!--title-->
		<div class="" style="padding: 16px;">
			<div class="" style="font-size: 20px;color: #333333;font-weight: 500;line-height: 1;text-align: center;" v-if="show_type==enumShowType.enumLogin">登录</div>
			<div class="" style="font-size: 20px;color: #333333;font-weight: 500;line-height: 1;text-align: center;" v-else>注册</div>
		</div>

		<!--<template>-->
		<!--登录-->
		<div class="" style="margin-top: 22px;padding: 0 58px;" :style="show_type==enumShowType.enumLogin ? 'display:block':'display:none'">
			<Form ref="login_form" :model="model_obj" :rules="login_rule">
				<FormItem label="" prop="phone">
					<Input v-model="model_obj.phone" style="width:300px;" placeholder="请输入手机号"></Input>
				</FormItem>
				<FormItem label="" prop="password">
					<Input type="password" v-model="model_obj.password" style="width:300px;" placeholder="请输入密码"></Input>
				</FormItem>

			</Form>
			<div class="login_btn" @click="loginDidClick('login_form')">立即登录</div>
			<div class="" style="width:300px">
				<div @click="forgetPwd()" class="forget_btn">忘记密码?</div>
			</div>
			<div class="go_register" @click="goToRegister">没有账号？立即注册</div>
		</div>
		<!--注册-->
		<div class="" style="margin-top: 22px;padding: 0 58px;" :style="show_type==enumShowType.enumRegister ? 'display:block':'display:none'">
			<Form ref="register_form" :model="register_obj" :rules="register_rule">
				<FormItem label="" prop="phone">
					<Input v-model="register_obj.phone" style="width:300px;" placeholder="请输入手机号"></Input>
				</FormItem>
				<FormItem label="" prop="code">
					<Input v-model="register_obj.code" style="width:200px;" placeholder="请输入验证码"></Input>
					<img @click="loadCodeImage()" :src="rdImgUrl" style="width:90px;height:32px;position: relative;vertical-align: middle;display:inline-block;margin-left:7px;border:1px solid #d7dde4" title="点击刷新">
					<!-- <div v-html="RDCode" style="width:90px;height:32px;position: relative;vertical-align: middle;display:inline-block;margin-left:7px;border:1px solid #d7dde4"></div> -->
					<!-- <Input v-model="RDCode" style="width:90px;margin-left:7px;" placeholder=""></Input> -->
				</FormItem>
			</Form>
			<div class="login_btn " @click="setPassword('register_form')">立即注册</div>
			<div class="xieyi ">点击注册代表您已经同意遵守《<span style="cursor:pointer;" @click="clickProtocol()">巴士达服务协议</span>》</div>
			<div class="go_register " @click="goToLogin">已有账号？立即登录</div>
		</div>
		<!--填写密码-->
		<div class="" style="margin-top: 22px;padding: 0 58px;" :style="show_type==enumShowType.enumPassword ? 'display:block':'display:none'">
			<Form ref="password_form" :model="password_obj" :rules="password_rule">
				<FormItem label="" prop="code">
					<Input v-model="password_obj.code" style="width:200px;" placeholder="请输入手机验证码"></Input>
					<div :class="count_down_time == 0 ? 'refresh' : 'dis_fresh'" style="width: 88px;height: 33px;border-radius: 2px; margin-right: 3px;float: right;cursor: pointer;line-height: 33px;text-align: center;" v-if="count_down_time == 0" class="" @click="resetTime">重新获取</div>
					<div :class="count_down_time == 0 ? 'refresh' : 'dis_fresh'" style="width: 88px;height: 33px;border-radius: 2px; margin-right: 3px;float: right;cursor: pointer;line-height: 33px;text-align: center;" v-else class="">剩余{{count_down_time}}s</div>
				</FormItem>
				<FormItem label="" prop="password">
					<Input type="password" v-model="password_obj.password" style="width:300px;" placeholder="请输入密码"></Input>
				</FormItem>
				<FormItem label="" prop="right_pwd">
					<Input type="password" v-model="password_obj.right_pwd" style="width:300px;" placeholder="请确认密码"></Input>
				</FormItem>
			</Form>
			<div @click="register('password_form')" class="login_btn" style="margin-top: 47px;">立即注册</div>
		</div>
	</Modal>
</div>
</template>

<script>
import Util from '../../../config/Util'
import infoType from '../../../config/infoType'
export default {
	props: {
		type: [String]
	},
	data() {
		const validatePass = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请输入密码'))
			} else {
				//					if(this.password_obj.password !== '') {
				//						callback(new Error('请输入密码'))
				//					}
				callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value != this.password_obj.password) {
				callback(new Error('两次输入密码不一致'));
			} else {
				callback();
			}
		};
		return {
			enumShowType: {
				enumLogin: "login",
				enumRegister: "register",
				enumPassword: "password"
			},
			show_type: 'login',
			login_model: false,

			timer_t: null,
			count_down_time: 59,

			model_obj: {
				phone: '',
				password: ''
			},
			rdImgUrl: Util.baseUrl + "/site/get-validate-code",
			register_obj: {
				phone: '',
				code: ''
			},
			password_obj: {
				code: '',
				password: '',
				right_pwd: ''
			},
			login_rule: {
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
				],
				password: [{
					required: true,
					message: '密码不能为空',
					trigger: 'blur'
				}]
			},
			register_rule: {
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
				],
				code: [{
					// 	required: true,
					// 	message: '验证码不能为空',
					// 	trigger: 'blur'
					// },
					// {
					// 	type: 'string',
					// 	min: 4,
					// 	message: '验证码格式不正确',
					// 	trigger: 'blur'
				}]
			},
			password_rule: {
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
				],
				password: [{
					required: true,
					validator: validatePass,
					trigger: 'blur'
				}],
				right_pwd: [{
					required: true,
					validator: validatePassCheck,
					trigger: 'blur'
				}]
			}
		}
	},
	mounted: function() {
		if (this.type) {
			this.show_type = this.type ? this.type : this.enumShowType.enumLogin;
		}
	},
	methods: {
		//登录
		loginDidClick(key) {

			this.$refs[key].validate((valid) => {
				if (valid) {
					let _data = {
						tel: this.model_obj.phone,
						in_pwd: this.model_obj.password
					}
					Util.post({
						obj: this,
						url: '/site/login',
						data: _data,
						success: (res_data) => {
							Util.ZZLog(res_data);
							if (res_data.flag == false) {
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								Util.setStorage(infoType.codeToken, data.token,infoType.timeStorage);
								Util.setStorage(infoType.codeUserKey,data.user,infoType.timeStorage);
								this.$Message.success('登录成功');
								this.login_model = false;
								this.$emit('loginSuccess', data.user,data.token);
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})
				} else {
//					this.$Message.error('请填写完整')
				}
			})

		},
		loadCodeImage() {
			this.rdImgUrl = Util.baseUrl + "/site/get-validate-code?" + Math.random();
		},
		//忘记密码
		forgetPwd(){
			this.$router.push({
				name:"findPwd"
			})
			this.login_model = false;
		},
		//没有账号立即注册
		goToRegister() {
			this.loadCodeImage();
			this.show_type = this.enumShowType.enumRegister;
		},
		clickProtocol(){
			Util.$router.push({
				router:this.$router,
				name:"protocol"
			})
		},
		//立即注册(确认密码)
		setPassword(key) {
			this.$refs[key].validate((valid) => {
				if (valid) {
					Util.post({
						obj: this,
						url: '/site/check-validate-code',
						data: {validate_code:this.register_obj.code},
						success: (res_data) => {
							if (res_data.flag == false) {
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								ajax(this);
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})

					function ajax(obj) {
						Util.post({
							obj: obj,
							url: '/site/send-msg-sign-up',
							data: {
								tel: obj.register_obj.phone
							},
							success: (res_data) => {
								Util.ZZLog(res_data);
								if (res_data.flag == false) {
									obj.$Message.warning(res_data.msg);
								} else {
									let data = res_data.data;
									obj.$Message.success('验证码发送成功');

									var _this = obj;
									_this.timer_t = setInterval(function() {
										if (_this.count_down_time > 0) {
											_this.count_down_time--;
										} else {
											clearInterval(_this.timer_t);
											_this.timer_t = null;
										}
									}, 1000);

									_this.show_type = obj.enumShowType.enumPassword;

								}
							},
							error: () => {
								obj.$Message.error(infoType.infoApiError);
							}
						})
					}

				} else {
//					this.$Message.error('请填写完整')
				}
			})

		},
		//注册
		register(key) {
			this.$refs[key].validate((valid) => {
				if (valid) {
					let _data = {
						tel: this.register_obj.phone,
						password_hash: this.password_obj.password,
						repassword: this.password_obj.right_pwd,
						auth_code: this.password_obj.code
					}
					Util.post({
						obj: this,
						url: "/site/sign-up",
						data: _data,
						success: (res_data) => {
							Util.ZZLog(res_data);
							if (res_data.flag == false) {
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								this.$Message.success('注册成功');
								this.show_type = this.enumShowType.enumLogin;
//								this.model_obj.phone = this.register_obj.phone;
								this.model_obj.password = "";

								//清空
								this.register_obj.phone = "";
								this.register_obj.code = "";

								this.password_obj.code = "";
								this.password_obj.password = "";
								this.password_obj.right_pwd = "";

								Util.setStorage(infoType.codeToken, data.token,infoType.timeStorage);
								Util.setStorage(infoType.codeUserKey,data.user,infoType.timeStorage);
								this.login_model = false;
								this.$emit('loginSuccess', data.user,data.token);
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})
				}
			});

		},
		//已有账号，立即登录
		goToLogin() {
			this.show_type = this.enumShowType.enumLogin;
		},
		//重新获取验证码
		resetTime() {
			this.setPassword('register_form');
			// var _this = this;
			// _this.count_down_time = 5;
			// _this.timer_t = setInterval(function(){
			// 	if (_this.count_down_time > 0) {
			// 		_this.count_down_time --;
			// 	} else{
			// 		clearInterval(_this.timer_t);
			// 		_this.timer_t = null;
			// 	}
			// },1000);
		}

	}
}
</script>

<style>
.login .ivu-modal-footer {
	padding-bottom: 20px;
	border-top: 1px solid #FFFFFF !important;
}
.login .ivu-modal-content {
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 0px;
    background-clip: padding-box;
}


.login .ivu-modal-footer .ivu-btn {
	display: none !important;
}

.login .ivu-modal-close {
	font-size: 12px;
	position: absolute;
	right: 16px;
	top: 8px;
	overflow: hidden;
	cursor: pointer;
	z-index: 1;
}
</style>

<style scoped>
.login_btn {
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
	text-align: center;
}
.login_btn:hover{
	background-color: #FFAC40;
}

.forget_btn {
	font-size: 12px;
	color: #999999;
	cursor: pointer;
	margin-top: 10px;
	line-height: 1;
	text-align: right;
}
.xieyi{
	color: #999999;
	margin-top: 10px;
	line-height: 1;
	text-align: center;
}

.go_register {
	width: 300px;
	height: 37px;
	border-radius: 2px;
	background-color: #FFFFFF;
	border: solid 1px #ff9710;
	color: #ff9710;
	cursor: pointer;
	line-height: 37px;
	text-align: center;
	margin-top: 23px;
	font-size: 14px;
	
}
.go_register:hover{
	background-color: #ff9710;
	color: #FFFFFF;
}

.refresh {
	border: 1px solid #ff9710;
	background: #ffffff;
	color: #ff9710;
}

.dis_fresh {
	border: none;
	color: #666666;
	background: #EEEEEE;
}
.forget_btn:hover{
	color: #FF9710;
}
</style>
