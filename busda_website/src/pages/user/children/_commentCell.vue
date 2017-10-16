<template>
	<div style="width: 950px;height: 141px;border: 1px solid #e5e5e5;margin-bottom: 20px;">
		<!--title-->
		<div class="ub ub-ac" style="background: #EEEEEE;height: 35px;">
			<div class="ub ">
				<div style="margin-left: 19px;color: #666666;">订单号:{{data.order_id}}</div>
				<div style="margin-left: 58px;color: #666666;">下单时间:{{data.create_date}} {{data.create_time}}</div>
			</div>
			<div class="ub-f1 ub ub-pe ub-ac" style="margin-right: 33px;">
				<div style="width: 12px;height: 12px;" class="a1"></div>
				<div style="color: #666666;margin-left: 8px;">再次预订</div>
			</div>
		</div>
		<!--info-->
		<div class="ub ub-ac" style="background: #FFFFFF;height: 104px;">
			<div style="width: 340px;" class="ub">
				<div style="width: 120px;height: 75px;border: 1px solid #e5e5e5;margin-left: 19px;"></div>
				<div class="ub ub-ver ub-pc" style="margin-left: 22px;">
					<div class="ub">
						<div style="line-height: 1;color: #333333;">宇通53座大巴</div>
						<div style="line-height: 1;color: #333333;margin-left: 18px;">苏A牌</div>
					</div>
					<div class="ub" style="margin-top: 21px;">
						<div style="line-height: 1;color: #999999;">车龄：</div>
						<div style="line-height: 1;color: #333333;">3-5年</div>
						<div style="line-height: 1;color: #999999;">数量：</div>
						<div style="line-height: 1;color: #333333;">1辆</div>
					</div>
				</div>
			</div>
			<div style="width: 160px;height: 75px;" class="ub ub-ver ub-ac ub-pc ">
				<div>
				<div class="ub ub-pc ub-ac">
					<div style="color: #333333;line-height: 1;">上海</div>
					<div style="height: 2px;width: 25px;background: #333333;"></div>
					<div style="color: #333333;line-height: 1;">苏州</div>
				</div>
				<div class="ub-f1" style="margin-top: 21px;color: #333333;">3天</div>
				</div>
			</div>
			<div style="width: 125px; height: 75px;">
				<div style="line-height: 1;color: #333333;margin-top: 12px;">2017-08-20</div>
			</div>
			<div style="width: 85px;height: 75px;">
				<div style="line-height: 1;color: #333333;margin-top: 12px;">¥1820</div>
			</div>
			<div style="width: 125px;height: 75px;">
				<div style="line-height: 1;color: #333333;margin-top: 12px;">待点评</div>
			</div>
			
			<div style="width: 100px;height: 75px;" v-if="tt == 1"  class="ub ub-ver ub-ac">
				<div class="ub ub-ac ub-pc" style="margin-top: 4px;cursor: pointer;width: 60px;height: 25px;border-radius: 2px;box-shadow: 0 0 5px 0 rgba(51,51,51,0.2);border: 1px solid #ff9710;color: #FF9710;">点评</div>
			</div>
			<div style="width: 100px;" v-else>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props : {
			data : [Object]
		},
		data (){
			return {
				tt : '1'
			}
		},
		methods :{
			
		}
	}
</script>

<style scoped>
	.a1{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('../../../assets/images/bus/zaici.png');
	}
	
</style>