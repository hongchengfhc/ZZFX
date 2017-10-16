<template lang="html">
 <div class="order_detail" v-show="loadSuccess">
   <header-view ref="headerView" :selectMenu="-1"></header-view>
   <div class="order_contaioner" style="background:#eee;padding-top:53px;padding-bottom:55px;">

           <order-detail @refreshStatus="refreshStatus" v-show="loadSuccess" @orderCancelSuccess="orderCancelSuccess" :status='getIndexByStatu()' :limit_time="order_info.pay_limit_time" :order_id="order_info.id" style="margin: 0 auto;width: 1200px;margin-bottom: 20px;"></order-detail>
       <div class="center" style="width:1200px;margin:0 auto;background:#fff;">
           <div class="info " style="text-align:left;padding-top:36px;padding-left:27px;padding-bottom:44px;">
               <!-- 省际包车 -->
               <div class="box ">
                   <div class="title_box ">
                       <div class="left_pannel" style="width:4px;height:20px;background:#ff9710;"></div>
                       <div class="title">{{getBusType(order_info.type_id).name}}</div>
                   </div>
                   <div class="con" style="">
                       <div class="conbodyrow station">
                           <div class="one " style="display: inline-block;" v-for="item in area_info">
                               <span class="name">{{item}}</span>
                               <Icon class="icon" type="ios-arrow-thin-right"></Icon>
                           </div>
                           <!-- <div class="one ">
                               <span class="name" style="color:#333;">上海</span>
                               <Icon class="icon" type="ios-arrow-thin-right"></Icon>
                           </div> -->
                       </div>
                       <div v-if="order_info.type_id != '2'" class="conbodyrow" style="margin-top:27px;">
                           <span style="color:#999;">往返</span>
                           <span style="color:#333;margin-left:4px;">约 {{order_info.total_miles}} 公里</span>
                           <span style="padding:0 35px;">|</span>
                           <span style="color:#999;">行程天数</span>
                           <span style="color:#333;margin-left:25px;">{{order_info.day_count}} 天</span>
                       </div>
                       <div v-else class="conbodyrow" style="margin-top:27px;">
                           <span style="color:#999;"></span>
                           <span style="color:#333;">含 100 公里 8 小时 / 天</span>
                           <span style="padding:0 35px;">|</span>
                           <span style="color:#999;">行程天数</span>
                           <span style="color:#333;margin-left:25px;">{{order_info.day_count}} 天</span>
                       </div>
                   </div>
               </div>
               <!-- 省际包车 end -->

               <!-- 选择车辆 -->
               <div class="box " style="margin-top:51px;">
                   <div class="title_box ">
                       <div class="ib left_pannel" style="width:4px;height:20px;background:#ff9710;"></div>
                       <div class="ib title">选择车辆</div>
                   </div>
                   <div class="con" style="">
                       <div class="ib">
                           <div class="conbodyrow ">
                               <div class="one ">
                                   <span class="input_left">用车日期</span>
                                   <span class="" style="height:30px;" v-html="order_info.start_run_date">2017-01-01</span>
                                   <span style="padding:0 5.5px;">—</span>
                                   <span class="" style="height:30px;" v-html="order_info.end_run_date">2017-08-01</span>
                               </div>
                           </div>
                           <div class="conbodyrow" style="margin-top:27px;">
                               <div class="one ">
                                   <span class="input_left">用车数量</span>
                                   <span>{{order_info.bus_count}} 辆</span>
                                   <span style="margin-left:60px;color:#333;">车价</span>
                                   <span style="font-size:14px;font-weight:600;">¥ {{order_info.order_price}}</span>
                               </div>
                           </div>
                       </div>
                       <div class="ib" style="vertical-align: top;">
                       	<div class="ib" style="margin:0 81px;margin-left:177px;width:1px;background:#ccc;height: 87px;"></div>
                       </div>
                       <div class="ib"  style="vertical-align: top;">
                           
                           <div class="ib" style="width:132px;height:85px;" :style="busImageStyle(order_info.bus_img)"></div>
                           <div class="ib" style="margin-left:30px;vertical-align:top;">
                               <div class="" style="color:#333;margin-top: 12px;">
                                   <span v-html="order_info.brand_name+' '+order_info.seat_count+' 座大巴'">宇通53座大巴</span>
                                   <span style="margin-left:17px;" v-html="order_info.brand_name">苏A牌</span>
                               </div>
                               <div class="" style="margin-top:22px;">
                                   <span style="color:#999;">正座：</span>
                                   <span style="color:#333;" v-html="order_info.seat_count">52+1</span>
                                   <span style="color:#999;margin-left:27px;">车龄：</span>
                                   <span style="color:#333;" v-html="order_info.age_type">3-5年</span>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <!-- 选择车辆 end -->


               <!--派车信息-->
               <div class="box " style="margin-top:51px;" v-show="order_info.driver_info_type_id == '1'">
               		<div class="title_box ">
                        <div class="ib left_pannel" style="width:4px;height:20px;background:#ff9710;"></div>
                        <div class="ib title">派车信息</div>
                    </div>
                    <div class="" style="margin-top: 15px;width: 1090px;margin-left: 10px;overflow: auto;">
                    		<div v-for="(item,index) in bus_info" :key="item.bus_id" style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">{{item.plate_code}}</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;float: left;">{{item.driver_name}}</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;float: right;">{{item.driver_tel}}</div>
                    			</div>
                    		</div>
                    		<!--<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>
                    		<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>
                    		<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>
                    		<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>
                    		<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>
                    		<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>
                    		<div style="width: 186px;height: 75px;margin: 15px 15px;float: left;border: 1px solid #cccccc;border-radius: 4px;text-align: left;">
                    			<div style="margin-left: 16px;margin-top: 16px;line-height: 1;">苏 A 89085</div>
                    			<div class="" style="margin-top: 18px;">
                    				<div style="line-height: 1;margin-left: 16px;">权宇琦大</div>
                    				<div class=" " style="margin-right: 16px;line-height: 1;text-align: right;">12345678910</div>
                    			</div>
                    		</div>-->
                    </div>
               	</div>
               <!--派车信息 end-->


               <!-- 联系人 -->
               <div class="box " :style="order_info.driver_info_type_id == '2'?'margin-top:28px':'margin-top:43px'">
                   <div class="title_box ">
                       <div class="ib left_pannel" style="width:4px;height:20px;background:#ff9710;"></div>
                       <div class="ib title">联系人</div>
                       <div v-if="updateStatus.updateContacts" @click="btnUpdateContacts()" class="allow_update change_btn" style="margin-left:16px;" v-show="order_info.update_type =='1'">修改</div>
                       <div v-else @click="btnUpdateContacts()" class="allow_update   save_btn" style="color:#fff;background:#ff9710;margin-left:16px;">保存</div>
                   </div>
                   <div class="con" style="">
                       <div class="conbodyrow">
                           <div class="one ">
                               <div class="ib input_left" style="vertical-align: top;">姓名</div>
                               <Input v-model="customer_name" v-if="!updateStatus.updateContacts" value="" placeholder="请填写姓名" style="width: 160px;height:32px;vertical-align: top;"></Input>
                               <Input v-model="customer_name" v-else value="" placeholder="请填写姓名" disabled style="width: 160px;height:32px;vertical-align: top;"></Input>
                           </div>
                       </div>
                       <div class="conbodyrow" style="margin-top:30px;">
                           <div class="one ">
                               <div class="ib input_left">电话</div>
                               <Input v-model="customer_phone" v-if="!updateStatus.updateContacts" value="" placeholder="请填写手机号" style="width: 160px;height:32px;vertical-align: top;"></Input>
                               <Input v-model="customer_phone" v-else placeholder="请填写手机号" value="" disabled style="width: 160px;height:32px;vertical-align: top;"></Input>
                           </div>
                       </div>
                   </div>
               </div>
               <!-- 联系人  end -->

               <!-- 行程 -->
               <div v-show="showTrip(order_info.type_id)" class="box " style="margin-top:43px;">
                   <div class="title_box ">
                       <div class="ib left_pannel" style="width:4px;height:20px;background:#ff9710;"></div>
                       <div class="ib title">行程</div>
                       <div @click="btnUpdatePerfectTripClick()" style="margin-left:30px;" class="allow_update   change_btn" v-show="order_info.update_type =='1'">修改</div>
                   </div>
                   <div class="con" style="">
                       <time-line-show ref="timeLineShow" class=""></time-line-show>
                   </div>
               </div>
               <!-- 行程 end -->

               <!-- 开具发票 -->
               <div class="box " style="margin-top:43px;">
                   <div class="title_box ">
                       <div class="ib left_pannel" style="width:4px;height:20px;background:#ff9710;"></div>
                       <div class="ib title">开具发票</div>
                       <div v-show="order_info.invoice!=0" style="margin-left:10px;" @click="btnUpdateInvoiceClick()" class="allow_update   change_btn">修改</div>
                   </div>
                   <div class="con" style="">
                       <div class="conbodyrow">
                           <div class="one ">
                               <span class="input_left">是否开票</span>
                               <span v-html="order_info.invoice!=0?'开票':'不开票'">开票</span>
                           </div>
                       </div>
                       <div v-show="order_info.invoice!=0" class="conbodyrow" style="margin-top:30px;">
                           <div class="one ">
                               <span class="input_left">开票信息</span>
                               <span v-show="order_info.invoice!=0 && invoice_info.title" v-html="invoice_info.title">生日快乐旅行社</span>
                               <span style="margin:0 22px;">|</span>
                               <span>快递至</span>
                               <span v-show="order_info.invoice!=0 && (invoice_info.city_array.area_name+invoice_info.deliver_add)!=''" style="margin-left:12px;" v-html="invoice_info.city_array.area_name+invoice_info.deliver_add">上海市闵行区申长路988弄虹桥万科中心</span>
                               <span style="margin:0 22px;">|</span>
								<span>收件人</span>
								<span style="margin-left: 12px;">{{invoice_info.deliver_contact}}</span>
								<span style="margin-left:12px;">{{invoice_info.deliver_tel}}</span>
                           </div>
                       </div>
                   </div>
               </div>
               <!-- 开具发票  end -->
           </div>

           <!-- 去支付 -->
           <div class="" style="text-align:left;height:81px;border-top:1px solid #e5e5e5;">
               <div class="ib" style="font-size:14px;line-height:81px;font-weight:500;color:#666;margin-left:52px;">选择  {{order_info.bus_count}}  辆车，行程  {{order_info.day_count}}  天</div>
               <div class="ib" style="height:100%;float:right;">
                   <div class="ib" style="margin-right:36px;">
                       <div class="" style="margin-top:6px;text-align:right;">
                           <span class="" style="padding-top:7px;font-size:18px;">¥&nbsp;</span>
                           <span style="font-size:28px;font-weight:600;color:#333;">{{order_info.order_price}}</span>
                       </div>
                       <div v-if="order_info.type_id != '2'" style="margin-top:6px;color:#666;">包含 {{order_info.day_count}} 天，约 {{order_info.total_miles}} 公里，超出另行计费</div>
                       <div v-else style="margin-top:6px;color:#666;">含 100 公里 8 小时 / 天，超出另行计费</div>
                   </div>
                   <div @click="toPay()" class="ib pay_btn" style="float:right;width:178px;height:81px;line-height:81px;text-align:center;background:#ff9710;cursor:pointer;" v-show="order_info.status_id == '0'">
                       <div style="font-size:24px;font-weight:600;color:#fff;cursor:pointer;">去支付</div>
                   </div>
               </div>
           </div>
           <!-- 去支付  end -->

       </div>
       <!-- 弹框 -->
       <div class="modal">
           <perfect-trip ref="perfect_trip" @tripOK="tripOK" :stations="area_info" :stationIcon="1!=2" :mileage="order_info.total_miles" :days="order_info.day_count" :times="travel_info_noshow"></perfect-trip>
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
import perfectTrip from '../bus/view/_perfectTrip.vue'
import invoice from '../bus/view/_invoice.vue'
import timeLineShow from './view/_timeLineShow.vue'
import orderDetail from './view/_orderHeader'
// import timeLine from '../bus/children/view/_timeLine.vue'
export default {
	name: "busReserve",
	data() {
		return {
            loadSuccess:false,//一开始隐藏  加载数据成功后显示
            urlParam:{},
			dateOptions: {
				disabledDate(date) {
					return date && date.valueOf() < Date.now() - 86400000;
				}
			},
			updateStatus: {
				updateContacts: true,
				updateTrip: true,
				updateInvoice: true
			},
			bus_info: [],
            customer_name:'',
            customer_phone:'',
            area_info:[],
            city_name:"",
			order_info: {
//				age_type: "",
//              area_name: "",
//				brand_name: "",
//				bus_count: "0",
//				bus_img: "",
//				contact_phone: "",
//				contact_user: "",
//				day_count: "",
//				end_run_date: "",
//				end_station: "",
//				flight: "",
//				id: "",
//				invoice: "",
//				order_price: "",
//				seat_count: "",
//				start_run_date: "",
//				start_station: "",
//				type: "",
//				status_id : ''
			},
            stopUpdateTime:true,
            travel_info:[],
            travel_info_noshow:[],  //要修改的
            travel_info_show:[],     //纯展示的
            //发票信息
            invoice_info:{
                "uid": "",
                "add_id": "",
                "info_id": "",
                "area_id": "",
                "deliver_contact": "",
                "deliver_tel": "",
                "deliver_add": "",
                "memo": "",
                "user_type": "",
                "invoice_type": "",
                "title": "",
                "tax_no": "",
                "card_bank_name": "",
                "card_number": "",
                "register_add": "",
                "register_tel": "",
                "city_array":{
                    "province_id": "",
                    "city_id": "",
                    "county_id": "",
                    "area_name": "",
                }
            },
            //发票弹层对象
            oldInvoiceFormObj:{},
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
			}
		}
	},
	components: {
		headerView,
		footerView,
		perfectTrip,
		invoice,
		timeLineShow,
		orderDetail
	},
    beforeRouteEnter(to,from,next){
        next((vm)=>{
            vm.load();
        })
    },
    beforeRouteLeave(to,from,next){
    		this.loadSuccess = false;
    		next((vm)=>{

    		})
    },
	mounted() {
//      this.load();
	},
	methods: {
        load(){
            this.urlParam=this.$route.query;
            Util.isLogin({
                obj:this,
                success:(userInfo,token)=>{
                    this.httpLoadInfo();
                },error:()=>{
                    // this.$Message.error(infoType.infoNotLogin);
//                  this.$refs.headerView.btnLogin();
					this.$router.push({
						name : 'home'
					});
                }
            })
        },
		httpLoadInfo() {
			Util.post({
				obj: this,
				url: '/order/get-order-detail',
				data: {
					order_id: this.urlParam.order_id
				},
				success: (res_data) => {
					if (res_data.flag == false) {
                        if(res_data.code==infoType.codeNotLogin){
							this.$router.push({
								name : 'home'
							});
						}else{
							this.$Message.warning(res_data.msg);
						}
					} else {

						let data = res_data.data;
                        this.bus_info=data.bus_info;
                        this.order_info=data.order_info;
                        this.area_info=data.area_info;
                        this.city_name = data.city_name;
                        this.customer_name=this.order_info.contact_user;
                        this.customer_phone=this.order_info.contact_phone;

                        //判断是否开票
                        if(this.order_info.invoice!=0){
                            if(data.hasOwnProperty('invoice_info')){
                                this.invoice_info = data.invoice_info;

                                // invoiceFormObj: {
                    			// 	header: '', //发票抬头
                    			// 	type: '个人', //个人  企业
                    			// 	taxparerNumber: '', //纳税人识别号
                    			// 	recipientName: '', //收件人姓名
                    			// 	recipientPhone: '', //收件人电话
                    			// 	address1: '', //省
                    			// 	address2: '', //市
                    			// 	address3: '', //区
                    			// 	detailAddress: '' //详细地址
                    			// }
                                let type = data.invoice_info.user_type == 0 ? '个人' : '企业';

                                this.invoiceFormObj.header= data.invoice_info.title, //发票抬头
                                this.invoiceFormObj.type= type, //个人  企业
                                this.invoiceFormObj.taxparerNumber= data.invoice_info.tax_no, //纳税人识别号
                                this.invoiceFormObj.recipientName= data.invoice_info.deliver_contact, //收件人姓名
                                this.invoiceFormObj.recipientPhone= data.invoice_info.deliver_tel, //收件人电话
                                this.invoiceFormObj.address1= data.invoice_info.city_array.province_id, //省
                                this.invoiceFormObj.address2= data.invoice_info.city_array.city_id, //市
                                this.invoiceFormObj.address3= data.invoice_info.city_array.county_id, //区
                                this.invoiceFormObj.detailAddress= data.invoice_info.deliver_add //详细地址
                                this.oldInvoiceFormObj=Util.clone(this.invoiceFormObj);
                            }

                        }
                        this.travel_info=data.travel_info;
                        if(this.travel_info.length!=0){
                            if(this.travel_info[0].list.length!=0){
                               this.$refs.perfect_trip.$refs.trip_time_line.showStartTime=this.travel_info[0].list[0].run_time;
                            }
                        }
                        this.setTimeLineShowTravelInfo();
						this.loadSuccess=true;
					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})
		},
		refreshStatus(){
			this.httpLoadInfo();
		},
        setTimeLineTravelInfo(){

            this.$refs.perfect_trip.$refs.trip_time_line.startArea=this.city_name;
            this.travel_info_noshow=[];
            //应该有的日期
            let should_dates = [];
            let date_day_obj = {};
            for(var i=0;i<this.order_info.day_count;i++){
                let da = Util.getDateByDay(i,this.order_info.start_run_date);
                should_dates.push(da);
                date_day_obj[da]=i+1;
            }
            for(var i=0;i<this.travel_info.length;i++){
                var dict = this.travel_info[i];
                Util.ZZLog(dict.date);
                for(var j=0;j<dict.list.length;j++){
                    var item = dict.list[j];
                    let obj = {};
                    obj.date=item.run_date;

                    obj.text=item.name;
                    obj.show_date=false;
                    obj.show_add=false;
                    let day = date_day_obj[item.run_date];
                    obj.day=day;
                    if(j==0) obj.show_date=true;

                    this.travel_info_noshow.push(obj);

                    if(j==dict.list.length-1){
                        this.travel_info_noshow.push({
                            date:item.run_date,
                            text:"",
                            day:day,
                            show_date:false,
                            show_add:true
                        })
                    }
                }
            }
            //现在数据中的日期
            let datasouce_dates = [];
            datasouce_dates=this.travel_info.map(x=>x.date);
            var arr = [];
            for(var i=0;i<should_dates.length-this.travel_info.length;i++){
                let obj ={};
                let date = should_dates[this.travel_info.length+i];
                let day = date_day_obj[date];
                obj.date=should_dates[this.travel_info.length+i];
                obj.text="";
                obj.day = day;
                obj.show_date=true;
                obj.show_add=false;
                arr.push(obj);
                arr.push({
                    date:obj.date,
                    text:"",
                    day:day,
                    show_date:false,
                    show_add:true
                })
            }
            this.travel_info_noshow = [...this.travel_info_noshow,...arr];
            Util.ZZLog(this.travel_info_noshow);

        },
        setTimeLineShowTravelInfo(){
            this.travel_info_show = [];
            let tempDate = null;
            let arr = Util.clone(this.travel_info);
            for(var i=0;i<arr.length;i++){
                var item = arr[i];
                for(var j=0;j<item.list.length;j++){
                    var dict = item.list[j];
                    if(dict.name==""){
                        continue;
                    }
                    let obj={};
                    let day=i+1;
                    if(tempDate!=dict.run_date){
                        obj.date=dict.run_date+'&emsp;第'+day+'天';
                    }else{
                        obj.date="";
                    }
                       tempDate = dict.run_date
                    obj.text=dict.name;
                    if(i==0){
                        obj.text=dict.name+'&emsp;'+dict.run_time;
                    }
                    this.travel_info_show.push(obj);
                }
            }
            this.$refs.timeLineShow.times=this.travel_info_show;
        },
		// 点击联系人
		btnUpdateContacts() {
            if(!this.updateStatus.updateContacts){
                let _data = {
                    order_id:this.urlParam.order_id,
                    contact_user:this.customer_name,
                    contact_phone:this.customer_phone
                }
                Util.post({
                    obj:this,
                    url:'/order/update-contact-user',
                    data:_data,
                    success:(res_data)=>{
                        if(res_data.flag==false){
                            this.$Message.warning(res_data.msg);
                            this.customer_name = this.order_info.contact_user;
                            this.customer_phone = this.order_info.contact_phone;
                        }else{
                            let data = res_data.data;
                            this.$Message.success('修改联系人信息成功');
                            this.httpLoadInfo();
                        }
                    },error:()=>{
                        this.customer_name = this.order_info.contact_user;
                        this.customer_phone = this.order_info.contact_phone;
                        this.$Message.error(infoType.infoApiError);
                    }
                })
            }
			this.updateStatus.updateContacts = !this.updateStatus.updateContacts;
		},
		//点击完善详细行程
		btnUpdatePerfectTripClick() {
            this.setTimeLineTravelInfo();
            this.$refs.perfect_trip.$refs.trip_time_line.stopUpdateTime=false;
			this.$refs.perfect_trip.show = true;
		},
		//点击修改开票信息
		btnUpdateInvoiceClick() {
			// Util.ZZLog(this.$refs['perfect_trip']);
            // this.$Modal.info({
            //     title:'温馨提示',
            //     content:"该功能正在完善中"
            // })
            // return;
            this.invoiceFormObj = Util.clone(this.oldInvoiceFormObj);
			this.$refs['invoice'].show = true;
		},
        //去支付
        toPay(){
            this.$router.push({
                name:"pay",
                query:{
                    order_id:this.order_info.id
                }
            })
        },
        //是否显示行程
        // 接送机站 没有行程
        showTrip(index){

            let flag = true;
            if(index=='1' || index=='2'){
                flag = true;
            }else{
                flag = false;
            }
            return flag;
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
			if (index > 1 && index < arr.length)
				return arr[index - 1];
			else return arr[0];
		},
        //根据订单状态得到状态下标
        getIndexByStatu(){
            // 等待支付0  派车中1 已派车2  完成3  取消4
            let status = this.order_info.status_id;
            status=status-0;
            return status;

        },
        //订单状态的头部
        orderCancelSuccess(){
            this.httpLoadInfo();
        },
        //回调
        tripOK(arr,startTime){

            let trip = [];
            arr=arr.filter(x=>x.text!="")
            arr=arr.filter(x=>x.date!="");
            Util.ZZLog(arr,startTime);
            for(var i=0;i<arr.length;i++){
                let dict = arr[i];
                let time="";
                if(i==0)time=startTime;
                let obj = {
                    name:dict.text,
                    runDate:dict.date,
                    runTime:time
                }
                trip.push(obj);
            }
            let cstr = JSON.stringify(trip);
            Util.ZZLog(cstr);
            Util.post({
                obj:this,
                url:'/order/update-trip',
                data:{
                		trip: cstr,
                		order_id : this.order_info.id
                },
                success:(res_data)=>{
                    if(res_data.flag==false){
                        this.$Message.warning(res_data.msg);
                    }else{
                        let data = res_data.data;
                        this.httpLoadInfo();
                    }
                },error:()=>{
                    this.$Message.warning(infoType.infoApiError);
                }
            })
        },
        invoiceSubmitSuccess(data,obj){

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
                        obj.show=false;
                        this.httpLoadInfo();
                    }
                },
                error: () => {
                    this.$Message.error(infoType.infoApiError);
                }
            })

            //参数中添加订单号
            // let _data={
            //     order_id:this.order_info.id,
            //     deliver_contact:data.deliver_contact,
            //     deliver_tel:data.deliver_tel,
            //     deliver_add:data.deliver_add,
            //     title:data.invoice_title,
            //     tax_no:data.invoice_tax_no,
            //     province_id:data.province,
            //     city_id:data.city,
            //     area_id:data.county
            // }
            // Util.post({
            //     obj: this,
            //     url: '/order/update-invoice',
            //     data: _data,
            //     success: (res_data) => {
            //         Util.ZZLog(res_data);
            //         if (res_data.flag == false) {
            //             this.$Message.warning(res_data.msg);
            //         } else {
            //             let data = res_data.data;
            //             obj.show=false;
            //             this.httpLoadInfo();
            //         }
            //     },
            //     error: () => {
            //         this.$Message.error(infoType.infoApiError);
            //     }
            // })

        },
        busImageStyle(url){
            //   'background:url('+loadData.model_info.imgUrl+')';
            let imageurl= url?url:'http://img.zhizhuchuxing.cn/busda/empty.png';
            return {
                backgroundImage:'url('+imageurl+')',
                backgroundSize:'132px 85px'
            }
        }
	}
}
</script>
<style>
.order_detail .one .ivu-input[disabled] {
	background-color: #fff!important;
	color: #333!important;
	border-color: #fff!important;
}
.ivu-input[disabled], fieldset[disabled] .ivu-input {
    background-color: #f3f3f3!important;
    opacity: 1!important;
    cursor: not-allowed!important;
    color: #666666!important;
}
</style>
<style scoped="scoped">
.one>.name {
	color: #333;
}

.one>.input_left {
	color: #666;
	margin-right: 20px;
	width: 48px!important;
	text-align: right!important;
    /*vertical-align: middle;*/
    height: 32px;
    line-height: 32px;
}

.one>.icon {
	padding: 0 12.5px;
}

.one:last-child>.icon {
	display: none;
}



.info .box .left_pannel {
	margin-right: 22px;
	float: left;
	width: 4px;
	height: 20px;
	
}

.info .box .title {
	font-size: 14px;
	font-weight: 500;
	color: #333;
	/*text-align: left;
	margin-right: 12px;
    line-height: 1;*/
}

.info .box .title_box .allow_update {
	width: 60px;
	height: 25px;
	color: #ff9710;
	border: 1px solid #ff9710;
	cursor: pointer;
	box-shadow: 0 0 0px 0 rgba(51, 51, 51, 0.2);
    display: inline-block;
    text-align: center;
    line-height: 25px;
}

.info .con {
	margin-top: 30px;
	margin-left: 27px;
}
.pay_btn:hover{
	background: #FFAC40 !important;
}
.change_btn:hover{
	background: #FF9710 !important;
	color: #FFFFFF !important;
}
.save_btn:hover{
	background: #FFAC40 !important;
}
</style>
