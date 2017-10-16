<template>
<div class="footer" style="background: #ffffff;height: 300px;box-shadow: 0 -1px 0 0 #dddee1;">
	<div class="topline" style="width:100%;height:8px;background:#ff9710;"></div>
	<div class="center ub ub-ver " style="width:1200px;margin: 0 auto;position:relative;">
		<BackTop ref="ttt" class="box" :height="0" style="cursor: pointer;width:60px;height:60px;position:absolute;border:5px solid #ff9710;background: #FFFFFF;right:0;top:-34px;z-index:100">
			<div class="jiantou" style="margin: 20px 17px;width: 16px;height: 11px;background-size: 100% 100%;background-repeat: no-repeat;"></div>
		</BackTop>
		<div class="top" style="text-align:left;">
			<div class="top_left ib" style="margin-top:51px;">
				<!-- <div class="one" v-for="item in titleList">
					<div class="title" v-html="item.title" :key="item.titleId">使用指南</div>
					<div @click="titleClick(dict)" class="row" v-for="dict in item.list" :key="dict.titleId" :titleId="dict.titleId" :parentId="dict.parentId" v-html="dict.title">价格说明</div>
				</div> -->
				<!--<div class="one">
						<div class="title">平台概况</div>
						<div @click="titleClick('1_1')" class="row hightlight" style="margin-top: 24px;">关于我们</div>
						<div @click="titleClick('1_2')" class="row hightlight">联系我们</div>
					</div>-->
				<div class="ib one">
					<div class="title">使用指南</div>
					<div @click="titleClick('2_3')" class="row hightlight" style="margin-top: 24px;">常见问题</div>
					<div @click="titleClick('2_1')" class="row hightlight">预订须知</div>
					<div @click="titleClick('2_2')" class="row hightlight">注意事项</div>
					<!--<div @click="titleClick('2_3')" class="row hightlight">常见问题</div>-->
				</div>

				<div class="ib one">
					<div class="title">支付说明</div>
					<div @click="titleClick('3_1')" class="row hightlight" style="margin-top: 24px;">价格说明</div>
					<div @click="titleClick('3_2')" class="row hightlight">付款说明</div>
					<div @click="titleClick('3_3')" class="row hightlight">发票开具</div>
				</div>
				<div class="ib one">
					<div class="title">车队入驻</div>
					<div @click="titleClick('4_1')" class="row hightlight" style="margin-top: 24px;">入驻说明</div>
					<div @click="titleClick('4_2')" class="row hightlight">入驻途径</div>
				</div>
				<div class="ib one">
					<div class="title">平台概况</div>
					<div @click="titleClick('1_1')" class="row hightlight" style="margin-top: 24px;">关于我们</div>
					<div @click="titleClick('1_2')" class="row hightlight">联系我们</div>
				</div>
			</div>
			<div class="ib top_right" style="float:right;text-align:right;">
				<!--<div class="ub" style="font-size: 14px;line-height: 1;margin-top: 10px;">24小时全国服务热线：</div>-->
				<div class="" style="margin-top: 43px;">服务时间：工作日09:00-18:00</div>
				<div class="" style="margin-top:9px;color:#333;font-size:28px;line-height: 1;">025-85531157</div>

				<!--<div class="ub" style="background:#FFB25A;width:165px;height:116px;margin-top:6px;mix-blend-mode: multiply;"></div>-->
				<div class="footerlogo" style="float:right;"></div>
			</div>
		</div>
		<div class="line" style="margin-top:60px;width:100%;height:1px;background:#e2e2e2;"></div>
		<div class="bottom ub" style="margin-top:27px;color:#4a494a;text-align:left;">Copyright ©2017 南京巴士达网络科技有限公司 版权所有 保留一切权利 <span style="cursor: pointer;text-decoration: underline;" class="beian" @click="toBeiAn">苏ICP备 17055763号-1</span></div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			titleList: [{
					title: '平台概况',
					titleId: 1,
					list: [{
						title: "关于我们",
						titleId: 2,
						parentId: 1
					}, {
						title: "联系我们",
						titleId: 3,
						parentId: 1
					}]
				},
				{
					title: '使用指南',
					titleId: 5,
					list: [{
						title: "预订须知",
						titleId: 6,
						parentId: 5
					}, {
						title: "注意事项",
						titleId: 7,
						parentId: 5
					}, {
						title: "常见问题",
						titleId: 8,
						parentId: 5
					}]
				},
				{
					title: '支付说明',
					titleId: 9,
					list: [{
						title: "价格说明",
						titleId: 10,
						parentId: 9
					}, {
						title: "付款方式",
						titleId: 11,
						parentId: 9
					}, {
						title: "发票开具",
						titleId: 12,
						parentId: 9
					}]
				},
				{
					title: '车队入驻',
					titleId: 13,
					list: [{
						title: "入驻说明",
						titleId: 14,
						parentId: 13
					}, {
						title: "入驻途径",
						titleId: 15,
						parentId: 13
					}]
				}
			],
			enumShowType: {
				enumAboutUs: "about_us", //关于我们
				enumContactUs: "contact_us", //联系我们
				enumBookNotes: "book_notes", //预订须知
				enumAttention: "attention", //注意事项
				enumCommonProblem: "common_problem", //常见问题
				enumPriceExplain: "price_explain", //价格说明
				enumPayStyle: "pay_style", //付款方式
				enumInvoice: "invoice", //发票开具
				enumFleetExplain: "fleet_explain", //入驻说明
				enumFleetChannel: "fleet_channel" //入驻途径
			}
		}
	},
	methods: {
		titleClick(val) {
			let sel_type = this.enumShowType.enumAboutUs;
			if (val == '1_1') sel_type = this.enumShowType.enumAboutUs;
			if (val == '1_2') sel_type = this.enumShowType.enumContactUs;
			if (val == '2_1') sel_type = this.enumShowType.enumBookNotes;
			if (val == '2_2') sel_type = this.enumShowType.enumAttention;
			if (val == '2_3') sel_type = this.enumShowType.enumCommonProblem;
			if (val == '3_1') sel_type = this.enumShowType.enumPriceExplain;
			if (val == '3_2') sel_type = this.enumShowType.enumPayStyle;
			if (val == '3_3') sel_type = this.enumShowType.enumInvoice;
			if (val == '4_1') sel_type = this.enumShowType.enumFleetExplain;
			if (val == '4_2') sel_type = this.enumShowType.enumFleetChannel;
			this.$emit('titleClick', sel_type);
			this.$router.push({
				name: "guide",
				query: {
					sel_type
				}
			})
		},
		toBeiAn() {
			window.open('http://www.miitbeian.gov.cn');
		}
	}
}
</script>

