<template>
	<div class="search_div" >
		<div class="">
			<div class="left " style="float: left;">
				<div style="cursor: pointer;display: table;" @click="statusDidClick(item)" v-for="(item,index) in status" :key="item.status_id" class="status " >
					<div style="display: inline-block;display: table-cell;vertical-align: middle;" class=" status_new"  :class="item.selected==true?'sel_status':'dis_status'">
					<div class="img" :class="statusImgStyle(item)" style="width: 29px;height: 29px;background-repeat: no-repeat;background-size: 100% 100%;margin: 0 auto;"></div>
					<div class="name" style="line-height: 1;padding-top: 11px;font-size: 14px;">{{item.name}}</div>
					</div>
				</div>
			</div>

			<div class="right" style="float: left;">
				<!--省市际包车-->
				<div class="right_info" :style="select_status == 1? 'dispaly:block':'display:none'">
					<div class="right_row">
						<div class="label_title">出发地</div>
						<start-poi @poiName="startPoiChange" :default_type="1"  style="display: inline-block;"></start-poi>
					</div>
					<div class="right_row">
						<div class="label_title">目的地</div>
						<!--<Input placeholder="" style="width: 215px;height: 30px;"></Input>-->
						<poi-input @poiName="endPoiChange" style="display: inline-block;vertical-align: middle;"></poi-input>
					</div>
					<div class="right_row">
						<div class="label_title">行程天数</div>
						<Select v-model="province_tripday" style="width:215px;height: 30px;text-align: left;">
							<Option v-for="item in tripday_ary" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</div>
					<div class="right_row">
						<div class="label_title">出发日期</div>
						<DatePicker type="date" @on-change="dateChange" v-model="province_start_date" :options="pro_start_date" placeholder="选择日期" style="width: 215px"></DatePicker>
					</div>
				</div>
				<!--市区包车-->
				<div class="right_info" :style="select_status == 2? 'dispaly:block':'display:none'">
					<div class="right_row">
						<div class="label_title">出发地</div>
						<start-poi @poiName="cityStartPoiChange" :default_type="2" style="display: inline-block;"></start-poi>
					</div>
					<div class="right_row">
						<div class="label_title">行程天数</div>
						<Select v-model="city_tripday" style="width:215px;height: 30px;text-align: left;display: inline-block;">
							<Option v-for="item in tripday_ary" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</div>
					<div class="right_row">
						<div class="label_title">出发时间</div>
						<DatePicker type="date" @on-change="dateChange" v-model="city_start_date" :options="pro_start_date" placeholder="选择日期" style="width: 137px;display: inline-block;"></DatePicker>
						<Time-picker @on-change="timeChange1" format="HH:mm" style="width: 73px;margin-left:2px;display: inline-block;"></Time-picker>
					</div>
				</div>
				<!--接送机站-->
				<div class="right_info" :style="select_status == 3? 'dispaly:block':'display:none'">
					<div class="plane_title right_row" style="display: inline-block;">
						<div v-for="(item,index) in menus" :key="item.id" @click="menuChange(index)" class="menu" style="float: left;width: 25%;">
							<div class="menu_title">{{item.title}}</div>
							<div class="menu_border" :style="item.selected?'background:#ff9710':''"></div>
						</div>
					</div>
					<div style="width: 297px;height: 1px;background:  #cccccc;margin-top: -23px;margin-bottom: 24px;"></div>
					<!--接机-->
					<div class="" :style="select_menu == 3? 'dispaly:block':'display:none'">
						<div class="right_row">
							<div class="label_title">接机航班</div>
							<Input v-model="receive_plane_code" placeholder="" style="width: 215px;height: 30px;display: inline-block;"></Input>
						</div>
						<div class="right_row">
							<div class="label_title">起飞日期</div>
							<DatePicker @on-change="dateChange" v-model="receive_plane_date" type="date" :options="pro_start_date" placeholder="选择日期" style="width: 215px;display: inline-block;"></DatePicker>
						</div>
						<div class="right_row">
							<div class="label_title">抵达地点</div>
							<el-amap-search-box :search-option="searchOption" :on-search-result="onMapPlaneReceive" class="search-box" style="width: 215px;height: 30px;display: inline-block;"></el-amap-search-box>
						</div>
					</div>
					<!--送机-->
					<div class="right2" :style="select_menu == 4? 'dispaly:block':'display:none'">
						<div class="right_row">
							<div class="label_title">送机机场</div>
							<!--<Input v-model="send_plane_code" placeholder="" style="width: 215px;height: 30px;"></Input>-->
							<Select v-model="send_plane_code" filterable label-in-value @on-change="ttt" style="width: 215px;display: inline-block;">
								<Option v-for="(option,index) in options1" :value="option.id" :key="index">{{option.area_name}}</Option>
							</Select>
						</div>
						<div class="right_row">
							<div class="label_title">出发地点</div>
							<el-amap-search-box :search-option="searchOption" :on-search-result="onMapPlaneSend" class="search-box" style="width: 215px;height: 30px;display: inline-block;"></el-amap-search-box>
						</div>
						<div class="right_row">
							<div class="label_title">出发时间</div>
							<DatePicker @on-change="dateChange" v-model="send_plane_date" type="date" :options="pro_start_date" placeholder="选择日期" style="width: 137px;display: inline-block;"></DatePicker>
							<Time-picker @on-change="timeChange2"  format="HH:mm" style="width: 73px;margin-left:2px;display: inline-block;"></Time-picker>
						</div>
					</div>
					<!--接站-->
					<div class="right3" :style="select_menu == 5? 'dispaly:block':'display:none'">
						<div class="right_row">
							<div class="label_title">火车站</div>
							<Select v-model="receive_station_code" filterable label-in-value @on-change="ttt2" style="width: 215px;display: inline-block;">
								<Option v-for="(option,index) in options2" :value="option.id" :key="index">{{option.area_name}}</Option>
							</Select>
						</div>
						<div class="right_row">
							<div class="label_title">抵达地点</div>
							<el-amap-search-box :search-option="searchOption" :on-search-result="onMapStationReceive" class="search-box" style="width: 215px;height: 30px;display: inline-block;"></el-amap-search-box>
						</div>
						<div class="right_row">
							<div class="label_title">出发时间</div>
							<DatePicker @on-change="dateChange" v-model="receive_station_date" type="date" :options="pro_start_date" placeholder="选择日期" style="width: 137px;display: inline-block;"></DatePicker>
							<Time-picker @on-change="timeChange4"  format="HH:mm" style="width: 73px;margin-left:2px;display: inline-block;"></Time-picker>
						</div>
					</div>
					<!--送站-->
					<div class="right4" :style="select_menu == 6? 'dispaly:block':'display:none'">
						<div class="ub ub-ac right_row">
							<div class="label_title">火车站</div>
							<Select v-model="send_station_code" filterable label-in-value @on-change="ttt3" style="width: 215px;display: inline-block;">
								<Option v-for="(option,index) in options3" :value="option.id" :key="index">{{option.area_name}}</Option>
							</Select>
						</div>
						<div class="right_row">
							<div class="label_title">出发地点</div>
							<el-amap-search-box :search-option="searchOption" :on-search-result="onMapStationSend" class="search-box" style="width: 215px;height: 30px;display: inline-block;"></el-amap-search-box>
						</div>
						<div class="right_row">
							<div class="label_title">出发时间</div>
							<DatePicker @on-change="dateChange" v-model="send_station_date" type="date" :options="pro_start_date" placeholder="选择日期" style="width: 137px;display: inline-block;"></DatePicker>
							<Time-picker @on-change="timeChange3" format="HH:mm" style="width: 73px;margin-left:2px;display: inline-block;"></Time-picker>
						</div>
					</div>
				</div>
				<div class="search_btn" @click="searchBtnDidClick">查 询</div>
			</div>

		</div>
	</div>
