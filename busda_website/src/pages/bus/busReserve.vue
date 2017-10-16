<template lang="html">
	<div>
		<header-view ref="headerView" :selectMenu="-1" @loginSuccess="loginSuccess"></header-view>
		<div class="bus_reserve" style="background:#eee;padding-top:53px;padding-bottom:55px;">
			<div class="center" style="width:1200px;margin:0 auto;background:#fff;">
				<Form ref="ref_form" :model="formUserObj" :rules="userRuleValidate">
				<div class="info" style="padding-top:36px;padding-left:27px;padding-bottom:44px;text-align:left;">
					<!-- 省际包车 -->
					<div class="box">
						<div class="title_box">
							<div class="left_pannel" ></div>
							<div class="title" v-html="getBusType(urlParam.bus_type).name">省际包车</div>
						</div>
						<div class="con" style="">
							<div class="conbodyrow station" style="text-align:left;">
								<div class="one ib" v-for="(item,index) in station_to_station">
									<Icon v-if="station_to_station.length>=0 && index!=0" class="icon" type="ios-arrow-thin-right"></Icon>
									<span class="name">{{item}}</span>

								</div>
								<!-- <div class="one ">
            					<span class="name">上海</span>
            					<Icon class="icon" type="ios-arrow-thin-right"></Icon>
            				</div> -->
							</div>
							<div v-if="urlParam.bus_type!=2" class="conbodyrow" style="margin-top:27px;">
								<span style="color:#999;">往返</span>
								<span style="color:#333;margin-left:4px;" v-html="'约 '+loadData.model_info.mileage+' 公里'">约 589 公里</span>
								<span style="padding:0 35px;">|</span>
								<span style="color:#999;">行程天数</span>
								<span style="color:#333;margin-left:25px;">{{trip_day}} 天</span>
							</div>
							<div v-else class="conbodyrow" style="margin-top:27px;">
								<span style="color:#999;"></span>
								<span style="color:#333;">含 100 公里 8 小时 / 天</span>
								<span style="padding:0 35px;">|</span>
								<span style="color:#999;">行程天数</span>
								<span style="color:#333;margin-left:25px;">{{trip_day}} 天</span>
							</div>
						</div>
					</div>
					<!-- 省际包车 end -->

					<!-- 选择车辆 -->
					<div class="box" style="margin-top:51px;">
						<div class="title_box">
							<div class="left_pannel" ></div>
							<div class="title">选择车辆</div>
						</div>
						<div class="con" style="">
							<div class="ib">
								<div class="conbodyrow">
									<div class="one ">
										<div class="fl input_left">用车日期</div>
										<DatePicker @on-change="useBusDateChange" v-model="use_bus_date1" type="date" :options="dateOptions" placeholder="选择日期" style="width: 160px;height:32px;"></DatePicker>
										<span style="padding:0 5.5px;">—</span>
										<DatePicker type="date" :options="dateOptions" v-model="use_bus_date2" disabled placeholder="选择日期" style="width: 160px;height:32px;"></DatePicker>
									</div>
								</div>
								<div class="conbodyrow" style="margin-top:27px;">
									<div class="one ">
										<div class="fl input_left">用车数量</div>
										<Select @on-change="changePrice(loadData.model_info.model_price)" v-model="use_bus_count" style="width:160px;height:32px;text-align:left;">
											<Option v-for="item in ~~loadData.model_info.stock" :value="item" :key="item">{{ item }}</Option>
										</Select>
										<span style="margin-left:24px;color:#333;">车价</span>
										<span style="font-size:14px;font-weight:600;" v-html="'¥ '+total_price">¥ 2050</span>
										<span style="margin-left:22px;color:#333;">剩余</span>
										<span style="font-size:14px;font-weight:600" v-html="loadData.model_info.stock">3</span>
										<span style="color:#333;">辆</span>
									</div>
								</div>
							</div>
							<div class="ib" style="vertical-align: top;">
								<div class="ib" style="margin:0 81px;width:1px;height:89px;background:#ccc;"></div>
							</div>
							<div class="ib" style="vertical-align: top;">
								<div class="ib" :style="busImageStyle(loadData.model_info.imgUrl)" style="width:132px;height:85px;"></div>
								<div class="ib" style="margin-left:30px;vertical-align:top;">
									<div class="" style="color:#333;margin-top: 12px;">
										<span v-html="loadData.model_info.brand_name+' '+loadData.model_info.seat_count+' 座巴士'">宇通53座巴士</span>
										<span style="margin-left:17px;" v-html="loadData.model_info.num_plate">苏A牌</span>
									</div>
									<div class="" style="margin-top:22px;">
										<span style="color:#999;">正座：</span>
										<span style="color:#333;" v-html="loadData.model_info.seat_count">52+1</span>
										<span style="color:#999;margin-left:27px;">车龄：</span>
										<span style="color:#333;" v-html="loadData.model_info.age_type_name">3-5年</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 选择车辆 end -->

					<!-- 联系人 -->
					<div class="box" style="margin-top:43px;">
						<div class="title_box">
							<div class="left_pannel" ></div>
							<div class="title">联系人</div>
						</div>
						<!-- <div class="con" style="">
            			<div class="conbodyrow">
            				<div class="one ">
            					<div class="input_left">姓名</div>
            					<Input ref="ttt_name" v-model="contact_user" placeholder="请填写姓名" style="width: 160px;height:32px;"></Input>
            				</div>
            			</div>
                        <div class="conbodyrow" style="margin-top:30px;">
            				<div class="one ">
            					<div class="input_left">电话</div>
            					<Input v-model="contact_phone" placeholder="请填写手机号" :maxlength="parseInt(11)" style="width: 160px;height:32px;"></Input>
            				</div>
            			</div>
                    </div> -->
							<div class="con customer">
								<div class="one">
									<FormItem label="姓名" prop="contact_user" class="">
										<Input class="" v-model="formUserObj.contact_user" placeholder="请填写姓名" style="width: 160px;height:32px;"></Input>
									</FormItem>
								</div>
								<div class="one">
									<FormItem label="手机" prop="contact_phone" class="one" style="margin-bottom:0px;">
										<Input class="" v-model="formUserObj.contact_phone" placeholder="请填写手机号" style="width: 160px;height:32px;"></Input>
									</FormItem>
								</div>
							</div>

						<!-- <div class="con">
                        <Form class="one ">
                            <FormItem class="input_left" label="姓名" prop="contact_user">
                                <Input ref="ttt_name" v-model="contact_user" placeholder="请填写姓名" style="width: 160px;height:32px;"></Input>
                            </FormItem>
                        </Form>
                    </div> -->

					</div>
					<!-- 联系人  end -->

					<!-- 行程 -->
					<div v-show="showTrip(urlParam.bus_type)" class="box" style="margin-top:43px;">
						<div class="title_box">
							<div class="left_pannel" ></div>
							<div class="title">行程</div>
						</div>
						<div class="con" style="">
							<div class="conbodyrow">
								<!-- <div class="one ">
									<div class="input_left">出发地</div>
									<div class="trip_amap_input">
										<div class="" style="text-align:left;margin-left:10px;" v-html="tripStartArea"></div>
										<el-amap-search-box ref="amap_trip_first" :style="styleTripAmap()" :search-option="searchOption" :on-search-result="onMapSearchResult" class="search-box"></el-amap-search-box>
									</div>
								</div> -->
								<FormItem label="出发地" prop="detailArea" style="width:420px;" class="">
									<div class="ib trip_amap_input" :style="styleTripAmapDiv()">
										<div class="ib" style="text-align:left;margin-left:10px;" v-html="tripStartArea"></div>
										<el-amap-search-box class="ib search-box" ref="amap_trip_first" :style="styleTripAmap()" :search-option="searchOption" :on-search-result="onMapSearchResult"></el-amap-search-box>
									</div>
									<div v-if="detailArea_isEmpty"  class="ivu-form-item-error-tip">请填写详细出发地址</div>

								</FormItem>
							</div>
							<div class="ib conbodyrow" style="margin-top:30px;">
								<div class="ib one">
									<div class="fl input_left">出发时间</div>
									<DatePicker v-model="use_bus_date1" disabled type="date" :options="dateOptions" placeholder="选择日期" style="width: 140px;height:32px;"></DatePicker>
									<TimePicker ref="ref_timePicker" @on-change="useBusTimeChange" :value="urlParam.start_run_time" format="HH:mm" placeholder="请选择" style="width: 75px;margin-left:8px;"></TimePicker>
									<Button class="btn1" @click="btnShowperfectTripClick()" type="primary" style="width:105px;height:32px;margin-left:11px;border-radius: 2px;background-color: #ff9710;">完善详细行程</Button>
								</div>
							</div>
						</div>
					</div>
					<!-- 行程 end -->

					<!-- 开具发票 -->
					<div class="box" style="margin-top:43px;">
						<div class="title_box">
							<div class="left_pannel" ></div>
							<div class="title">开具发票</div>
						</div>
						<div class="con" style="">
							<div class="conbodyrow">
								<div class="one ">
									<div class="fl input_left">是否开票</div>
									<Select @on-change="changeOpenInvoice" v-model="selectOpenInvoice" style="width:160px;height:32px;text-align:left;">
										<Option v-for="item in OpenInvoices" :value="item.id" key="item.id">{{item.text}}</Option>
									</Select>
									<!-- <div style="margin-left:10px;color:#666;">选择开票将包含一部分税费</div> -->
								</div>
							</div>
							<div v-show="selectOpenInvoice==1" class="conbodyrow " style="margin-top:30px;">
								<div class="one ">
									<div class="fl input_left">开票信息</div>
									<div v-if="token && (checkInvoiceParam.add_id && checkInvoiceParam.info_id)" class="">
										<span>{{checkInvoiceParam.title}}</span>
										<span style="margin:0 22px;">|</span>
										<span>快递至</span>
										<span style="margin-left:12px;" v-html="checkInvoiceParam.city_array.area_name+checkInvoiceParam.deliver_add">上海市闵行区申长路988弄虹桥万科中心</span>
										<span style="margin:0 22px;">|</span>
										<span>收件人</span>
										<span style="margin-left: 12px;">{{checkInvoiceParam.deliver_contact}}</span>
										<span style="margin-left:12px;">{{checkInvoiceParam.deliver_tel}}</span>
										<Button @click="btnShowInvoiceClick()" type="primary" class="btn_change" style="width:65px;height:32px;margin-left:17px;border-radius: 2px;background-color: #ff9710;">修改</Button>

									</div>
									<div v-else-if="!token && (checkInvoiceParam.title && checkInvoiceParam.city_array.area_name)">
										<span>{{checkInvoiceParam.title}}</span>
										<span style="margin:0 22px;">|</span>
										<span>快递至</span>
										<span style="margin-left:12px;" v-html="checkInvoiceParam.city_array.area_name+checkInvoiceParam.deliver_add">上海市闵行区申长路988弄虹桥万科中心</span>
										<span style="margin:0 22px;">|</span>
										<span>收件人</span>
										<span style="margin-left: 12px;">{{checkInvoiceParam.deliver_contact}}</span>
										<span style="margin-left:12px;">{{checkInvoiceParam.deliver_tel}}</span>
										<Button @click="btnShowInvoiceClick()" type="primary" class="btn_change" style="width:65px;height:32px;margin-left:17px;border-radius: 2px;background-color: #ff9710;">修改</Button>
									</div>
									<div v-else class="">
										<Button @click="btnShowInvoiceClick()" type="primary" class="btn_set" style="width:65px;height:32px;border-radius: 2px;background-color: #ff9710;">编辑</Button>
									</div>
								</div>
								<!--<div class="one ">
									<div class="input_left" style="visibility:hidden;">开票信息</div>
									<div class="">
										<div>{{checkInvoiceParam.deliver_contact}}</div>
										<div style="margin-left:12px;">{{checkInvoiceParam.deliver_tel}}</div>
									</div>
								</div>-->
							</div>
						</div>
					</div>
					<!-- 开具发票  end -->
				</div>

				<!-- 去支付 -->
				<div class="" style="text-align:left;height:81px;border-top:1px solid #e5e5e5;">
					<div class="ib" style="font-size:14px;line-height:81px;font-weight:500;color:#666;margin-left:52px;" v-html="'选择 '+use_bus_count+' 辆车，行程 '+trip_day+' 天'">选择 3 辆车，行程 2 天</div>
					<div class="ib" style="float:right;">
						<div class="ib" style="margin-right:36px;">
							<div class="" style="margin-top:6px;text-align:right;">
								<span class="" style="padding-top:7px;font-size:18px;">¥&nbsp;</span>
								<span style="font-size:28px;font-weight:600;color:#333;" v-html="total_price">3980</span>
							</div>
							<div v-if="urlParam.bus_type!=2" style="margin-top:5px;color:#666;">包含 {{trip_day}} 天，约 {{loadData.model_info.mileage}} 公里，超出另行计费</div>
							<div v-else style="margin-top:5px;color:#666;">含 100 公里 8 小时 / 天，超出另行计费</div>
						</div>
						<div @click="createOrder()" class="ib btn_pay" style="float:right;width:178px;height:81px;line-height:81px;text-align:center;background:#ff9710;cursor:pointer;">
							<div style="font-size:24px;font-weight:600;color:#fff;">去支付</div>
						</div>
					</div>
				</div>
				<!-- 去支付  end -->
			</Form>
			</div>
			<!-- 预订须知 -->
			<div class="" style="margin:0 auto;margin-top:20px;padding:31px 48px 53px 53px;background:#fff;width:1200px;text-align:left;">
				<div class="" style="font-size:14px;font-weight:500;color:#333;">预订须知</div>
				<div class="" style="color:#666;margin-top:22px;text-align:left;line-height:1.5;">
					1、如果用户需取消订单，应第一时间联系平台客服人员。 出发前48小时，可进行订单无损取消；出发前48小时内24小时外订单取消，用户需按订单的10%向平台缴纳违约赔偿金；出发前24内订单取消，用户需按车价的20%向平台缴纳违约赔偿金。
				</div>
				<div style="color:#666;margin-top:8px;text-align:left;line-height:1.5;">2、实际出行时，用户应在当天行程开始前1小时再次跟车辆驾驶员确认是否能准时到达，如车辆不能按照预订时间准时到达并评估可到达时间超过预订行程开始后两小时，则用户有权要求汽车公司提供同等级、同质量、同等服务的车辆和司机替代按时履行服务。如汽车公司临时无法调车按时完成行程，与用户协商后，应立即与平台联系，平台承诺将在4小时内就近为用户调换车辆。因车辆迟到给用户造成的经济损失的，用户有权要求赔偿。</div>
				<div style="color:#666;margin-top:8px;text-align:left;line-height:1.5;">3、 实际行程过程中，车辆和驾驶员应与平台预订一致，如用户发现出车车辆与平台预订车辆不一致，且没有提前通知，则用户有权要求平台介入对车队进行处理。</div>
				<div style="color:#666;margin-top:8px;text-align:left;line-height:1.5;">4、 在实际承运过程中，应按照平台提报路线要求车辆行驶，不得随意改变行程和路线；如需临时变更，须向平台申请协调，同时本着友好互惠的原则，用户应第一时间与车队进行商讨，产生的费用差价由用户自行与车队协调并通过平台支付。如用户未申请平台协调，则平台不对平台上提报以外的私自附加行程负任何责任。</div>
			</div>
			<!-- 预订须知  end-->
			<!-- 弹框 -->
			<div class="modal">
				<perfect-trip @tripOK="tripOK" :stationIcon="loadData.bus_type!=2" :stations="station_to_station" :startTime="use_bus_time" :mileage="loadData.model_info.mileage" :days="urlParam.day_count" :times="timeLineData" ref="perfect_trip"></perfect-trip>
			</div>
			<div>
				<invoice ref="invoice" @invoiceSubmitSuccess="invoiceSubmitSuccess" :formObj="invoiceFormObj"></invoice>
			</div>

		</div>
		<footer-view></footer-view>
	</div>
