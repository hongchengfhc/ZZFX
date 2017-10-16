<template>
	<div style="width: 950px;height: 141px;border: 1px solid #e5e5e5;margin-bottom: 20px;">
		<!--title-->
		<div class="" style="background: #EEEEEE;height: 35px;line-height: 35px;">
			<div style="float: left;">
				<div style="margin-left: 19px;color: #999999;cursor:pointer;display: inline-block;">订单号：</div>
				<div class="orderid" @click="cellClick(data)" style="color: #333333;cursor:pointer;font-weight:600;display: inline-block;">{{data.id}}</div>
				<div style="margin-left: 58px;color: #999999;display: inline-block;">下单时间：{{data.create_time}}</div>
			</div>
			<div class="" style="margin-right: 33px;float: right;">
				<div style="width: 12px;height: 12px;display: inline-block;vertical-align: text-top;" class="a1"></div>
				<div class="book_again" style="color: #666666;margin-left: 8px;cursor: pointer;display: inline-block;" @click="refreshBook">再次预订</div>
			</div>
		</div>
		<!--info-->
		<div style="display: inline-block;width: 950px;">
		<div class="" style="background: #FFFFFF;height: 103px;overflow: auto;">
			<div style="width: 340px;float: left;overflow: auto;" class="">
				<div @click="cellClick(data)" style="width: 120px;height: 75px;background-size:120px 75px;border: 1px solid #e5e5e5;margin-left: 19px;cursor:pointer;margin-top: 14px;float: left;" :style="busImageStyle(data)"></div>
				<div class="" style="margin-left: 22px;margin-top: 14px;float: left;">
					<div class="" style="text-align: left;">
						<div style="color: #333333;width:80px;text-align:left;height: 36px;display: inline-block;" v-html="data.brand_name+' '+data.seat_count+' 座巴士'">宇通53座大巴</div>
						<div style="color: #333333;margin-left: 18px;display: inline-block;vertical-align: top;" v-html="data.brand_name">苏A牌</div>
					</div>
					<div class="" style="text-align: left;margin-top: 15px;">
						<div style="line-height: 1;color: #999999;display: inline-block;">车龄：</div>
						<div style="line-height: 1;color: #333333;width:62px;text-align:left;display: inline-block;" v-html="data.age_type">3-5年</div>
						<div style="line-height: 1;color: #999999;display: inline-block;">数量：</div>
						<div style="line-height: 1;color: #333333;display: inline-block;" v-html="data.bus_count+' 辆'">1辆</div>
					</div>
				</div>
			</div>
			<div style="width: 160px;height: 75px;float: left;margin-top: 14px;" class="">
				<div>
					<div class="" style="max-width: 160px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 20px;text-align: left;">
						<div style="color: #333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="data.area_name+data.start_station" v-html="'从 '+data.area_name+data.start_station">上海</div>
						<!--<div style="height: 2px;width: 25px;background: #333333;"></div>-->
						<!--<div style="padding: 0 4px;">——</div>-->
						<div style="color: #333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="data.end_station" v-html="'至 '+data.end_station">苏州</div>
					</div>
					<div class="" style="margin-top: 14px;color: #333333;" v-html="data.day_count+'天'">3天</div>
				</div>
			</div>
			<div style="width: 125px; height: 75px;float: left;margin-top: 14px;">
				<div style="line-height: 1;color: #333333;margin-top: 2px;" v-html="data.start_run_date">2017-08-20</div>
			</div>
			<div style="width: 125px;height: 75px;float: left;margin-top: 14px;">
				<div style="line-height: 1;color: #333333;margin-top: 2px;">¥{{data.order_price}}</div>
			</div>
			<div style="width: 85px;height: 75px;float: left;margin-top: 14px;">
				<div style="line-height: 1;color: #333333;margin-top: 2px;" v-html="data.status_des">等待支付</div>
			</div>

			<div style="width: 100px;float: left;margin-top: 14px;text-align: center;" v-if="data.status_id == 0" class="">
				<div @click="btnClickPay(data)" class="hightlight" style="cursor: pointer;width: 60px;height: 25px;border-radius: 2px;border: 1px solid #ff9710;color: #FF9710;display: inline-block;line-height: 25px;">支付</div>
				<div @click="btnClickCancel(data)" style="cursor: pointer;color: #999999;margin-top: 14px;">取消订单</div>
			</div>
			<div style="width: 100px;height: 75px;float: left;margin-top: 13px;" v-if="data.status_id == 2 || data.status_id == 1" class="">
				<div @click="btnClickCancel(data)" style="cursor: pointer;color: #999999;">取消订单</div>
			</div>
			<div style="width: 100px;height: 75px;float: left;margin-top: 14px;text-align: center;" v-else-if="data.status_id == 3" class="">
				<div @click="btnClickEvaluate(data)" class="hightlight" style="cursor: pointer;width: 60px;height: 25px;border-radius: 2px;border: 1px solid #ff9710;color: #FF9710;display: inline-block;line-height: 25px;">评价</div>
			</div>
			<div style="width: 100px;float: left;margin-top: 14px;" v-else>

			</div>
		</div>
		</div>
	</div>
</template>

<script>
	// TODO  订单状态....的相关
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'
	export default {
		props: {
			data: [Object]
		},
		data() {
			return {
				tt: '2'
			}
		},
		mounted() {},
		methods: {
			busImageStyle(data) {
				let imgurl = data.bus_img ? data.bus_img : 'http://img.zhizhuchuxing.cn/busda/empty.png';
				return {
					backgroundImage: 'url(' + imgurl + ')'
				}
			},
			cancelOrder(order_id) {
				Util.post({
					obj: this,
					url: '/order/cancel-order',
					data: {
						order_id: order_id
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
			btnClickPay(item) {
				Util.solveBubbing();
				this.$router.push({
					name: "pay",
					query: {
						order_id: item.id
					}
				})
			},
			btnClickCancel(item) {
				Util.solveBubbing();
				if(item.status_id == 0) {
					this.$Modal.confirm({
						title: '取消订单',
						cancelText: '关闭',
						content: '确定要取消订单？',
						onOk: () => {
							this.cancelOrder(item.id);
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
				//				this.$Modal.confirm({
				//					title:'取消订单',
				//					cancelText: '关闭',
				//					content:'确定要删除订单？',
				//					onOk :()=>{
				//						this.cancelOrder(item.id);
				//					},
				//					onCancel: ()=>{
				//						console.log('点击了取消');
				//					}
				//				})
			},
			cellClick(item) {
				this.$emit('cellClick', item);
			},
			refreshBook() {
				Util.solveBubbing();
				this.$router.push({
					name: "home",
				})
			},
			btnClickEvaluate(item) {
				Util.solveBubbing();
				this.$Modal.info({
					title: '温馨提示',
					content: '该模块正在全力开发中。。。'
				});
			}
		}
	}
</script>

<style scoped>
	.orderid:hover,
	.book_again:hover {
		color: #ff9710!important;
	}

	.a1 {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('../../../assets/images/bus/zaici.png');
	}

	.hightlight:hover {
		background-color: #ff9710 !important;
		color: #FFFFFF !important;
	}
</style>
