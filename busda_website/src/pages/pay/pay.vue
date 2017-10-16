<template>
<div>
	<header-view></header-view>
	<div style="background: #EEEEEE; padding-top: 54px;padding-bottom: 153px;">
		<div style="width: 1200px;height: 550px;margin: 0 auto;background: #FFFFFF;padding: 36px 53px;">
			<div class="" style="text-align:left;">
				<div class="ib">
					<div class="ib" style="font-size: 14px;font-weight: 500;color: #333333;line-height: 1;">预订成功，请付款！</div>
					<div class="ib" style="padding-left: 14px;line-height: 1;font-size: 12px;color: #ff0000;line-height: 1.1;margin-top: 1px;">车辆将为您保留30分钟，剩余{{fen}}分{{miao}}秒</div>
				</div>
				<div class="ib" style="float:right;margin-right: 47px;" v-show="this.use_money != 0">
					<span style="color: #999999;line-height: 1;margin-right: 10px;">应付</span>
					<span style="color: #333333;line-height: 1;margin-right: 35px;">¥{{pay_money}}</span>
					<span style="color: #999999;line-height: 1;margin-right: 10px;">已使用账户余额</span>
					<span style="color: #333333;;line-height: 1;">¥{{use_money}}</span>
				</div>
			</div>
			<div style="padding-left: 47px;text-align: left;line-height: 1;margin-top: 45px;color: #333333;font-size: 16px;font-weight: 500;margin-bottom: 6px;">在线支付</div>
			<div class="">
				<div class=" pay_item" v-for="(item,index) in pay_style_ary" @click="payStyleDidClick(item)" :key="item.pay_id" :class="item.selected==true?'sel_pay':'dis_pay'" style="margin: 0 47px;padding: 20px 0;border-bottom: 1px solid #e5e5e5;text-align:left;">
					<div class="ib">
						<!--<Icon type="android-checkbox" style="font-size: 16px;" :style="item.selected==true?'color:#ff9710':'color: #999999'"></Icon>-->
						<div class="ib" style="float:left;margin-top:13.5px;" :class="item.selected==true?'sel_img':'dis_img'"></div>
						<div class="ib" style="float:left;width: 45px;height: 45px;margin-left: 32px;" :class="getImgByType(item.pay_id)"></div>
						<div class="ib" style="float:left;margin-left: 23px;margin-top:5px;">
							<div style="line-height: 1;font-size: 14px;text-align: left;">{{item.pay_name}}</div>
							<div style="line-height: 1;font-size: 14px;margin-top: 9px;text-align: left;">{{item.pay_eng_name}}</div>
						</div>
					</div>
					<div style="text-align: right;float:right;line-height:45px;">
						<span class="" style="font-size: 14px;line-height: 1;display: inline-block;">支付 </span>
						<span class="" style="font-size: 14px;font-weight: 600;line-height: 1;margin-left: 8px;display: inline-block;">¥</span>
						<span style="font-weight: 600;font-size: 28px;display: inline-block;">{{pay_money}}</span>
					</div>
				</div>
			</div>
			<div class="pay_btn" @click="payBtnDidClick">立即支付</div>
			<div style="margin: 47px;text-align:left;" class="">
				<div class="ib" style="color: #333333;font-size: 16px;cursor: pointer;">其他支付</div>
				<div @click="bankDidClick" style="font-size: 14px;color: #ff9710;cursor: pointer;margin-left: 48px;" class="other ib">银行转账汇款</div>
			</div>
		</div>
	</div>
	<footer-view></footer-view>
	<ecode @t="t" @close="closeEcode" ref="codeinfo" :pay_style_alias="sel_style_alias" :pay_style_id="sel_style" :order_id="order_id"></ecode>
</div>
</template>

<script>
import headerView from "../common/_header"
import footerView from "../common/_footer"
import ecode from "./view/_ecode"
import Util from "../../config/Util"
import infoType from '../../config/infoType'


