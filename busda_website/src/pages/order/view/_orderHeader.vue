<template>
	<div class="" style="width: 1200px;height: 150px;background: #FFFFFF;">
		<div class="">
			<div style="overflow: auto;margin-left: 190px;" class="">
				<div class="one_status" v-for="(item,index) in items" style="float: left;margin-top: 36px;">
					<div class="" style="clear: both;overflow: auto;">
						<div class="left" style="width: 75px;height: 2px;float: left;margin-top: 6px;" :class="item.finish == true ? 'sel':'dis'"></div>
						<div style="width: 14px;height: 14px;border-radius: 7px;border: 2px solid #CCCCCC;float: left;" :class="{'finish_style':item.finish}"></div>
						<div class="right" style="width: 75px;height: 2px;float: left;margin-top: 6px" :class="item.finish == true ? 'sel':'dis'"></div>
					</div>
					<div style="margin-top: 8px;color: #999999;" :class="{'finish_font':item.finish}">{{item.status_name}}</div>
				</div>
			</div>
			<!--操作-->
			<!--下单-->
			<div v-show="t_status == 0" class="" style="width: 680px;margin-top: 23px;text-align: left;margin-left: 260px;">
				<div class="" style="float: left;">
					<div style="color: #333333;font-size: 14px;font-weight: 500;display: inline-block;">等待支付</div>
					<Icon type="information-circled" style="font-size: 14px;color: #CCCCCC;margin-left: 40px;display: inline-block;"></Icon>
					<div style="color: #ec332c;margin-left: 8px;display: inline-block;">车辆将为您保留30分钟<span v-show="fen!=0&&miao||miao!=0">,剩余{{fen}}分{{miao}}秒</span></div>
				</div>
				<div class="" style="float: right;margin-top: -5px;">
					<div @click="toPay()" class="hightlight" style="border-radius: 2px;background: #ff9710;box-shadow: 0 0 5px 0 rgba(51,51,51,0.2);color: #FFFFFF;cursor: pointer;margin-right: 50px;;width: 65px;height: 30px;display: inline-block;line-height: 30px;text-align: center;">支付</div>
					<div @click="cancel()" style="cursor: pointer;color: #999999;display: inline-block;">取消订单</div>
				</div>
			</div>
			<!--支付-->
			<div v-show="t_status == 1" class="" style="width: 680px;margin-top: 23px;text-align: left;margin-left: 260px;">
				<div class="" style="float: left;">
					<div style="color: #333333;font-size: 14px;font-weight: 500;">已支付</div>
					<!-- <Icon type="information-circled" style="font-size: 14px;color: #CCCCCC;margin-left: 40px;"></Icon>
				<div style="color: #ec332c;margin-left: 8px;">车辆将为您保留10分钟</div> -->
				</div>
				<div class="" style="float: right;">
					<div @click="cancel()" style="cursor: pointer;color: #999999;margin-top: 1px;">取消订单</div>
				</div>
			</div>
			<!--派车-->
			<div v-show="t_status == 2" class="" style="width: 680px;margin-top: 23px;text-align: left;margin-left: 260px;">
				<div class="" style="float: left;">
					<div style="color: #333333;font-size: 14px;font-weight: 500;">派车中</div>
					<!-- <Icon type="information-circled" style="font-size: 14px;color: #CCCCCC;margin-left: 40px;"></Icon>
				<div style="color: #ec332c;margin-left: 8px;">尚未完善行程信息，请完善</div> -->
				</div>
				<div class="" style="float: right;">
					<div @click="cancel()" style="cursor: pointer;color: #999999;margin-top: 1px;">取消订单</div>
				</div>
			</div>
			<!--出行-->
			<!--<div v-show="t_status == 3" class="ub ub-ac" style="width: 680px;margin-top: 23px;">
				<div class="ub ub-ac">
					<div style="color: #333333;font-size: 14px;font-weight: 500;">已派车</div>
				</div>
				<div class="ub ub-ac ub-f1 ub-pe">
				</div>
			</div>-->
			<!--评价-->
			<div v-show="t_status == 3" class="" style="width: 680px;margin-top: 23px;text-align: left;margin-left: 260px;">
				<div class="" style="float: left;">
					<div style="color: #333333;font-size: 14px;font-weight: 500;display: inline-block;">已完成</div>
					<Icon type="information-circled" style="font-size: 14px;color: #CCCCCC;margin-left: 40px;display: inline-block;"></Icon>
					<div style="color: #ec332c;margin-left: 8px;display: inline-block;">评价此次用车</div>
				</div>
				<div class="" style="float: right;margin-top: -5px;">
					<div @click="evaluateDidClick" class="" style="border-radius: 2px;background: #ff9710;box-shadow: 0 0 5px 0 rgba(51,51,51,0.2);color: #FFFFFF;cursor: pointer;;width: 65px;height: 30px;line-height: 30px;text-align: center;">评价</div>
				</div>
			</div>
			<!--已经取消-->
			<div v-show="t_status == 4" class="" style="width: 680px;margin-top: 23px;text-align: left;margin-left: 260px;">
				<div class="">
					<div style="color: #333333;font-size: 14px;font-weight: 500;">已取消</div>
					<!--<Icon type="information-circled" style="font-size: 14px;color: #CCCCCC;margin-left: 40px;"></Icon>
					<div style="color: #ec332c;margin-left: 8px;">评价此次用车</div>-->
				</div>
				<!--<div class="ub ub-ac ub-f1 ub-pe">
					<div class="ub ub-ac ub-pc" style="border-radius: 2px;background: #ff9710;box-shadow: 0 0 5px 0 rgba(51,51,51,0.2);color: #FFFFFF;cursor: pointer;;width: 65px;height: 30px">评价</div>
				</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'
	export default {
		props: {
			order_id: [String, Number],
			status: [Number, String],
			limit_time: [Number, String]
		},
		data() {
			return {
				items: [{
					finish: true,
					status_id: 0,
					status_name: '下单'
				}, {
					finish: true,
					status_id: 1,
					status_name: '支付'
				}, {
					finish: true,
					status_id: 2,
					status_name: '派车'
				}, {
					finish: true,
					status_id: 3,
					status_name: '出行'
				}, {
					finish: true,
					status_id: 3,
					status_name: '评价'
				}],
				t_status: 0, //父子 中间变量
				timer_t: null,
				count_time: 0,
				fen: 0,
				miao: 0
			}
		},
		watch: {
			order_id(cur,old){
				this.load();	
			},
			status(cur, old) {
				this.t_status = cur;
			},
			t_status(cur, old) {
				this.items.map(x => {
					//					if(x.status_id <= this.status) {
					//						x.finish = true;
					//					} else {
					//						x.finish = false;
					//					}
					if(cur == 4) {
						x.finish = false;
					} else {
						if(x.status_id <= cur) {
							x.finish = true;
						} else {
							x.finish = false;
						}
					}
				})
			}
		},
		methods: {
			load() {
				this.items.map(x => {
					if(this.t_status == 4) {
						x.finish = false;
					} else {
						if(x.status_id <= this.t_status) {
							x.finish = true;
						} else {
							x.finish = false;
						}
					}

					//				if(x.status_id <= this.status) {
					//					x.finish = true;
					//				} else {
					//					x.finish = false;
					//				}
				})
				Util.ZZLog(this.status);
				this.t_status = this.status;
				if (this.status != 0) {
					return;
				}
				this.count_time = parseInt(this.limit_time);
				console.log(this.limit_time);
				clearInterval(this.timer_t);
				this.timer_t = null;
				this.fen = 0;
				this.miao = 0;
				this.timer_t = setInterval(() => {
					if(this.count_time > 0) {
						this.count_time--;
						this.fen = parseInt(this.count_time / 60);
						this.miao = this.count_time % 60;
						//					this.status = 4;
					} else {
						clearInterval(this.timer_t);
						this.t_status = 4;
						this.items.map(x => {
							x.finish = false;
						})
						this.$emit('refreshStatus');
						this.timer_t = null;
					}
				}, 1000)
			},
			toPay() {
				this.$router.push({
					name: "pay",
					query: {
						order_id: this.order_id
					}
				})
			},
			evaluateDidClick() {
				this.$Message.info('点评模块正在全力开发中。。。');
			},
			cancel() {

				if(this.t_status == '0') {
					this.$Modal.confirm({
						title: '取消订单',
						content: '确定要取消订单？',
						cancelText: '关闭',
						onOk: () => {
							Util.post({
								obj: this,
								url: '/order/cancel-order',
								data: {
									order_id: this.order_id
								},
								success: (res_data) => {
									if(res_data.flag == false) {
										this.$Message.warning(res_data.msg);
										this.$emit('orderCancelError');
									} else {
										this.$Message.success('取消订单成功！');
										let data = res_data.data;
										this.$emit('orderCancelSuccess');
									}
								},
								error: () => {
									this.$Message.error(infoType.infoApiError);
									this.$emit('orderCancelError');
								}
							})
						},
						onCancel: () => {
							console.log('点击了取消');
						}
					})
				} else {
					this.$Modal.info({
						title: '提示',
						content: '您的订单车队已承接安排派车，取消订单可能产生赔付金，请联系巴士达客服处理，电话：025-85531157'
					})
				}

			}
		}
	}
</script>

<style scoped>
	.finish_style {
		border: 2px solid #FF9710 !important;
	}
	
	.finish_font {
		color: #333333 !important;
	}
	
	.sel {
		background: #FF9710;
	}
	
	.dis {
		background: #CCCCCC;
	}
	
	.one_status:first-child .left {
		background: #FFFFFF !important;
	}
	
	.one_status:last-child .right {
		background: #FFFFFF !important;
	}
	
	.hightlight:hover {
		background-color: #FFAC40 !important;
	}
</style>