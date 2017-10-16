<template>
<div class="guideRight ib" style="width: 1000px;background: #FFFFFF;min-height: 750px;padding-bottom:50px;margin-left:200px;">
	<!--关于我们-->
	<div v-if="type == enumShowType.enumAboutUs">
		<div class="title">关于我们</div>
		<div class="content">
			<div class="normal space">品牌名称：巴士达</div>
			<div class="normal space">英文名称：busda</div>
			<div class="normal space">平台介绍：</div>
			<div class="normal space">南京巴士达网络科技有限公司致力于打造一个专业的互联网订车平台，以旅游客运行业的供需壁垒为出发点，搭建车辆供需双方的桥梁，优化订车流程，让车源信息更透明、让需求方订车更快捷、行车更有保障实时、便捷。我们的平台帮助您集合优质车源、快速订车、降低成本、安全用车、高效理赔，实现真正的线上订单与线下车队无缝连接。我们将联合更多的大型车队，以提供更多更好的资源和服务为平台宗旨，竭诚为您服务。</div>
			<div class="normal space">2017年8月巴士达成立。</div>
			<div class="normal space">2017年9月巴士达平台正式上线。</div>
		</div>
	</div>
	<!--联系我们-->
	<div v-if="type == enumShowType.enumContactUs">
		<div class="title">联系我们</div>
		<div class="content">
			<div class="normal space">公司地址：南京市鼓楼区建宁路1号</div>
			<div class="normal space">公司联系电话：025-85531157</div>
			<div class="normal space">商务合作邮箱： join@busda.cn</div>
		</div>
	</div>
	<!--预订须知-->
	<div v-if="type == enumShowType.enumBookNotes">
		<div class="title">预订须知</div>
		<div class="content">
			<div class="normal space">1、如果用户需取消订单，应第一时间联系平台客服人员。 出发前48小时，可进行订单无损取消；出发前48小时内24小时外订单取消，用户需按订单的10%向平台缴纳违约赔偿金；出发前24内订单取消，用户需按车价的20%向平台缴纳违约赔偿金。</div>
			<div class="normal space">2、实际出行时，用户应在当天行程开始前1小时再次跟车辆驾驶员确认是否能准时到达，如车辆不能按照预订时间准时到达并评估可到达时间超过预订行程开始后两小时，则用户有权要求汽车公司提供同等级、同质量、同等服务的车辆和司机替代按时履行服务。如汽车公司临时无法调车按时完成行程，与用户协商后，应立即与平台联系，平台承诺将在4小时内就近为用户调换车辆。因车辆迟到给用户造成的经济损失的，用户有权要求赔偿。</div>
			<div class="normal space">3、 实际行程过程中，车辆和驾驶员应与平台预订一致，如用户发现出车车辆与平台预订车辆不一致，且没有提前通知，则用户有权要求平台介入对车队进行处理。</div>
			<div class="normal space">4、 在实际承运过程中，应按照平台提报路线要求车辆行驶，不得随意改变行程和路线；如需临时变更，须向平台申请协调，同时本着友好互惠的原则，用户应第一时间与车队进行商讨，产生的费用差价由用户自行与车队协调并通过平台支付。如用户未申请平台协调，则平台不对平台上提报以外的私自附加行程负任何责任。</div>
		</div>
	</div>
	<!--注意事项-->
	<div v-if="type == enumShowType.enumAttention">
		<div class="title">注意事项</div>
		<div class="content">
			<div class="normal space">用户在用车服务过程应当遵守下列规定： </div>
			<div class="normal space">1、提前到达上车地点；</div>
			<div class="normal space">2、文明乘车，不得损坏车内设施，维护车内清洁卫生；</div>
			<div class="normal space">3、不向驾驶员提出违反出租汽车管理、道路交通管理、治安管理的要求；</div>
			<div class="normal space">4、不在车内进行违法活动；</div>
			<div class="normal space">5、文明乘车，不得损坏车内设施，维护车内清洁卫生；</div>
			<div class="normal space">6、安全行车，遵守交通管理法规；</div>
			<div class="normal space">7、不得利用车辆为违法犯罪提供方便，发现违法犯罪嫌疑人应当及时向公安机关或者本单位报告；</div>
			<div class="normal space">8、禁止运载违禁和易燃、易爆等物品；</div>
			<div class="normal space">9、接受市交通行政主管部门和有关管理机关的监督检查。</div>
		</div>
	</div>
	<!--常见问题-->
	<div v-if="type == enumShowType.enumCommonProblem">
		<div class="title">常见问题</div>
		<div class="content">
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：如何注册？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：点击网页右上角注册按钮，通过手机号和手机验证码进行用户注册，快捷方便。注册成功后平台客服人员将联系您完善资料。</div>
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：如何预订巴士？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：1、直接登陆巴士达在线订车服务系统预约用车服务。</div>
			<div class="normal space newrow">2、拨打平台客服电话，预约用车服务。</div>
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：如何填写行程？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：1、尽量详细的填写行程，如行程包含多个途径点， 应在目的地中按行程顺序填写，以便更准确的核算费用。</div>
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：可以通过哪些方式进行支付？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：支付方式目前已开通银行卡对公转账、微信、支付宝转账。用户选择完成车辆后应在30分钟内再次核对行程信息，并完成订车费用全</div>
			<div class="normal space newrow">额支付， 30分钟内，系统为用户保留所预订车辆，超出30分钟，已预订车辆将不再保留，需重新下单。</div>
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：如何使用银行卡转账付款？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：当您使用银行卡转账时，请您拨打平台的客服电话025-85531157，客服人员将为您延长付款时间以便您转账付款。</div>
			<div class="normal space newrow">公司全称：<span style="font-weight:600">南京巴士达网络科技有限公司</span></div>
			<div class="normal space newrow">公司账户：<span style="font-weight:600">125908391610401</span></div>
			<div class="normal space newrow">开户行：<span style="font-weight:600">招商银行股份有限公司南京北京东路支行</span></div>
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：预订不成功，无法支付怎么办？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：请直接拨打平台客服电话，由客服人员及时帮助您处理。</div>
			<div class="normal space" style="font-weight: 600;"><span class="wordQ">Q</span>：如果计划有变可以取消订单吗？有时间限制吗？</div>
			<div class="normal space answer"><span class="wordQ">A</span>：出发前48小时，可进行订单无损取消；出发前48小时内24小时外订单取消，用户需按订单的10%向平台缴纳违约赔偿金；出发前24内</div>
			<div class="normal space newrow">订单取消，用户需按车价的20%向平台缴纳违约赔偿金。退款将在5个工作日内按原路径退回您的账户。</div>
		</div>
	</div>
	<!--价格说明-->
	<div v-if="type == enumShowType.enumPriceExplain">
		<div class="title">价格说明</div>
		<div class="content">
			<div class="normal space">费用包含：</div>
			<div class="normal space">用户在平台支付的费用涵盖车辆租赁费、油费、过路过桥费、高速公路费、司机司贴、车辆停车费、发票税点。</div>
			<div class="normal space">费用不包含：</div>
			<div class="normal space">您支付的费用不涵盖司机住宿费和司机餐费及其它为标注的费用，（司机住宿和餐需用车方提供，需用车方另行结算）。</div>
		</div>
	</div>
	<!--付款方式-->
	<div v-if="type == enumShowType.enumPayStyle">
		<div class="title">付款方式</div>
		<div class="content">
			<div class="normal space">支付方式目前已开通银行卡对公转账、微信、支付宝转账。用户选择完成车辆后应在30分钟内再次核对行程信息，并完成订车费用全额支付， 30分钟内，系统为用户保留预订车辆，超出30分钟，已预订车辆将不再保留，需重新下单。通过银行卡转账请联系平台客服人员，平台可为用户延长付款时间。（平台客服电话：025-85531157）</div>
			<div class="normal space">费用包含：</div>
			<div class="normal space">用户在平台支付的费用涵盖车辆租赁费、油费、过路过桥费、高速公路费、司机司贴、车辆停车费、发票税点。</div>
			<div class="normal space">费用不包含：</div>
			<div class="normal space">您支付的费用不涵盖司机住宿费和司机餐费及其它未标注的费用，（司机住宿和餐需用车方提供，需用车方另行结算）。</div>
		</div>
	</div>
	<!--发票开具-->
	<div v-if="type == enumShowType.enumInvoice">
		<div class="title">发票开具</div>
		<div class="content">
			<div class="normal space">在订单的支付页面上有填写发票信息的版块，用户在下单时准确填写发票信息方便开具增值税发票，发票将由车队邮寄给您。</div>
		</div>
	</div>
	<!--入驻说明-->
	<div v-if="type == enumShowType.enumFleetExplain">
		<div class="title">入驻说明</div>
		<div class="content">
			<div class="normal space">本着互惠合作原则，巴士达欢迎车队加入我们的平台。您应当具备相关行政部门颁发的《营业执照》、《税务登记证》、《组织机构代码证》、《道路运输证》及各类经营许可证明，我们期待您的加入！</div>
		</div>
	</div>
	<!--入驻途径-->
	<div v-if="type == enumShowType.enumFleetChannel">
		<div class="title">入驻途径</div>
		<div class="content">
			<div class="normal space">全国客服电话：025-85531157</div>
			<div class="normal space">商务合作邮箱： join@busda.cn</div>
			<div class="normal space">公司地址：南京市鼓楼区建宁路1号</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		type: [String]
	},
	data() {
		return {
			curType: "about_us",
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
	mounted() {}
}
</script>

<style scoped>
.title {
	font-size: 14px;
	font-weight: 600;
	color: #333333;
	padding-top: 37px;
	padding-left: 60px;
	line-height: 1;
}

.content {
	margin-top: 26px;
	margin-left: 60px;
	margin-right: 89px;
}

.normal {
	font-size: 14px;
	line-height: 1.43;
	color: #333333;
}

.space {
	margin-top: 15px;
}

.newrow {
	margin-left: 25px;
}

.wordQ {
	width: 12px;
	display: inline-block;
	text-align: center;
}

.answer .wordQ {
	padding-right: 2px;
}

.answer {
	/*margin-left:3px;*/
}
</style>
