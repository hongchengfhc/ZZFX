<template>
	<div class="" style="padding: 30px 0;background: #fff4e7;width: 200px;min-height: 780px;height: 100%;text-align: left;">
		<div class=" " style="padding: 0 20px;">
			<div style="line-height: 1;font-size: 16px;font-weight: 600;color: #333333;display: inline-block;">账户余额</div>
			<!--一期开发先不做-->
			<!--<div class="ub ub-pe ub-f1">
				<div class="ub ub-ac ub-pc apply_btn">提现</div>
			</div>-->
			<div class="" style="float: right;">
				<div style="font-size: 24px;font-weight: 600;color: #333333;margin-top: -12px;display: inline-block;">{{total_price}}</div>
				<div style="font-size: 14px;font-weight: 600;color: #333333;padding-left: 10px;margin-top: -2px;display: inline-block;vertical-align: top;">元</div>
			</div>
		</div>



		<!--一期开发先不做-->
		<!--<div class="ub ub-ac"  style="padding: 0 20px;">
			<div>冻结金额 {{frozen_price}}元</div>
			<div class="ub-f1 ub-pe ub " >
				<div class="a"></div>
			</div>
		</div>-->
		<!--<Icon type="information-circled" style="font-size: 13px;color: #CCCCCC;"></Icon>-->

		<!--一期开发先不做-->
		<!--<div class="ub ub-pc">
			<div class="recharge ub ub-ac ub-pc">充值</div>
		</div>
		<div style="line-height: 1;color: #666666;margin-top: 12px;">充 10000，送 2000</div>-->


		<div style="margin-top: 38px;" class="">
			<div v-for="(item,index) in items" :key="item.item_id" :style="item.selected == true ? 'border-left:4px solid #ff9710':'border-left:4px solid #fff4e7'"  @click="itemDidClick(item)" class="hightlight" :class="{sel_item : item.selected}" style="cursor: pointer;width: 200px;height: 45px;color: #333333;background: #fff4e7; line-height: 45px;font-size: 14px;">
				<!--<div class="line" style="width: 4px;height: 45px;" :style="item.selected == true ? 'background:#ff9710' : 'background : #fff4e7'"></div>-->
				<div  style="margin-left: 69px;">{{item.item_name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				total_price : '0',
				frozen_price : '0',
				items : [{
					item_name : '我的订单',
					item_id : 'order',
					selected : true
				},{
					item_name : '用车点评',
					item_id : 'comment',
					selected : false
				}
//				,{
//					item_name : '用车预约',
//					item_id : '3',
//					selected : false
//				},{
//					item_name : '账户明细',
//					item_id : '4',
//					selected : false
//				}
				,{
					item_name : '修改密码',
					item_id : 'changePwd',
					selected : false
				}],
				sel_type :'',
			}
		},
		components : {

		},
		methods : {
			itemDidClick(item){
				this.items.map(x=>x.selected = false);
				item.selected = true;
				this.sel_type = item.item_id;
				this.$emit('selType',this.sel_type);
			},
			setSelType(type){
				let item = this.items[0];
				item.sel_type = type;

				this.items.map(x=>x.selected = false);
				item.selected = true;
				this.sel_type = item.item_id;
				this.$emit('selType',this.sel_type);
			}
		}
	}
</script>

<style scoped="scoped">
	.apply_btn{
		width: 60px;
		height: 25px;
		border-radius: 2px;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
		border: solid 1px #ff9710;
		color: #FF9710;
		font-size: 12px;
		cursor: pointer;
	}
	.recharge{
		width: 160px;
		height: 40px;
		border-radius: 2px;
		background-color: #ff9710;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
		color: #ffffff;
		font-size: 16px;
		font-weight: 500;
		line-height: 1;
		margin-top: 26px;
	}
	.sel_item{
		background: #FFFFFF !important;
	}
	.a{
		background-image: url('../../../assets/images/bus/zhuyi.png');
		width: 13px;
		height: 13px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.hightlight:not(.sel_item):hover{
		background: #FFFFFF !important;
		border-left: 4px solid #FFFFFF !important;
	}
</style>
