<template>
	<div style="text-align: left;" class="change_pwd">
		<div style="margin-top: 26px;margin-left: 40px;font-size: 14px;font-weight: 600;color: #333333;display: inline-block;">修改密码</div>
		<Form  ref="change_pwd" :model="change_obj" :rules="change_rule" style="margin-top: 74px;margin-left: 182px;">
			<FormItem label="原密码" prop="old_pwd">
				<Input v-model="change_obj.old_pwd" style="width:300px;" placeholder="请输入原密码" type="password"></Input>
			</FormItem>
			<FormItem label="新密码" prop="new_pwd">
				<Input v-model="change_obj.new_pwd" style="width:300px;" placeholder="请输入新密码" type="password"></Input>
			</FormItem>
			<FormItem label="确认密码" prop="check_pwd">
				<Input v-model="change_obj.check_pwd" style="width:300px;" placeholder="请确认新密码" type="password"></Input>
			</FormItem>
		</Form>
		<div class="save_btn" style="cursor: pointer;" @click="saveBtnDidClick">保存</div>
	</div>


</template>

<script>
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'
	export default {
		data (){
			const validatePass = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入新密码'))
				} else {
//					if(this.password_obj.password !== '') {
//						callback(new Error('请输入密码'))
//					}
					callback();
				}
			};
			const validatePassCheck = (rule, value ,callback) => {
				if (value === '') {
					callback(new Error('请确认新密码'));
				} else if (value != this.change_obj.new_pwd){
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				change_obj :{
					old_pwd : '',
					new_pwd :'',
					check_pwd : ''
				},
				change_rule :{
					old_pwd  : [{
						required: true,
						message : '请输入原密码',
						trigger : 'blur'
					}],
					new_pwd : [{
						required : true,
						validator : validatePass,
						trigger : 'blur'
					}],
					check_pwd :[{
						required : true,
						validator : validatePassCheck,
						trigger :'blur'
					}]
				}
			}
		},
		methods: {
			saveBtnDidClick(){
				this.$refs.change_pwd.validate((valid)=>{
					if (valid) {
						let data = {
							pwd: this.change_obj.old_pwd,
							npwd : this.change_obj.check_pwd
						}
						Util.post({
							obj: this,
							url: '/user/edit-pwd',
							data  : data,
							success : (res_data)=>{
								Util.ZZLog(res_data);
								if (!res_data.flag) {
									this.$Message.warning(res_data.msg);
								} else{
									this.$Message.success('修改成功');
									this.change_obj.old_pwd="";
									this.change_obj.new_pwd="";
									this.change_obj.check_pwd="";
								}
							},
							error : ()=>{
								this.$Message.error(infoType.infoApiError);
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.change_pwd .ivu-form .ivu-form-item-label {
		    text-align: right;
		    vertical-align: middle;
		    float: left;
		    font-size: 14px;
		    color: #333333;
		    line-height: 1;
		    padding: 10px 42px 10px 0;
		    box-sizing: border-box;
		    width: 110px;
	}

	.change_pwd .ivu-form-item-error-tip {
		    position: absolute;
		    top: 100%;
		    left: 118px;
		    line-height: 1;
		    padding-top: 6px;
		    color: #ff3300;
		}
</style>

<style scoped>
	.save_btn{
		width: 300px;
		height: 37px;
		border-radius: 2px;
		background-color: #ff9710;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
		color: #FFFFFF;
		line-height: 37px;
		margin-left: 291px;
		margin-top: 14px;
		text-align: center;
		font-size: 14px;
	}

	.save_btn:hover{
		background-color: #FFAC40 !important;
	}
</style>
