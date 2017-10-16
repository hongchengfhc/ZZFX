<!--车队入驻-->
<template>
	<div>
		<header-view ref="headerView" :selectMenu="4"></header-view>
		<div style="height: 700px;background: #EEEEEE;">
			
			<div style="margin: 0 auto;width: 1200px;">
				<!--<div class="" style="height: 700px;background: #EEEEEE;margin-top: 1px;">-->
				<div style="width: 1125px;height: 263px;background-image:url(static/images/fleet/fleet.png);margin-top: 208px;display: inline-block;" class="img"></div>
				<!--</div>-->
			</div>
		</div>
		<div style="margin: 0 auto;width: 1200px;position: relative;">
				<div class="" style="position: absolute;left: 375px;z-index: 1;bottom: 205px;">
					<div class="" style="width: 450px;height: 340px;background: #FFFFFF;box-shadow:  0 0 25px 0 rgba(51, 51, 51, 0.4);display: inline-block;">
						<div style="margin-top: 33px;line-height: 1;font-size: 20px;color: #333333;">车队入驻</div>
						<div class="" style="text-align: center;">
							<div style="display: inline-block;margin-top: 38px;">
							<Form ref="fleet_form" :model="fleet_obj" :rules="fleet_rule">
								<FormItem label="" prop="fleet_name">
									<Input v-model="fleet_obj.fleet_name" style="width:300px;" placeholder="请输入车队名称"></Input>
								</FormItem>
								<FormItem label="" prop="fleet_phone">
									<Input v-model="fleet_obj.fleet_phone" label="" prop="fleet_phone" style="width:300px;" placeholder="请输入联系电话"></Input>
								</FormItem>
							</Form>
							<div class="submite_btn" style="margin-top: 8px;margin: 0 auto;" @click="submiteDidClick">立即提交</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		<footer-view></footer-view>
	</div>
</template>

<script>
	import headerView from '../common/_header'
	import footerView from '../common/_footer'
	import Util from '../../config/Util'
	import infoType from '../../config/infoType'

	export default {
		data() {
			return {
				fleet_obj: {
					fleet_name: '',
					fleet_phone: ''
				},
				fleet_rule: {
					fleet_name: [{
						required: true,
						message: '车队名称不能为空',
						trigger: 'blur'
					}],
					fleet_phone: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 11,
						message: '手机号格式不正确',
						trigger: 'blur'
					}]
				}
			}
		},
		components: {
			headerView,
			footerView
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				Util.ZZLog(vm);
				vm.$refs.headerView.loginUserInfo();
			})
		},
		methods: {
			submiteDidClick() {
				this.$refs.fleet_form.validate((valid) => {
					if(valid) {
						let data = {
							fleet_name: this.fleet_obj.fleet_name,
							phone: this.fleet_obj.fleet_phone
						}

						Util.post({
							obj: this,
							url: '/home-page/add-fleet',
							data: data,
							success: (res_data) => {
								Util.ZZLog(res_data);
								if(res_data.flag == false) {
									this.$Message.warning(res_data.msg);
								} else {
									this.$router.push({
										name: 'successApply',
										query: data
									})
								}
							},
							error: () => {
								this.$Message.error(infoType.infoApiError);
							}
						})

					} else {
						//						this.$Message.error('请填写完整信息')
					}
				})
			}
		}
	}
</script>

<style scoped>
	.submite_btn {
		width: 300px;
		height: 37px;
		border-radius: 2px;
		background-color: #ff9710;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
		color: #FFFFFF;
		line-height: 37px;
		font-size: 14px;
		cursor: pointer;
	}
	
	.img {
		/*background-image: url('../../assets/images/fleet/fleet.png');*/
		/*background-image: url('http://img.zhizhuchuxing.cn/busda/fleet.png');*/
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.submite_btn:hover {
		background-color: #FFAC40;
	}
</style>