<style scoped="scoped">
.hightlight:hover {
	color: #ff9710 !important;
	border: 0px solid !important;
	/*border-color: transparent;
		border-width: 2px;*/
}

.one:not(:first-child) {
	margin-left: 103px;
}

.title {
	color: #333;
	font-weight: 600;
	font-size: 14px;
	margin-top: 25px;
	line-height: 1;
}

.one .title:first-child {
	margin-top: 0px;
}
.one{
	display: inline-table;
}
.row {
	margin-top: 15px;
	font-size: 14px;
	color: #666;
	cursor: pointer;
	line-height: 1;
}

.jiantou {
	background-image: url('../../assets/images/pay/jiantou.png');
}

.box:hover {
	background: #FF9710 !important;
	/*border-color: #ffffff !important;*/
}

.box:hover .jiantou {
	background-image: url('../../assets/images/pay/jiantou2.png');
}

.footerlogo {
	background-image: url('../../assets/images/logo/flogo.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	width: 90px;
	height: 46px;
	margin-top: 20px;
}

.beian:hover {
	text-decoration: underline;
	color: #333333;
}
</style>

<style type="text/css">
.footer .ivu-back-top .ivu-back-top-show {
	display: block !important;
}

.footer .ivu-back-top {
	z-index: 10;
	position: fixed;
	cursor: pointer;
	display: block !important;
}
</style>