export default {
	data() {
		return {
			pay_style_ary: [{
				pay_id: '1',
				pay_name: '微信支付',
				pay_eng_name: 'WeChat Pay',
				//					pay_img: '../../assets/images/pay/wechat.png',
				selected: true
			}, {
				pay_id: '2',
				pay_name: '支付宝支付',
				pay_eng_name: 'Ali Pay',
				//					pay_img: '../../assets/images/pay/zhifubao.png',
				selected: false
			}],
			sel_style: '1',
			sel_style_alias: '微信',
			pay_money: '',
			use_money: '',
			order_id: '',
			order_code: '',
			timer: null,
			timer_t : null,//订单失效倒计时
			count_time : 0,
			fen : 0,
			miao : 0
			//				isShow : false
		}
	},
	components: {
		headerView,
		footerView,
		ecode
	},
	beforeRouteEnter(to,from,next){
		next((vm)=>{
			vm.load();
		})
	},
	mounted: function() {
		//			this.sel_style 	= this.pay_style_ary[0].pay_id;
		// let param = this.$route.query;
		// this.order_id = param.order_id;
		// this.$nextTick(() => {
		// 	this.initData();
		// })
	},

	methods: {
		load(){
			let param = this.$route.query;
			this.order_id = param.order_id;
			Util.isLogin({
                obj:this,
                success:(userInfo,token)=>{
					this.initData();
                },error:()=>{
                    this.$router.push({
						name:"home"
					})
                }
            })
		},
		initData() {
			Util.post({
				obj: this,
				url: '/order/order-pay-info',
				data: {
					order_id: this.order_id
				},
				success: (res_data) => {
					Util.ZZLog(res_data);
					if (res_data.flag == false) {
						if(res_data.code==infoType.codeNotLogin){
							this.$router.push({
								name:"home"
							})
						}else{
							this.$Message.warning(res_data.msg);
						}
					} else {
						let data = res_data.data;
						this.pay_money = data.pay_money;
						this.use_money = data.treasury_money;
						this.count_time = parseInt(data.pay_limit_time);
						this.timer_t = setInterval(()=>{
							if (this.count_time > 0) {
								this.count_time --;
								this.fen = parseInt(this.count_time / 60);
								this.miao = parseInt(this.count_time%60);
							} else{
								clearInterval(this.timer_t);
								this.timer_t = null;
							}
						},1000)
					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})
		},
		payStyleDidClick(item) {
			this.pay_style_ary.map(x => x.selected = false);
			item.selected = true;
			this.sel_style = item.pay_id;
			if (item.pay_id == '1') {
				this.sel_style_alias = '微信';
			} else {
				this.sel_style_alias = '支付宝';
			}
		},
		payBtnDidClick() {
			//				var t = this.$refs.ttt.ttt();
			//				console.log(t);
			//
			if (this.count_time == 0) {
				this.$Message.warning('订单已超时，请重新预订');
				return;
			}

			let data = {
				order_id: this.order_id,
				pay_money: this.pay_money,
				pay_type: this.sel_style
			}
			Util.post({
				obj: this,
				url: '/order/order-pay',
				data: data,
				success: (res_data) => {
					Util.ZZLog(res_data);
					if (res_data.flag == false) {
						this.$Message.warning(res_data.msg);
					} else {
						this.order_code = res_data.data.codUrl;
						//							this.$refs.codeinfo.pay_img = 'http://img.zhizhuchuxing.cn/wechat/disney.jpg';
						this.$refs.codeinfo.pay_img = res_data.data.codUrl;

						this.$refs.codeinfo.ecode_model = true;

						this.isPay();
					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})


		},
		t(param) {
			console.log(param);
		},
		getImgByType(pay_id) {
			if (pay_id == '1') {
				return 'wechat'
			} else {
				return 'ali'
			}
		},
		// 判断该订单是否支付
		isPay() {
			if (this.timer) {
				this.timer = null;
				clearInterval(this.timer);
			}
			if(this.$refs.codeinfo.ecode_model == false){
				return;
			}
			this.timer = setTimeout(() => {
				Util.post({
					obj: this,
					url: '/order/check-order-status',
					data: {
						order_id: this.order_id
					},
					success: (res_data) => {
						if (res_data.flag == false) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							let order_status = data.order_status;
							//待支付0  支付成功2
							if (order_status == '2') {
								Util.ZZLog('支付成功');
								Util.delay(() => {
									this.$refs.codeinfo.ecode_model = false;
									this.$router.push({
										name: "paySuccess",
										query: {
											order_id: this.order_id
										}
									})
								}, 500)
							}else{
								this.isPay();
							}
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			}, 1000);


		},
		closeEcode() {
			if (this.timer) {
				this.timer = null;
				clearInterval(this.timer);
			}
		},
		//银行转账汇款
		bankDidClick() {
			Util.$router.push({
				router: this.$router,
				name: 'guide',
				query: {
					sel_type: 'common_problem'
				}
			})
		}
	},

}
</script>

<style scoped>
.sel_pay div {
	color: #333333;
}

.sel_pay span {
	color: #333333;
}

.dis_pay div,
span {
	color: #cccccc;
}

.pay_btn {
	width: 215px;
	height: 50px;
	line-height: 50px;
	border-radius: 2px;
	background-color: #ff9710;
	box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	margin: 56px 0 0 47px;
	cursor: pointer;
}

.pay_btn:hover {
	background-color: #FFAC40 !important;
}

.wechat {
	background: url('../../assets/images/pay/wechat.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.ali {
	background-image: url('../../assets/images/pay/zhifubao.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.pay_item {
	cursor: pointer;
}

.pay_item:hover:not(.sel_pay) div {
	color: #999999;
}

.pay_item:hover:not(.sel_pay) span {
	color: #999999;
}

.sel_img {
	width: 13px;
	height: 13px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-image: url('../../assets/images/pay/xuanze1.png');
}

.dis_img {
	width: 13px;
	height: 13px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-image: url('../../assets/images/pay/xuanze2.png');
}

.other:hover {
	color: #FFAC40 !important;
}
</style>