</template>

<script>
	import poiInput from './_poiInput'
	import startPoi from './_startPoi'
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'

	export default {
		name: "Search",
		data() {
			return {
				status: [{
					status_id: '1',
					selected: true,
					name: '省市际包车'
				}, {
					status_id: '2',
					selected: false,
					name: '市区包车'
				}, {
					status_id: '3',
					selected: false,
					name: '接送机/站'
				}],
				menus: [{
					id: '3',
					selected: true,
					title: '接机'
				}, {
					id: '4',
					selected: false,
					title: '送机'
				}, {
					id: '5',
					selected: false,
					title: '接站'
				}, {
					id: '6',
					selected: false,
					title: '送站'
				}],
				tripday_ary: [{
					name: '1天',
					id: '1'
				}, {
					name: '2天',
					id: '2'
				}, {
					name: '3天',
					id: '3'
				}, {
					name: '4天',
					id: '4'
				}, {
					name: '5天',
					id: '5'
				}, {
					name: '6天',
					id: '6'
				}, {
					name: '7天',
					id: '7'
				}, {
					name: '8天',
					id: '8'
				}, {
					name: '9天',
					id: '9'
				}, {
					name: '10天',
					id: '10'
				}],
				pro_start_date: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},
				select_status: '1',
				select_menu: '3',

				searchOption: {
					city: "",
					citylimit: true
				},
				options1: [],
				options2: [],
				options3: [],

				//				plane_receive: '',
				//				plane_send : '',
				//				station_receive: '',
				//				station_send : '',
				//省包车
				province_start: '',
				province_start_name : '',
				province_end: '',
				province_end_name :'',
				province_tripday: '',
				province_start_date: '',
				//市区包车
				city_start: '',
				city_start_name : '',
				city_tripday: '1',
				city_start_date: '',
				city_start_time: '',
				//接机
				receive_plane_code: '',
				receive_plane_date: '',
				plane_receive: '',
				//送机
				send_plane_code: '',
				send_plane_code_name : '',
				plane_send: '',
				send_plane_date: '',
				send_plane_time: '',
				//接站
				receive_station_code: '',
				receive_station_code_name: '',
				receive_station_date: '',
				receive_station_time :'',
				station_receive: '',
				//送站
				send_station_code: '',
				send_station_code_name: '',
				send_station_date: '',
				send_station_time: '',
				station_send: ''
			}
		},
		components: {
			poiInput,
			startPoi
		},
		mounted: function() {
			this.$nextTick(() => {
				this.initData1();
				this.initData2();
				this.initData3();
			})
//			console.log(this.$refs.aaa);
		},
		methods: {
			//初始化机场、站点数组
			initData1() {
				Util.post({
					obj: this,
					url: '/booking/bus-list/get-city',
					data: {
						bus_type: 4,
						search_str: '',
						show_type : 'end'
					},
					success: (res_data) => {
						Util.ZZLog('初始化', res_data);
						if(!res_data.flag) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							this.options1 = data.list;
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			initData2() {
				Util.post({
					obj: this,
					url: '/booking/bus-list/get-city',
					data: {
						bus_type: 5,
						search_str: '',
						show_type : 'start'
					},
					success: (res_data) => {
						Util.ZZLog('初始化', res_data);
						if(!res_data.flag) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							this.options2 = data.list;
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			initData3() {
				Util.post({
					obj: this,
					url: '/booking/bus-list/get-city',
					data: {
						bus_type: 6,
						search_str: '',
						show_type : 'end'
					},
					success: (res_data) => {
						Util.ZZLog('初始化', res_data);
						if(!res_data.flag) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							this.options3 = data.list;
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			statusImgStyle(item){
				if (item.status_id == '1') {//省
					if (item.selected == false) {
						return 'province'
					}else{
						return 'province_hover'
					}
				} else if(item.status_id == '2'){//市
					if (item.selected == false) {
						return 'city'
					}else{
						return 'city_hover'
					}
				} else{//接送机
					if (item.selected == false) {
						return 'plane'
					}else{
						return 'plane_hover'
					}
				}
			},
			//
			statusDidClick(item) {
				this.status.map(x => x.selected = false);
				item.selected = true;
				this.select_status = item.status_id;
			},
			//切换接送机类型
			menuChange(index) {
				this.menus.map(x => x.selected = false);
				this.menus[index].selected = true;
				this.select_menu = this.menus[index].id;
			},
			//省  出发地变更
			startPoiChange(poi_id,poi_name) {
				this.province_start = poi_id;
				this.province_start_name = poi_name;
			},
			//省 目的地变更
			endPoiChange(poi_id,poi_name) {
				this.province_end = poi_id;
				this.province_end_name = poi_name;
			},
			//市区 出发地
			cityStartPoiChange(poi_id,poi_name) {
				this.city_start = poi_id;
				this.city_start_name = poi_name;
			},
			onMapPlaneReceive(arr) {
				this.plane_receive = arr[0].name;
			},
			onMapPlaneSend(arr) {
				this.plane_send = arr[0].name;
			},
			onMapStationReceive(arr) {
				this.station_receive = arr[0].name;
			},
			onMapStationSend(arr) {
				this.station_send = arr[0].name;
			},
			dateChange(val) {
				this.province_start_date = val;
				this.city_start_date = val;
				this.receive_plane_date = val;
				this.send_plane_date = val;
				this.receive_station_date = val;
				this.send_station_date = val;
			},
			timeChange1(val) {
				this.city_start_time = val;
			},
			timeChange2(val) {
				this.send_plane_time = val;
			},
			timeChange3(val) {
				this.send_station_time = val;
			},
			timeChange4(val){
				this.receive_station_time = val;
			},
			ttt(val){
				this.send_plane_code_name = val.label;
			},
			ttt2(val){
				this.receive_station_code_name = val.label;
			},
			ttt3(val){
				this.send_station_code_name = val.label;
			},
			getDataByType() {
				let data = null;
				if(this.select_menu == '3') { //接机
					if(this.receive_plane_code == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请输入接机航班'
//						})
						this.$Message.warning('请填写接机航班');
						return;
					}
					if(this.receive_plane_date == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择接机日期'
//						})
						this.$Message.warning('请选择起飞日期');
						return;
					}
					if(this.plane_receive == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请输入抵达地点'
//						})
						this.$Message.warning('请填写抵达地点');
						return;
					}

					//判断 改航班是否有效
					Util.post({
						obj: this,
						url: '/booking/bus-list/get-flight',
						data: {
							flight: this.receive_plane_code,
							date: this.receive_plane_date
						},
						success: (res_data) => {
							Util.ZZLog(res_data);

							if(!res_data.flag) {
//								this.$Modal.warning({
//									title: '提示',
//									content:res_data.msg
//								})
								this.$Message.warning(res_data.msg);
							} else{

								data = {
									bus_type: this.select_menu,
									start_station_name : this.receive_plane_code,
									start_station_id :res_data.data.list.id,
									end_station_name :this.plane_receive,
									end_station_id :'',
									day_count : '',
									start_run_date : res_data.data.date,
									start_run_time : '',
									flight_date : this.receive_plane_date
								}
								this.$router.push({
									name: 'busList',
									query: data
								})
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})



				} else if(this.select_menu == '4') { //送机
					if(this.send_plane_code == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择送机场'
//						})
						this.$Message.warning('请选择送机场');
						return;
					}
					if(this.plane_send == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请输入出发地点'
//						})
						this.$Message.warning('请填写出发地点');
						return;
					}
					if(this.send_plane_date == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择出发日期'
//						})
						this.$Message.warning('请选择出发日期');
						return;
					}
					if(this.send_plane_time == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择出发时间'
//						})
						this.$Message.warning('请选择出发时间');
						return;
					}
					data = {
						bus_type: this.select_menu,
						start_station_name : this.plane_send,
						start_station_id :'',
						end_station_name :this.send_plane_code_name,
						end_station_id :this.send_plane_code,
						day_count : '',
						start_run_date : this.send_plane_date,
						start_run_time : this.send_plane_time
					}
				} else if(this.select_menu == '5') { //接站
					if(this.receive_station_code == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择接站站点'
//						})
						this.$Message.warning('请选择火车站');
						return;
					}
					if(this.station_receive == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请输入出发地点'
//						})
						this.$Message.warning('请填写抵达地点');
						return;
					}
					if(this.receive_station_date == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择出发日期'
//						})
						this.$Message.warning('请选择出发日期');
						return;
					}

					data = {
						bus_type: this.select_menu,
						start_station_name : this.receive_station_code_name,
						start_station_id :this.receive_station_code,
						end_station_name :this.station_receive,
						end_station_id :'',
						day_count : '',
						start_run_date : this.receive_station_date,
						start_run_time : this.receive_station_time
					}
				} else { //送站
					if(this.send_station_code == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择送站站点'
//						})
						this.$Message.warning('请选择火车站');
						return;
					}

					if(this.station_send == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请输入出发地点'
//						})
						this.$Message.warning('请填写出发地点');
						return;
					}
					if(this.send_station_date == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择出发日期'
//						})
						this.$Message.warning('请选择出发日期');
						return;
					}
					if(this.send_station_time == '') {
//						this.$Modal.warning({
//							title: '提示',
//							content: '请选择出发时间'
//						})
						this.$Message.warning('请选择出发时间');
						return;
					}
					data = {
						bus_type: this.select_menu,
						start_station_name : this.station_send,
						start_station_id :'',
						end_station_name :this.send_station_code_name,
						end_station_id :this.send_station_code,
						day_count : '',
						start_run_date : this.send_station_date,
						start_run_time : this.send_station_time,
					}
				}
				return data;
			},
			searchBtnDidClick() {
				let data = new Object();
				switch(this.select_status) {
					case '1':
						if(this.province_start == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '出发地不能为空'
//							})
							this.$Message.warning('请选择出发地');
							return;
						}
						if(this.province_end == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '目的地不能为空'
//							})
							this.$Message.warning('请选择目的地');
							return;
						}
						if(this.province_tripday == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '请选择出行天数'
//							})
							this.$Message.warning('请选择行程天数');
							return;
						}
						if(this.province_start_date == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '请选择出行日期'
//							})
							this.$Message.warning('请选择出发日期');
							return;
						}
						data = {
							bus_type: this.select_status,
							start_station_name : this.province_start_name,
							start_station_id :this.province_start,
							end_station_name :this.province_end_name,
							end_station_id :this.province_end,
							day_count : this.province_tripday,
							start_run_date : this.province_start_date,
							start_run_time : '',
						}
						break;
					case '2':
						if(this.city_start == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '出发地不能为空'
//							})
							this.$Message.warning('请选择出发地');
							return;
						}
						if(this.city_tripday == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '请选择行程天数'
//							})
							this.$Message.warning('请选择行程天数');
							return;
						}
						if(this.city_start_date == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '请选择出发日期'
//							})
							this.$Message.warning('请选择出发日期');
							return;
						}
						if(this.city_start_time == '') {
//							this.$Modal.warning({
//								title: '提示',
//								content: '请选择出发时间'
//							})
							this.$Message.warning('请选择出发时间');
							return;
						}
						data = {
							bus_type: this.select_status,
							start_station_name : this.city_start_name,
							start_station_id :this.city_start,
							end_station_name :'',
							end_station_id :'',
							day_count : this.city_tripday,
							start_run_date : this.city_start_date,
							start_run_time : this.city_start_time
						}
						Util.ZZLog(data);
						break;
					case '3':
						data = this.getDataByType();
						if (!data) {
							return;
						}
						Util.ZZLog(data);
						break;
					default:
						break;
				}

				this.$router.push({
					name: 'busList',
					query: data
				})

			}
		}
	}
</script>

<style>
	.right_info .search-btn {
		display: none!important;
	}

	.right_info .el-vue-search-box-container .search-box-wrapper {
		height: 30px;
		display: inline-block;
		width: 100%;
		height: 32px;
		line-height: 30px;
		font-size: 12px;
		border: 1px solid #d7dde4;
		border-radius: 4px;
		color: #333;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
		/* box-sizing: border-box; */
	}

	.right_info .search-box-wrapper input {
		width: 100%;
		height: 28px;
		border-radius: 4px;
	}

	.right_info .el-vue-search-box-container {
		position: relative;
		/* width: 360px; */
		height: 32px;
		background: #f3f3f3!important;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		border-radius: 2px 3px 3px 2px;
		z-index: 10;
	}

	.right_info .el-vue-search-box-container .search-tips {
		position: absolute;
		top: 100%;
		width: 215px!important;
		border: 0px solid #dbdbdb;
		background: #fff;
		overflow: auto;
	}

	.el-vue-search-box-container .search-tips ul li {
		height: 30px;
		text-align: left;
		line-height: 30px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
		padding: 0 10px;
		cursor: pointer;
		border-left: 1px solid #dbdbdb;
		border-right: 1px solid #dbdbdb;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}

	.right_info .el-vue-search-box-container .search-tips ul li:active {
		background: #ff9710;
		color: #fff;
	}
	.search-box-wrapper input{
		color: #333;
		font-size: 12px !important;
	}
	.search-box-wrapper:hover{
		border-color: #ffac40 !important;
	}
	.search-box-wrapper:focus{
		border-color: #ffac40 !important;
	}

</style>

<style scoped>

	.search_div {
		width: 550px;
		height: 340px;
		background-color: #ffffff;
		box-shadow: 0 0 40px 0 rgba(51, 51, 51, 0.8);
	}

	.left {
		width: 120px;
		height: 340px;
	}

	.right {
		height: 340px;
	}

	.status{
		height: 114px;
		width: 120px;
		border-bottom: 1px solid #ffffff;
	}
	.status:hover>:not(.sel_status) {
		height: 112px;
		width: 120px;
		/*border-bottom: 1px solid red;
		border-top: 1px solid red;*/
		background-color: #8596a3 !important;
	}
	/*.status:first-child{
		height: 114px;
		width: 120px;
	}*/
	.status:last-child {
		border-bottom: 0 !important;
		height: 112px !important;
	}
	/*.status_new:last-child{
		border-bottom: 0 !important;
		height: 112px !important;
	}*/
	.status:last-child:hover {
		border-bottom: 0 !important;
		height: 112px !important;
	}
	/*.status_new:last-child:hover {
		border-bottom: 0 !important;
		height: 112px !important;
	}*/

	.sel_status {
		background: #ffffff;
	}

	.dis_status {
		background: #627d8e;
	}

	.sel_status>.name {
		color: #ff9710;
	}

	.dis_status>.name {
		color: #FFFFFF;
	}

	.right_info {
		padding: 34px 56px 12px 56px;
	}

	.label_title {
		width: 82px;
		text-align: left;
		font-size: 14px;
		color: #666666;
		text-align-last: justify;
		-ms-text-align-last: justify;
		/*text-align: justify;*/
		padding-right: 22px;
		display: table-cell;
		vertical-align: middle;
	}

	.right_row {
		width: 301px;
		padding: 12px 0;
		height: 56px;
		display: table;
	}

	.menu_border {
		height: 3px;
		width: 100%;
		margin-top: 12px;
	}

	.menu_title {
		color: #999999;
		font-size: 14px;
		line-height: 1;
	}

	.search_btn {
		width: 215px;
		height: 35px;
		border-radius: 2px;
		background-color: #ff9710;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
		color: #FFFFFF;
		font-size: 15px;
		margin-left: 140px;
		cursor: pointer;
		line-height: 35px;
	}
	.search_btn:hover{
		background-color: #FFAC40;
	}
	.menu_title:hover{
		color: #ff9710;
	}

	.menu {
		cursor: pointer;
	}

	.plane{
		background-image: url('../../../assets/images/home/jiesongji2.png');
	}
	.plane_hover{
		background-image: url('../../../assets/images/home/jiesongji1.png');
	}
	.province{
		background-image: url('../../../assets/images/home/shengshibaoche2.png');
	}
	.province_hover{
		background-image: url('../../../assets/images/home/shengshijibaoche1.png');
	}
	.city{
		background-image: url('../../../assets/images/home/shiqubaoche2.png');
	}
	.city_hover{
		background-image: url('../../../assets/images/home/shiqubaoche1.png');
	}
	.status:hover{
		background-color: #FFFFFF;
	}
	/*.status:hover .name{
		color: #ff9710;
	}*/
	/*.status:hover .plane{
		background-image: url('../../../assets/images/home/jiesongji1.png');
	}
	.status:hover .plane_hover{
		background-image: url('../../../assets/images/home/jiesongji1.png');
	}
	.status:hover .province{
		background-image: url('../../../assets/images/home/shengshijibaoche1.png');
	}
	.status:hover .province_hover{
		background-image: url('../../../assets/images/home/shengshijibaoche1.png');
	}
	.status:hover .city{
		background-image: url('../../../assets/images/home/shiqubaoche1.png');
	}
	.status:hover .city_hover{
		background-image: url('../../../assets/images/home/shiqubaoche1.png');
	}*/

</style>