</template>

<script>
import Util from '../../config/Util'
import infoType from '../../config/infoType'
import headerView from '../common/_header.vue'
import footerView from '../common/_footer.vue'
import perfectTrip from './view/_perfectTrip.vue'
import invoice from './view/_invoice.vue'
export default {
	name: "busReserve",
	data() {
		const validatePhone = (rule,value,callback)=>{
			if(!value){
				return callback(new Error('请填写11位手机号'));
			}
			if(!Number.isInteger(parseInt(value))){
				callback(new Error('请填写11位手机号'));
			}else{
				if(value.length<11){
					callback(new Error('请填写11位手机号'));
				}else{
					callback();
				}
			}
		}
		return {
			dateOptions: {
				disabledDate(date) {
					return date && date.valueOf() < Date.now() - 86400000;
				}
			},
			userRuleValidate: {
				contact_user: [{
					required: true,
					message: '请填写姓名',
					trigger: 'blur'
				}],
				contact_phone: [
					{required:true,validator:validatePhone,trigger:'blur'}
				],
				detailArea: [{
					required: true,
					message: ' ',
					trigger: 'blur'
				}]
			},
			token: "",
			isLogin: false,
			busCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			OpenInvoices: [{
				id: 1,
				text: '开票'
			}, {
				id: 0,
				text: '不开票'
			}],
			selectOpenInvoice: 0,
			// busTypes:[],
			tempLoadData: {},
			loadData: {
				model_info: {
					age_type_name: "",
					brand_name: "",
					imgUrl: "",
					mileage: 0,
					model_price: "0",
					num_plate: "",
					seat_count: 0,
					stock: 0
				},
				start_area_name: ""
			},
			//行程时间轴的数据源
			searchOption: {
				city: "",
				citylimit: true
			},
			tripStartArea: "上海市",
			// detailArea: "", //行程出发地的具体地址
			timeLineData: [],
			tempTimeLineData:[],
			dates: [],
			//发票弹层对象
			oldInvoiceFormObj: {},
			invoiceFormObj: {
				header: '', //发票抬头
				type: '个人', //个人  企业
				taxparerNumber: '', //纳税人识别号
				recipientName: '', //收件人姓名
				recipientPhone: '', //收件人电话
				address1: '', //省
				address2: '', //市
				address3: '', //区
				detailAddress: '' //详细地址
			},
			//校验发票
			is_invoice_upt: 0, //是否是未登录的时候已经填写好开票信息
			checkInvoiceParam: {
				add_id: "", //地址id
				area_id: "", //地点id
				card_bank_name: "", //银行名称
				card_number: "", //开户账号
				city_array: {
					province_id: "",
					city_id: "",
					county_id: "",
					area_name: "" //
				},
				deliver_add: "", //联系人地址
				deliver_contact: "", //联系人名称
				deliver_tel: "", //联系人电话
				info_id: "", //抬头id
				invoice_type: "", //发票类型:  0:增值税普通发票  1:境值税专用发票
				memo: "", //备注
				register_add: "", //注册地址
				register_tel: "", //注册手机号
				tax_no: "", //税号
				title: "", //抬头
				uid: "", //用户id
				user_type: "" //发票账户类型 0:个人 1:企业
			},
			//上个页面参数
			urlParam: {
				bus_id: "",
				bus_type: "",
				start_run_date: "",
				start_run_time: "",
				start_station_id: "",
				start_station_name: "",
				end_station_id: "",
				end_station_name: "",
				day_count: "1"
			},
			//省/市级包车的头部
			station_to_station: [],
			//接口参数
			bus_id: 0,
			trip_day: 0,
			use_bus_count: 0,
			use_bus_date1: "",
			use_bus_date2: "",
			use_bus_time: "",
			detailArea_isEmpty:false,
			formUserObj: {
				contact_user: "",
				contact_phone: "",
				detailArea: ""
			},
			contact_user: "",
			contact_phone: "",
			path_info: "", //行程信息,
			total_price: 0,
		}
	},
	components: {
		headerView,
		footerView,
		perfectTrip,
		invoice
	},
	beforeRouteEnter(to, from, next) {

		next((vm) => {
			// if (from.name == 'busList' || from.name == null) {
			vm.$refs.headerView.loginUserInfo();
			vm.urlParam = vm.$route.query;
			vm.load();
			// }

		})
	},
	methods: {
		load() {
			this.bus_id = this.urlParam.bus_id;
			this.trip_day = this.urlParam.day_count;

			//更改行程地址检索的placeholder
			let amap_trip = this.$refs.amap_trip_first.$el.firstChild.firstChild;
			amap_trip.className = 'ivu-input';
			amap_trip.style.fontSize = '12px';
			amap_trip.placeholder = '填写详细地址';

			//处理头部
			let station1 = this.urlParam.start_station_name;
			let station2 = this.urlParam.end_station_name;
			let station3 = station1 + ',' + station2;
			this.station_to_station = station3.split(',');
			if (this.urlParam.bus_type == 2) {
				this.station_to_station.push('市内');
			}
			//过滤  将为空的删除
			this.station_to_station = this.station_to_station.filter(x => x != "");
			this.use_bus_date1 = this.urlParam.start_run_date ? this.urlParam.start_run_date : Util.getDateTime(0);
			this.use_bus_date2 = Util.getDateByDay(this.trip_day - 1, this.use_bus_date1)
			this.use_bus_time = this.urlParam.start_run_time;
			this.tripStartArea = this.station_to_station[0];

			this.$refs.perfect_trip.$refs.trip_time_line.startArea = this.tripStartArea;

			//默认行程
			let tempArray = [];
			for (var i = 0; i < this.timeLineData.length; i++) {
				let obj = this.timeLineData[i];
				if (obj.text == "") {
					continue;
				}
				tempArray.push(`${obj.date}|${obj.text}`);
			}
			this.path_info = tempArray.join('||');
			this.amap_init();
			this.httpLoadInfo();
			this.token = Util.getStorage(infoType.codeToken);
			this.tempLoadData = Util.clone(this.loadData);
		},
		//请求
		httpLoadInfo() {

			let _data = {
				model_id: this.bus_id,
				bus_type: this.urlParam.bus_type,
				start_run_date: this.use_bus_date1,
				start_station_id: this.urlParam.start_station_id,
				start_station_name: this.urlParam.start_station_name,
				// end_station_id: '3261,820,3270,3268',
				end_station_id: this.urlParam.end_station_id,
				end_station_name: this.urlParam.end_station_name,
				day_count: this.urlParam.day_count
			};
			Util.post({
				obj: this,
				url: '/booking/order/get-model-info',
				data: _data,
				success: (res_data) => {
					Util.ZZLog(res_data);
					if (!res_data.flag) {
						if (res_data.code == infoType.codeNotLogin) {
							this.$refs.headerView.btnLogin();
						} else {
							this.loadData = Util.clone(this.tempLoadData);
							this.loadData.model_info.stock=0;
							this.loadData.model_info.model_price=0;

							this.$Message.warning(res_data.msg);
						}

					} else {
						this.loadData = res_data.data;
						//用车数量默认第一个
						this.use_bus_count = 1;
						this.total_price = this.loadData.model_info.model_price;
						this.busImg = this.loadData.model_info.imgUrl;

						//修改地图检索的地区范围
						this.searchOption.city = this.loadData.start_area_name;
						//更改行程的出发地的市级名称
						this.tripStartArea = this.loadData.start_area_name;
						this.$refs.perfect_trip.$refs.trip_time_line.startArea = this.tripStartArea;

					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})
		},
		amap_init() {
			let dom = this.$refs.amap_trip_first;
			if (dom) {
				addHandler(dom.$el.firstChild.firstChild,'blur',()=>{
					Util.ZZLog('blur')
					if(dom.keyword==""){
						this.detailArea_isEmpty=true;
					}else{
						this.detailArea_isEmpty=false;
					}
				})
				let input = this.$refs.amap_trip_first.$el.childNodes[0].firstChild;
				this.$el.addEventListener('click', (e) => {
					if (!dom.$el.contains(e.target)) {
						if (e.target.className == 'autocomplete-selected') {} else {
							if (dom.selectedTip == -1) {
								dom.keyword = '';
								// Util.ZZLog('keyword', dom.selectedTip,this.$refs['ref_form']);
								dom.search();
							} else {
								Util.ZZLog('keyword', dom.selectedTip);
								dom.search();
							}

						}
					}
				})
			}

			function addHandler(element, type, handler) {
				if (element.addEventListener) {
					element.addEventListener(type, handler, false);
				} else if (element.attachEvent) {
					element.attachEvent("on" + type, handler);
				} else {
					element["on" + type] = handler;
				}
			}
		},
		//amap style
		styleTripAmapDiv(){
			let border = this.detailArea_isEmpty?'1px solid #ec332c!important':'';
			return{
				border:border
			}
		},
		styleTripAmap() {
			let wh = 72 / 6;
			let width = 344 - 10 - wh * this.tripStartArea.length - 2;
			width = width-6;
			let dom = this.$refs.amap_trip_first;
			if (dom) {
				let dom_tip = dom.$el.childNodes[2];
				let tip_ul = dom_tip.firstChild;
				dom_tip.style.width = width + 'px';
				// let input = this.$refs.amap_trip_first.$el.childNodes[0].firstChild;
				// document.addEventListener('click', (e) => {
				//     if(!dom.$el.contains(e.target)) {
				// 		if(e.target.className=='autocomplete-selected'){
				// 		}else{
				// 			dom.keyword = '';
				// 			dom.search();
				// 		}
				//
				//     }
				//    })
				// 	addEvent(input,'blur',()=>{
				// 		dom.search();
				// 		// dom_tip.style.display='none';
				// 		// Util.ZZLog('blur===========',this.detailArea);
				// 		// if(this.detailArea==""){
				// 		//
				// 		// 	// dom.keyword = '';
				// 		// }
				// 	})
				// 	addEvent(input,'input',()=>{
				// 		Util.ZZLog('iput');
				//
				// 	})
				// }
				//
				// function addEvent(element,type,handler){
				// 	if(element.addEventListener) {
				// 		element.addEventListener(type, handler, false);
				// 	} else if(element.attachEvent) {
				// 		element.attachEvent("on" + type, handler);
				// 	} else {
				// 		element["on" + type] = handler;
				// 	}
				// }
				// function removeEvents(target, type, func){
				//     if (target.removeEventListener)
				//         target.removeEventListener(type, func, false);
				//     else if (target.detachEvent)
				//         target.detachEvent("on" + type, func);
				//     else target["on" + type] = null;
			};

			return {
				width: width + 'px'
			}
		},
		//用车日期改变
		useBusDateChange(val) {
			this.use_bus_date1 = val;
			this.use_bus_date2 = Util.getDateByDay(this.trip_day-1, val);
			this.httpLoadInfo();
		},
		//用车时间改变
		useBusTimeChange(val) {
			this.use_bus_time = val + '';
			Util.ZZLog(this.use_bus_time, val);
			this.$refs.perfect_trip.$refs.trip_time_line.showStartTime = this.use_bus_time;
		},
		onMapSearchResult(arr) {
			Util.ZZLog('amapResult', arr);
			if (arr.length <= 0) {
				this.$refs.amap_trip_first.keyword = "";
			} else {
				if (this.$refs.amap_trip_first) {
					if (this.$refs.amap_trip_first.keyword == "") {
						this.formUserObj.detailArea = "";
					} else {
						this.formUserObj.detailArea = arr[0].name;
						this.detailArea_isEmpty=false;
					}
				}

			}

		},
		changePrice(price) {
			let t_price = parseInt(this.use_bus_count) * (price - 0);
			this.total_price = t_price?t_price:0;
		},
		//点击完善详细行程
		btnShowperfectTripClick() {
			this.timeLineData = this.tempTimeLineData;
			if (this.use_bus_date1 == "") {
				this.$Message.warning('请选择用车日期');
				return;
			}
			this.$refs['perfect_trip'].show = true;
			this.dates = [];

			//有数据源了只需要更改第一个对象中的text
			if (this.timeLineData.length > 0) {
				this.timeLineData[0].text = this.formUserObj.detailArea;
				return;
			}

			for (let i = 0; i < this.trip_day; i++) {
				// dates.push()
				let d = Util.getDateByDay(i, this.use_bus_date1);
				this.dates.push(d);
			}
			let tempDate = null;
			let day = 0;
			this.timeLineData = [];
			for (var i = 0; i < this.dates.length; i++) {
				if (tempDate != this.dates[i]) {
					let obj = {
						date: this.dates[i],
						text: "",
						show_date: true,
						day: ++day,
						show_add: false
					}
					if (i == 0) obj.text = this.formUserObj.detailArea;
					this.timeLineData.push(obj);
				}
				tempDate = this.dates[i];
				let obj = {
					date: this.dates[i],
					text: "",
					day: day,
					show_date: false,
					show_add: true
				}
				this.timeLineData.push(obj);
			}

		},
		//是否开票change
		changeOpenInvoice(val = 1) {

			if (val == 1) {
				//开票

				// 1. 登录状态下选择开票
				if (this.token) {
					Util.post({
						obj: this,
						url: '/booking/order/check-invoice',
						data: {},
						success: (res_data) => {
							if (res_data.flag == false) {
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								this.checkInvoiceParam = data.info;
								let cstr = '';
								cstr = this.checkInvoiceParam.city_array.area_name + this.checkInvoiceParam.deliver_add;
								//转成发票弹层的obj
								let type = this.checkInvoiceParam.user_type == 0 ? '个人' : '企业';

								this.invoiceFormObj.header = this.checkInvoiceParam.title; //发票抬头
								this.invoiceFormObj.type = type; //个人  企业
								this.invoiceFormObj.taxparerNumber = this.checkInvoiceParam.tax_no; //纳税人识别号
								this.invoiceFormObj.recipientName = this.checkInvoiceParam.deliver_contact; //收件人姓名
								this.invoiceFormObj.recipientPhone = this.checkInvoiceParam.deliver_tel; //收件人电话
								this.invoiceFormObj.address1 = this.checkInvoiceParam.city_array.province_id; //省
								this.invoiceFormObj.address2 = this.checkInvoiceParam.city_array.city_id; //市
								this.invoiceFormObj.address3 = this.checkInvoiceParam.city_array.county_id; //区
								this.invoiceFormObj.detailAddress = this.checkInvoiceParam.deliver_add; //详细地址
								this.oldInvoiceFormObj = Util.clone(this.invoiceFormObj);
								if (cstr == "") {
									this.btnShowInvoiceClick();
								}
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})
				} else {
					// 2. 未登录状态下选择开票
					this.oldInvoiceFormObj = Util.clone(this.invoiceFormObj);
				}

			} else {
				//不开票
			}
		},
		//点击修改开票信息
		btnShowInvoiceClick() {
			// console.log(this.$refs['perfect_trip']);
			this.invoiceFormObj = Util.clone(this.oldInvoiceFormObj);
			this.$refs['invoice'].show = true;
		},
		//下单  去支付
		createOrder() {
			this.$refs['ref_form'].validate((valid) => {
				if (valid) {
					this.token = Util.getStorage(infoType.codeToken);
					if (!this.token) {
						this.$refs.headerView.btnLogin();
						return;
					}
					let param = {
						user_type: this.checkInvoiceParam.user_type,
						invoice_title: this.checkInvoiceParam.title,
						invoice_tax_no: this.checkInvoiceParam.tax_no,
						deliver_contact: this.checkInvoiceParam.deliver_contact,
						deliver_tel: this.checkInvoiceParam.deliver_tel,
						deliver_add: this.checkInvoiceParam.deliver_add,
						province: this.checkInvoiceParam.city_array.province_id,
						city: this.checkInvoiceParam.city_array.city_id,
						county: this.checkInvoiceParam.city_array.county_id
					}
					//判断行程是否是通过弹层创建
					if (this.path_info == "") {
						if (this.formUserObj.detailArea == "") {
							if (this.user_type == '1' || this.user_type == '2') {
								this.$Message.warning('请填写详细出发地址');
								return;
							}
						} else {
							this.$refs.amap_trip_first.keyword = this.formUserObj.detailArea;
							this.path_info = this.formUserObj.detailArea + "|" + this.use_bus_date1;
						}
					}

					if (this.loadData.bus_type == '1' || this.loadData.bus_type == '2') {
						if (this.path_info == "") {
							this.$Message.warning('请填写详细出发地址');
							return;
						}
					}


					let time = this.use_bus_time ? this.use_bus_time : "";
					let _data = {
						bus_count: this.use_bus_count,
						model_id: this.loadData.model_id,
						bus_type: this.loadData.bus_type,
						day_count: this.loadData.day_count,
						start_run_date: this.use_bus_date1,
						start_station_id: this.loadData.start_station_id,
						start_station_name: this.urlParam.start_station_name,
						end_station_id: this.loadData.end_station_id,
						end_station_name: this.urlParam.end_station_name,
						contact_user: this.formUserObj.contact_user,
						contact_phone: this.formUserObj.contact_phone,
						invoice: this.selectOpenInvoice,
						start_run_time: time,
						path_info: this.path_info,
						flight: this.urlParam.flight ? this.urlParam.flight : "",
						flight_start_date: this.urlParam.flight_start_date ? this.urlParam.flight_start_date : "",
						is_invoice_upt: this.is_invoice_upt,
						invoice_params: JSON.stringify(param)
					}
					Util.ZZLog(_data);
					Util.post({
						obj: this,
						url: "/booking/order/make-order",
						data: _data,
						success: (res_data) => {
							Util.ZZLog(res_data);
							if (res_data.flag == false) {
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								this.$router.push({
									name: "pay",
									query: {
										order_id: data.order_id
									}
								})
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})
				} else {
					//表单认证失败
					if(this.formUserObj.detailArea==""){
						this.detailArea_isEmpty = true;
					}else{
						this.detailArea_isEmpty=false;
					}
				}
			})



		},
		//回调方法
		//headerView的回调方法
		loginSuccess(user, token) {
			this.httpLoadInfo();
		},
		//行程的回调方法
		tripOK(arr, showStartTime) {
			Util.ZZLog(arr, showStartTime);
			this.tempTimeLineData = arr;
			this.timeLineData = arr;
			if (arr.length > 0) {
				this.$refs.amap_trip_first.keyword = arr[0].text;
			}
			this.path_info = "";
			let tempArray = [];
			for (var i = 0; i < this.timeLineData.length; i++) {
				let obj = this.timeLineData[i];
				if (obj.text == "") {
					continue;
				}
				tempArray.push(`${obj.text}|${obj.date}`);
			}
			this.path_info = tempArray.join('||');
			if (showStartTime) {
				this.urlParam.start_run_time = showStartTime;
				this.use_bus_time = showStartTime;
			}
		},
		//发票的回调
		invoiceSubmitSuccess(data, obj) {
			Util.ZZLog(data);
			this.token = Util.getStorage(infoType.codeToken);
			if (!this.token) {
				this.is_invoice_upt = 1; //未登录且添加了发票
				obj.show = false;
				// this.checkInvoiceParam = data.info;
				this.checkInvoiceParam.city_array = {
					province_id: data.province,
					city_id: data.city,
					county_id: data.county,
					area_name: data.province_str + data.city_str + data.county_str
				}

				this.checkInvoiceParam.user_type = data.user_type;
				this.checkInvoiceParam.deliver_tel = data.deliver_tel;
				this.checkInvoiceParam.deliver_add = data.deliver_add;
				this.checkInvoiceParam.deliver_contact = data.deliver_contact;
				this.checkInvoiceParam.title = data.invoice_title;
				this.checkInvoiceParam.tax_no = data.invoice_tax_no;

				let cstr = '';
				cstr = data.province_str + data.city_str + data.county_str + this.checkInvoiceParam.deliver_add;
				//转成发票弹层的obj
				let type = this.checkInvoiceParam.user_type == 0 ? '个人' : '企业';
				this.invoiceFormObj.header = this.checkInvoiceParam.title; //发票抬头
				this.invoiceFormObj.type = type; //个人  企业
				this.invoiceFormObj.taxparerNumber = this.checkInvoiceParam.tax_no; //纳税人识别号
				this.invoiceFormObj.recipientName = this.checkInvoiceParam.deliver_contact; //收件人姓名
				this.invoiceFormObj.recipientPhone = this.checkInvoiceParam.deliver_tel; //收件人电话
				this.invoiceFormObj.address1 = this.checkInvoiceParam.city_array.province_id; //省
				this.invoiceFormObj.address2 = this.checkInvoiceParam.city_array.city_id; //市
				this.invoiceFormObj.address3 = this.checkInvoiceParam.city_array.county_id; //区
				this.invoiceFormObj.detailAddress = this.checkInvoiceParam.deliver_add; //详细地址
				this.oldInvoiceFormObj = Util.clone(this.invoiceFormObj);

			} else {
				this.is_invoice_upt = 0; //登录后且再次添加了发票
				Util.post({
					obj: this,
					url: '/booking/order/set-invoice',
					data: data,
					success: (res_data) => {
						Util.ZZLog(res_data);
						if (res_data.flag == false) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							obj.show = false;
							this.changeOpenInvoice();
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			}
		},
		//是否显示行程
		// 接送机站 没有行程
		showTrip(index) {

			let flag = true;
			let arr = [1, 2];
			let arr2 = [3, 4, 5, 6];
			if (index == '1' || index == '2') {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		},
		busImageStyle(url) {
			//   'background:url('+loadData.model_info.imgUrl+')';
			let imageurl = url ? url : 'http://img.zhizhuchuxing.cn/busda/empty.png';
			return {
				backgroundImage: 'url(' + imageurl + ')',
				backgroundSize: '132px 85px'
			}
		},
		//用车类型
		getBusType(index) {
			let arr = [{
				id: 1,
				name: "省市际包车"
			}, {
				id: 2,
				name: "市区包车"
			}, {
				id: 3,
				name: "接机"
			}, {
				id: 4,
				name: "送机"
			}, {
				id: 5,
				name: "接站"
			}, {
				id: 6,
				name: "送站"
			}]
			let title = '';
			if (index > 1 && index <= arr.length)
				title = arr[index - 1];
			else title = arr[0];
			return title;
		}
	}
}
</script>
<style>
.bus_reserve .ivu-form-item-label {
	color: #666!important;
	width: 48px!important;
	text-align: right!important;
	padding: 0px!important;
	margin-right: 20px!important;
	height: 32px!important;
	line-height: 32px!important;
}

.customer .ivu-input {
	width: 160px!important;
}

.bus_reserve .ivu-form-item-error-tip {
	left: 76px!important;
}

.bus_reserve .search-btn {
	display: none!important;
}

.bus_reserve .trip_amap_input {
	width: 344px!important;
	font-size: 12px!important;
	border: 1px solid #d7dde4!important;
	border-radius: 4px!important;
	color: #333!important;
	background-color: #fff!important;
	cursor: text!important;
	transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out!important;
}

.bus_reserve .trip_amap_input:hover {
	border: 1px solid #ffac40!important;
}

.bus_reserve .el-vue-search-box-container .search-box-wrapper {
	height: 30px!important;
	display: inline-block!important;
	width: 100%!important;
	height: 32px!important;
	line-height: 30px!important;
	font-size: 12px!important;
	/*border: 1px solid #d7dde4;*/
	border-radius: 4px!important;
	color: #333!important;
	background-color: #fff!important;
	background-image: none!important;
	position: relative!important;
	cursor: text!important;
	transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out!important;
}

.bus_reserve .el-vue-search-box-container .search-box-wrapper:hover {
	/*border: 1px solid #ffac40;*/
}

.bus_reserve .search-box-wrapper input {
	width: 100%!important;
	height: 32px!important;
	border-radius: 4px!important;
	text-indent: 0px!important;
}

.bus_reserve .el-vue-search-box-container {
	position: relative!important;
	/* width: 360px; */
	height: 32px!important;
	background: #f3f3f3!important;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0)!important;
	border-radius: 2px 3px 3px 2px!important;
	z-index: 10!important;
}

.bus_reserve .el-vue-search-box-container .search-tips {
	position: absolute!important;
	margin-top: 3px!important;
	top: 100%!important;
	/*width: 290px!important;*/
	border: 0px solid #dbdbdb!important;
	background: #fff!important;
	overflow: auto!important;
}

.bus_reserve .el-vue-search-box-container .search-tips ul li {
	height: 30px!important;
	text-align: left!important;
	line-height: 30px!important;
	box-shadow: 0 1px 1px rgba(0, 0, 0, .1)!important;
	padding: 0 10px!important;
	cursor: pointer!important;
	border-left: 1px solid #dbdbdb!important;
	border-right: 1px solid #dbdbdb!important;
	overflow: hidden!important;
	text-overflow: ellipsis!important;
	white-space: nowrap!important;
}

.bus_reserve .el-vue-search-box-container .search-tips ul li:active {
	background: #ff9710!important;
	color: #fff!important;
}

.ivu-input[disabled],
fieldset[disabled] .ivu-input {
	background-color: #f3f3f3!important;
	opacity: 1!important;
	cursor: not-allowed!important;
	color: #666666!important;
}
</style>
<style scoped="scoped">
.one{
	line-height: 30px;
}
.one>.name {
	color: #333;
}
.fl{
	float: left;
}
.one>.input_left {
	color: #666;
	margin-right: 20px;
	width: 48px!important;
	text-align: right!important;
}

.one>.icon {
	padding: 0 12.5px;
}
.info .box .left_pannel {
	float: left;
	margin-right: 22px;
	width:4px;
	height:20px;
	background:#ff9710;
}

.info .box .title {
	font-size: 14px;
	font-weight: 500;
	color: #333;
}

.info .con {
	margin-top: 30px;
	margin-left: 27px;
}

.btn1:hover {
	background-color: #FFAC40 !important;
}

.btn_pay:hover {
	background-color: #FFAC40 !important;
}

.btn_set:hover {
	background-color: #FFAC40 !important;
}

.btn_change:hover {
	background-color: #FFAC40 !important;
}
</style>
