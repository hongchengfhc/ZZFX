<template>
	<div>
	<Modal class="ecode" @on-cancel="cancel" v-model="ecode_model" width="550" height="430" style="box-shadow:  0 0 25px 0 rgba(51, 51, 51, 0.4);">
		<!--title-->
		<div class="" style="padding: 16px;">
			<div class="" style="font-size: 14px;color: #333333;font-weight: 500;line-height: 1;">{{pay_style_alias}}支付</div>
		</div>
		<div style="height: 1px; background: #e5e5e5;"></div>
		<div class="" style="">
			<div style="margin-top: 46px;margin-bottom: 30px;text-align: center;color: #666666;font-size: 14px;">请用{{pay_style_alias}}扫一扫，扫描二维码支付</div>
			<div style="margin:0 auto;width: 175px;height:175px ;background-repeat: no-repeat;background-size: 100% 100%;" :style="getImage(this.pay_img)" ></div>
			<div class="otherMethod" style="font-size: 12px;color: #999999;text-align: center;margin-top: 49px;cursor: pointer;" @click="close">选用其他方式支付</div>
		</div>
	</Modal>
	</div>
</template>

<script>
	export default {
		props: {
			pay_style_alias: [String],
			pay_style_id : [String,Number],
			order_id : [String,Number],
//			order_ecode: [String]
		},
		data (){
			return {
				ecode_model: false,
				pay_img:''
			}
		},
		mounted:function(){
//			this.pay_img = this.order_ecode;
		},
		methods: {
			ttt (){
				this.$emit('t',777);
				return '666';
			},
			getImage(a){
				return 'background-image:url('+this.pay_img+')';
			},
			close(){
				this.ecode_model = false;
			},
			cancel(){
				this.$emit('close');
			}
		}
	}
</script>

<style>
	.ecode .ivu-modal-footer{
		padding-bottom: 20px;
		border-top: 1px solid #FFFFFF !important;
	}
	.ecode .ivu-modal-footer .ivu-btn{
		display: none !important;
	}
	/*.ecode .ivu-modal .ivu-icon-ios-close-empty {
	    font-size: 45px;
	    color: #999;
	    transition: color 0.2s ease;
	    position: relative;
	    top: 1px;
	}*/
	.ecode .ivu-modal-close {
	    font-size: 12px;
	    position: absolute;
	    right: 16px;
	    top: 8px;
	    overflow: hidden;
	    cursor: pointer;
	    z-index: 1;
	}
	.ecode .ivu-modal-body{
		padding: 0;
	}
</style>

<style scoped>
	.otherMethod:hover{
		color:#ff9710!important;
	}
</style>
