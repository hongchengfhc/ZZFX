<template>
<div class="topSearchView">
	<div class="" style="background:#fff;margin-top:53px;padding-bottom:21px;min-height:265px;width:100%;">
		<div class="top" style="height:164px;background:#fff5e5;text-align:left;">
			<div class="" style="background:#fff;">
				<div @click="btnMenuClick(item)" v-for="(item,index) in menus" :key="item.menuId" class="menu ib" :style="item.selected==true?'background:#fff5e5;':'background:#fff;'">
					<div class="top_border" style="height:4px;width:100%;" :style="item.selected==true?'background:#ff9710;':''"></div>
					<div class="title" style="text-align:center;width: 120px;height:46px;line-height:46px;font-size:14px;">{{item.title}}</div>
				</div>
			</div>
			<div class="content" style="height:114px;">
				<div class="ib" style="padding:17.5px 0;">
					<!-- 省/市际包车 -->
					<div class="search_content" v-show="showEnumType==enumType.enumShengShiJiBaoChe">
						<div class="row_line">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">出发地</div>
								<start-poi ref="ref_shengShiJiStart" class="ib start_poi" @poiName="shengShiJiStartPoiChange" :default_type="1" placeholder="请填写出发地" style="width:275px;height:32px;text-align:left;background:#fff;border-radius: 4px;"></start-poi>
								<!-- <Input placeholder="请填写出发地" style="width:275px;height:32px;"></Input> -->
							</div>
							<div class="ib" style="margin-left:81px;">
								<div class="ib input_left" style="">行程天数</div>
								<Select v-model="trip_day" style="width:225px;height:32px;text-align:left;">
                                   <Option v-for="item in trip_days" :value="item" :key="item">{{ item }}天</Option>
                               </Select>
							</div>
						</div>
						<div class="row_line" style="margin-top:15px;">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">目的地</div>
								<!-- <Input placeholder="请填写目的地" style="width:275px;height:32px;"></Input> -->
								<poi-input class="" ref="ref_shengShiJiEnd" @poiName="shengShiJiEndPoiChange" style="vertical-align:middle;background:#fff;display:inline-block"></poi-input>
							</div>
							<div class="ib" style="margin-left:81px;">
								<div class="ib input_left" style="">出发日期</div>
								<Date-picker class="ib" v-model="start_run_date" @on-change="changeDate" type="date" :options="dateOptions" :editable="editable" placeholder="" style="width: 225px;height:32px;"></Date-picker>
							</div>
						</div>
					</div>
					<!-- 市区包车 -->
					<div class="search_content" v-show="showEnumType==enumType.enumShiQuBaoChe">
						<!-- 定位用 -->
						<el-amap v-if="location_amap_flag" style="display:none;" ref="zz_amap" vid="amap" :amap-manager="amapManager" :events="events"></el-amap>
						<div class="row_line">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">出发地</div>
								<start-poi ref="ref_shiQuStart" class="ib start_poi" @poiName="shiQuStartPoiChange" :default_type="2" placeholder="请填写出发地" style="width:275px;height:32px;text-align:left;"></start-poi>
								<!-- <Input placeholder="请填写出发地" style="width:275px;height:32px;"></Input> -->
							</div>
							<div class="ib" style="padding-left:81px;">
								<div class="ib input_left" style="">出发时间</div>
								<Date-picker v-model="start_run_date" @on-change="changeDate" type="date" :options="dateOptions" placeholder="" style="width: 140px;height:32px;"></Date-picker>
								<Time-picker @on-change="changeTime" :value="start_run_time" format="HH:mm" placeholder="" style="width: 75px;height:32px;margin-left:7px;"></Time-picker>
							</div>
						</div>
						<div class="row_line" style="margin-top:15px;">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">行程天数</div>
								<Select v-model="shiQuTrip_day" style="width:275px;height:32px;text-align:left;">
                                   <Option v-for="item in trip_days" :value="item" :key="item">{{ item }}天</Option>
                               </Select>
							</div>
						</div>
					</div>
					<!-- 接机 -->
					<div class="search_content" v-show="showEnumType==enumType.enumJieJi">
						<div class="row_line">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">接机航班</div>
								<Input v-model="jieJiFlightNumber" placeholder="请填写航班号" style="width:275px;height:32px;"></Input>
							</div>
							<div class="ib" style="margin-left:81px;">
								<div class="ib input_left" style="">起飞日期</div>
								<Date-picker v-model="jieJiFlight_date" @on-change="changeDate" type="date" :options="dateOptions" placeholder="选择日期" style="width: 140px;height:32px;"></Date-picker>
								<!-- <Time-picker @on-change="changeTime" format="HH:mm" placeholder="" style="width: 75px;height:32px;margin-left:7px;"></Time-picker> -->
							</div>
						</div>
						<div class="row_line" style="margin-top:15px;">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">抵达地点</div>
								<!-- <Input placeholder="请填写地点" style="width:275px;height:32px;"></Input> -->
								<el-amap-search-box ref="amap_jieJi_end" v-model="jieJiEnd_station_name" :search-option="searchOption" :on-search-result="onMapSearchResultJieJi" class="ib search-box" style="width: 275px"></el-amap-search-box>
							</div>
						</div>
					</div>
					<!-- 接站 -->
					<div class="search_content" v-show="showEnumType==enumType.enumJieZhan">
						<div class="row_line">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">火车站</div>
								<!-- <Input placeholder="请填写火车站" style="width:275px;height:32px;"></Input> -->
								<Select @on-change="selectJieZhanChange" label-in-value v-model="jieZhanStart_station_id" filterable style="width: 275px;">
									<Option v-for="(option,index) in jieZhanStation" :value="option.id" :key="index">{{option.area_name}}</Option>
								</Select>
							</div>
							<div class="ib" style="margin-left:81px;">
								<div class="ib input_left" style="">出发时间</div>
								<Date-picker v-model="start_run_date" @on-change="changeDate" type="date" :options="dateOptions" placeholder="选择日期" style="width: 140px;height:32px;"></Date-picker>
								<Time-picker @on-change="changeTime" :value="start_run_time" format="HH:mm" placeholder="" style="width: 75px;height:32px;margin-left:7px;"></Time-picker>
							</div>
						</div>
						<div class="row_line" style="margin-top:15px;">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">抵达地点</div>
								<!-- <Input placeholder="请填写地点" style="width:275px;height:32px;"></Input> -->
								<el-amap-search-box ref="amap_jieZhan_end" :search-option="searchOption" :on-search-result="onMapSearchResultJieZhan" class="ib search-box" style="width: 275px"></el-amap-search-box>
							</div>
						</div>
					</div>
					<!-- 送机 -->
					<div class="search_content" v-show="showEnumType==enumType.enumSongJi">
						<div class="row_line">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">送机机场</div>
								<!-- <Input v-model="songJiFlightNumber" placeholder="请填写航班号" style="width:275px;height:32px;"></Input> -->
								<Select @on-change="selectSongJiChange" label-in-value v-model="songJiEnd_station_id" filterable style="width: 275px;">
									<Option v-for="(option,index) in songJiStations" :value="option.id" :key="index">{{option.area_name}}</Option>
								</Select>
							</div>
							<div class="ib" style="margin-left:81px;">
								<div class="ib input_left" style="">出发时间</div>
								<Date-picker v-model="start_run_date" @on-change="changeDate" type="date" :options="dateOptions" placeholder="选择日期" style="width: 140px;height:32px;"></Date-picker>
								<Time-picker @on-change="changeTime" :value="start_run_time" format="HH:mm" placeholder="" style="width: 75px;height:32px;margin-left:7px;"></Time-picker>
							</div>
						</div>
						<div class="row_line" style="margin-top:15px;">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">出发地点</div>
								<!-- <Input placeholder="请填写地点" style="width:275px;height:32px;"></Input> -->
								<el-amap-search-box ref="amap_songJi_start" :search-option="searchOption" :on-search-result="onMapSearchResultSongJi" class="ib search-box" style="width: 275px"></el-amap-search-box>
							</div>
						</div>
					</div>
					<!-- 送站 -->
					<div class="search_content" v-show="showEnumType==enumType.enumSongZhan">
						<div class="row_line">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">火车站</div>
								<!-- <Input placeholder="请填写火车站" style="width:275px;height:32px;"></Input> -->
								<Select @on-change="selectSongZhanChange" label-in-value v-model="songZhanEnd_station_id" filterable style="width: 275px;">
									<Option v-for="(option,index) in songZhanStations" :value="option.id" :key="index">{{option.area_name}}</Option>
								</Select>
							</div>
							<div class="ib" style="margin-left:81px;">
								<div class="ib input_left" style="">出发时间</div>
								<Date-picker v-model="start_run_date" @on-change="changeDate" type="date" :options="dateOptions" placeholder="选择日期" style="width: 140px;height:32px;"></Date-picker>
								<Time-picker @on-change="changeTime" :value="start_run_time" format="HH:mm" placeholder="" style="width: 75px;height:32px;margin-left:7px;"></Time-picker>
							</div>
						</div>
						<div class="row_line" style="margin-top:15px;">
							<div class="ib" style="margin-left:38px;">
								<div class="ib input_left" style="">出发地点</div>
								<!-- <Input placeholder="请填写地点" style="width:275px;height:32px;"></Input> -->
								<el-amap-search-box ref="amap_songZhan_start" :search-option="searchOption" :on-search-result="onMapSearchResultSongZhan" class="ib search-box" style="width: 275px"></el-amap-search-box>
							</div>
						</div>
					</div>
				</div>
				<div class="ib" style="margin-right:240px;float:right;height:100%;line-height:114px;">
					<span @click="btnSearchClick()" class="search_btn" style="padding:9px 32px;text-align:center;width:100px;height: 35px;cursor:pointer;border-radius: 2px;background-color: #ff9710;box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);font-size: 16px;color: #FFFFFF;">查 询
						<!--<div style="font-size:16px;color:#fff;width:36px;text-align-last: justify;"></div>-->
					</span>
				</div>
			</div>
		</div>
		<div class="bottom ub ub-ver" style="padding-top:19px;padding-left:64px;">
			<div class="row ub">
				<div class="row_menu_title" style="float:left;">车型</div>
				<!-- <div class="row_menu row_menu_selected">不限</div> -->
				<div class="right_menu" style="width:1112px;">
					<div class="row_menu ub" :class="item.selected==true?'row_menu_selected':''" @click="btnBusTypeClick(item)" v-for="item in bus_types">
						<div class="row_menu_value ub" v-html="item.name">33座</div>
						<Icon v-show="item.selected==true && item.name!='不限'" type="close" style="margin-left:5px;"></Icon>
					</div>
				</div>

				<!-- <div class="row_menu">37座</div>
				<div class="row_menu">41座</div>
				<div class="row_menu">53座</div> -->
			</div>
			<div class="row ub">
				<div class="row_menu_title" style="float:left;">车龄</div>
				<div class="right_menu" style="width:1112px">
					<div class="row_menu" :class="item.selected==true?'row_menu_selected':''" @click="btnBusAgeClick(item)" v-for="item in bus_ages">
						<div class="row_menu_value ub" v-html="item.name"></div>
						<Icon v-show="item.selected==true && item.name!='不限'" type="close" style="margin-left:5px;"></Icon>
					</div>
				</div>

				<!-- <div class="row_menu row_menu_selected">3年以下</div>
				<div class="row_menu">3-5年</div>
				<div class="row_menu">5年以上</div> -->
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Util from '../../../config/Util'
import infoType from '../../../config/infoType'
import poiInput from '../../home/view/_poiInput.vue'
import startPoi from '../../home/view/_startPoi'
import VueAMap from 'vue-amap'
let amapManager = new VueAMap.AMapManager();
export default {
	name: "topSearchView",
	props: {
		bus_types: [Array], //{id,name,seat_num}
		bus_ages: [Array], //{id,name}
		searchDefault:[Object]
	},
	components: {
		poiInput,
		startPoi
	},
	data() {

		return {
			location_amap_flag:true,
			searchOption: {
				city: "",
				citylimit: true
			},
			editable: false,
			dateOptions: {
				disabledDate(date) {
					return date && date.valueOf() < Date.now() - 86400000;
				}
			},
			amapManager:amapManager,
			locationCity:'',  //城市
			locationCounty:'',  //区/县
			events:{
				init:(o)=>{
					// Util.ZZLog(o.getCity());
					// Util.ZZLog(o,o.getCenter(),this.$refs.zz_amap);
					// Util.ZZLog(this.$refs.zz_amap.$$getInstance());
					o.getCity(result=>{
						Util.ZZLog(result,'this is city');
						if(result.city==""){
							this.locationCity = result.province;
						}else{
							this.locationCity = result.city;
						}
						this.searchOption.city=this.locationCity;
						this.locationCounty=result.district;
						this.location();
					})
				}
			},
			menus: [{
					menuId: 1,
					title: "省市际包车",
					selected: true
				},
				{
					menuId: 2,
					title: "市区包车",
					selected: false
				},
				{
					menuId: 3,
					title: "接机",
					selected: false
				},
				{
					menuId: 4,
					title: "送机",
					selected: false
				},
				{
					menuId: 5,
					title: "接站",
					selected: false
				},
				{
					menuId: 6,
					title: "送站",
					selected: false
				}
			],
			trip_days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			trip_day: 1,
			enumType: {
				enumShengShiJiBaoChe: 1,
				enumShiQuBaoChe: 2,
				enumJieJi: 3,
				enumJieZhan: 5,
				enumSongJi: 4,
				enumSongZhan: 6
			},
			showEnumType: 0,
			//
			jieJiFlightNumber: "",
			jieJiTrueRunDate: "", //航班到达时间即为接机时间
			songJiStations: [],
			songZhanStations: [],
			jieZhanStation: [],

			//不同类型的
			shengShiJiStart_station_id: "",
			shengShiJiStart_station_name:"",
			shengShiJiEnd_station_id: "",
			shengShiJiEnd_station_name: "",
			shiQuStart_station_id: "",
			shiQuStart_station_name:"",
			shiQuTrip_day:1,
			jieJiStart_station_id: "",
			jieJiStart_station_name:"",
			jieJiFlight_date:"",
			jieJiEnd_station_name: "",
			jieZhanStart_station_id: "",
			jieZhanStart_station_name:"",
			jieZhanEnd_station_name: "",
			songJiStart_station_name: "",
			songJiEnd_station_id: "",
			songJiEnd_station_name:"",
			songZhanStart_station_name: "",
			songZhanEnd_station_id: "",
			songZhanEnd_station_name:"",
			//参数
			bus_type: "",
			start_run_date: "",
			start_run_time: "",
			seat_count: "",
			age_type: "",
			page: {
				current_page: 1,
				page_size: 10,
				total_count: 1,
				total_page: 1
			}

		}
	},

	mounted() {
		Util.ZZLog('mounted');
		this.showEnumType = this.enumType.enumShiQuBaoChe;

		let amap_jieJi = this.$refs.amap_jieJi_end.$el.firstChild.firstChild;
		amap_jieJi.className='ivu-input';
		amap_jieJi.style.fontSize='12px';
		amap_jieJi.placeholder='请填写抵达地点';
		let amap_songji = this.$refs.amap_songJi_start.$el.firstChild.firstChild;
		amap_songji.className='ivu-input';
		amap_songji.style.fontSize='12px';
		amap_songji.placeholder='请填写出发地点';
		let amap_jieZhan = this.$refs.amap_jieZhan_end.$el.firstChild.firstChild;
		amap_jieZhan.className='ivu-input';
		amap_jieZhan.style.fontSize='12px';
		amap_jieZhan.placeholder='请填写抵达地点';
		let amap_songZhan = this.$refs.amap_songZhan_start.$el.firstChild.firstChild;
		amap_songZhan.className='ivu-input';
		amap_songZhan.style.fontSize='12px';
		amap_songZhan.placeholder='请填写出发地点';




		this.$nextTick(() => {
			this.loadStationInfo(4);
			this.loadStationInfo(5);
			this.loadStationInfo(6);
			if(this.searchDefault){
				this.load();
			}
		});
	},
	watch:{
		searchDefault:{
			handler(cur,old){

				this.load();
			}
		}
	},
	methods: {
		location(){
			//特殊情况  若出发地为空 则显示当前城市
			let sh = {
				'黄浦区':792,
				'徐汇区':793,
				'长宁区':794,
				'静安区':795,
				'普陀区':796,
				'闸北区':797,
				'虹口区':798,
				'杨浦区':799,
				'闵行区':800,
				'宝山区':801,
				'嘉定区':802,
				'浦东新区':803,
				'金山区':804,
				'松江区':805,
				'青浦区':806,
				'奉贤区':807,
				'崇明县':808
			}
			let nj = {
				'玄武区':811,
				'秦淮区':812,
				'建邺区':813,
				'鼓楼区':814,
				'浦口区':815,
				'栖霞区':816,
				'雨花台区':817,
				'江宁区':818,
				'六合区':819,
				'溧水区':820,
				'高淳区':821
			}
			// 上海 791,  南京 810
			let areaObj={
				'上海':sh,
				'上海市':sh,
				'南京':nj,
				'南京市':nj
			}
			if(!this.shiQuStart_station_name){
				if(!this.locationCounty){
					this.locationCity = '南京市';
					this.locationCounty='玄武区';
				}else{
					if(this.locationCity!="上海市" && this.locationCity!="南京市"){
						this.locationCity = '南京市';
						this.locationCounty='玄武区';
					}
				}
				this.shiQuStart_station_name=this.locationCity+this.locationCounty;
				this.shiQuStart_station_id = areaObj[this.locationCity][this.locationCounty];
				this.$refs.ref_shiQuStart.search_input_sel = this.shiQuStart_station_id;
				this.$refs.ref_shiQuStart.search_input_name = this.shiQuStart_station_name;
				this.$refs.ref_shiQuStart.search_input=this.shiQuStart_station_name;
				Util.ZZLog('this is watch locationCount');
				this.btnSearchClick();
			}
		},
		load(){
			Util.ZZLog(this.searchDefault,'watch_topSearchView');
			if(this.searchDefault.hasOwnProperty('start_run_date')){
				this.start_run_date = this.searchDefault.start_run_date;
				let date1 = this.start_run_date.replace(/-/g,'');
				let date2 = Util.getDateTime(0).replace(/-/g,'');
				if(date1<date2)this.start_run_date = Util.getDateTime(0);
			}else{
				this.start_run_date = Util.getDateTime(0);
			}

			this.start_run_time = this.searchDefault.start_run_time;
			this.trip_day = this.searchDefault.day_count|0;
			this.showEnumType = this.searchDefault.bus_type;
			this.setSelectMenu();
			if(this.showEnumType==this.enumType.enumShengShiJiBaoChe){  //省市际包车
				this.shengShiJiStart_station_id = this.searchDefault.start_station_id;
				this.shengShiJiStart_station_name = this.searchDefault.start_station_name;
				this.shengShiJiEnd_station_id = this.searchDefault.end_station_id;
				this.shengShiJiEnd_station_name=this.searchDefault.end_station_name;

				this.$refs.ref_shengShiJiStart.search_input_sel = this.shengShiJiStart_station_id;
				this.$refs.ref_shengShiJiStart.search_input_name = this.shengShiJiStart_station_name;
				this.$refs.ref_shengShiJiStart.search_input=this.shengShiJiStart_station_name;

				let arr=[];
				let ids=this.shengShiJiEnd_station_id.split(',');
				let names=this.shengShiJiEnd_station_name.split(',');
				for(var i=0;i<ids.length;i++){
					let obj={};
					this.$set(obj,'full_name',names[i]);
					this.$set(obj,'id',ids[i]);
					arr.push(obj);
				}
				this.$refs.ref_shengShiJiEnd.tags=arr;
				this.$refs.ref_shengShiJiEnd.id_ary=ids;
				this.$refs.ref_shengShiJiEnd.name_ary=names;
				// this.$refs.ref_shengShiJiEnd.tags=
				this.btnSearchClick();
			}else if(this.showEnumType==this.enumType.enumShiQuBaoChe){  //市区包车
				this.shiQuStart_station_id = this.searchDefault.start_station_id;
				this.shiQuStart_station_name = this.searchDefault.start_station_name;
				this.shiQuTrip_day = this.searchDefault.day_count|0;
				if(this.shiQuStart_station_name!=""){
					this.$refs.ref_shiQuStart.search_input_sel = this.shiQuStart_station_id;
					this.$refs.ref_shiQuStart.search_input_name = this.shiQuStart_station_name;
					this.$refs.ref_shiQuStart.search_input=this.shiQuStart_station_name;
				}
			}else if(this.showEnumType==this.enumType.enumJieJi){   //接机
				Util.ZZLog(this.searchDefault,'jieji');
				this.jieJiStart_station_id = this.searchDefault.start_station_id;
				this.jieJiStart_station_name = this.searchDefault.start_station_name;
				this.jieJiFlightNumber = this.jieJiStart_station_name;
				this.jieJiEnd_station_name = this.searchDefault.end_station_name;
				this.jieJiFlight_date = this.searchDefault.flight_date?this.searchDefault.flight_date:this.start_run_date;
				//地图检索框
				this.$refs.amap_jieJi_end.keyword = this.jieJiEnd_station_name;
				this.btnSearchClick();

			}else if(this.showEnumType==this.enumType.enumSongJi){  //送机
				this.songJiStart_station_name = this.searchDefault.start_station_name;
				this.songJiEnd_station_id = this.searchDefault.end_station_id;
				this.songJiEnd_station_name = this.searchDefault.end_station_name;
				//地图检索框
				this.$refs.amap_songJi_start.keyword = this.songJiStart_station_name;
				this.btnSearchClick();
			}else if(this.showEnumType==this.enumType.enumJieZhan){  //接站
				Util.ZZLog(this.searchDefault,'jiezhan');
				this.jieZhanStart_station_id = this.searchDefault.start_station_id;
				this.jieZhanStart_station_name = this.searchDefault.start_station_name;
				this.jieZhanEnd_station_name = this.searchDefault.end_station_name;
				//地图检索框
				this.$refs.amap_jieZhan_end.keyword = this.jieZhanEnd_station_name;
				this.btnSearchClick();
			}else if(this.showEnumType==this.enumType.enumSongZhan){  //送站
				this.songZhanStart_station_name = this.searchDefault.start_station_name;
				this.songZhanEnd_station_id = this.searchDefault.end_station_id;
				this.songZhanEnd_station_name = this.searchDefault.end_station_name;
				//地图检索框
				this.$refs.amap_songZhan_start.keyword = this.songZhanStart_station_name;
				this.btnSearchClick();
			}else{}
		},
		//设置选中的菜单
		setSelectMenu(){
			this.menus.map(x=>x.selected=false);
			this.menus.map(x=>{
				if(x.menuId==this.showEnumType){
					x.selected=true;
				}
			})
		}
		,
		loadStationInfo(type=4){
			let show_type = 'end';
			if (type == 5) {
				show_type = 'start';
			}

			Util.post({
				obj:this,
				url:'/booking/bus-list/get-city',
				data:{bus_type:type,show_type},
				success:(res_data)=>{
					if(res_data.flag==false){
						this.$Message.warning(res_data.msg);
					}else{
						let data = res_data.data;
						if(type==4)this.songJiStations=data.list;
						if(type==5)this.jieZhanStation=data.list;
						if(type==6)this.songZhanStations=data.list;
					}
				},error:()=>{
					this.$Message.error(infoType.infoApiError);
				}
			})
		},
		// 头部菜单切换
		btnMenuClick(item) {
			this.menus.map(x => x.selected = false);
			item.selected = true;
			this.showEnumType = item.menuId;
			// let a='background:url(../)';
		},
		// 点击查询
		btnSearchClick() {
			let seat_count = "";
			let arr1 = [];
			let arr2 = [];
			Util.ZZLog('search',this.shiQuStart_station_name);
			this.bus_types.map(x => {
				if (x.selected) arr1.push(x.id);
			})
			this.bus_ages.map(x => {
				if (x.selected) arr2.push(x.id);
			})
			let param = {};
			if(!this.trip_day)this.trip_day=1;
			if (this.showEnumType == this.enumType.enumShengShiJiBaoChe) { //省/市际包车
				param = {
					bus_type: this.showEnumType,
					start_station_id: this.shengShiJiStart_station_id,
					end_station_id: this.shengShiJiEnd_station_id,
					start_station_name: this.shengShiJiStart_station_name,
					end_station_name: this.shengShiJiEnd_station_name,
					day_count: this.trip_day,
					start_run_date: this.start_run_date,
					start_run_time: this.start_run_time,
					seat_count: arr1.join(','),
					age_type: arr2.join(',')
				}
				this.searchDefault.start_station_id = this.shengShiJiStart_station_id;
				this.searchDefault.end_station_id = this.shengShiJiEnd_station_id;
				this.searchDefault.start_station_name = this.shengShiJiStart_station_name;
				this.searchDefault.end_station_name = this.shengShiJiEnd_station_name;
				this.$emit('btnSearchClick', param);
			} else if (this.showEnumType == this.enumType.enumShiQuBaoChe) { //市区包车
				param = {
					bus_type: this.showEnumType,
					start_station_id: this.shiQuStart_station_id,
					end_station_id: "",
					start_station_name: this.shiQuStart_station_name,
					end_station_name: "",
					day_count: this.trip_day,
					start_run_date: this.start_run_date,
					start_run_time: this.start_run_time,
					seat_count: arr1.join(','),
					age_type: arr2.join(',')
				}
				this.searchDefault.start_station_id = this.shiQuStart_station_name;
				this.searchDefault.end_station_id = "";
				this.searchDefault.start_station_name = this.shiQuStart_station_name;
				this.searchDefault.end_station_name = "";
				this.$emit('btnSearchClick', param);
			} else if (this.showEnumType == this.enumType.enumJieJi) { //接机
				let _data = {
					flight: this.jieJiFlightNumber,
					date: this.jieJiFlight_date
				}
				if(_data.flight==""){
					this.$Message.warning('请填写航班号');return;
				}
				if(_data.date==""){
					this.$Message.warning('请选择起飞日期');return;
				}
				Util.post({
					obj: this,
					url: "/booking/bus-list/get-flight",
					data: _data,
					success: (res_data) => {
						if (res_data.flag == false) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							this.jieJiTrueRunDate = data.date;
							this.start_run_date = data.date;
							this.jieJiStart_station_id = data.list.id;
							param = {
								bus_type: this.showEnumType,
								start_station_id: this.jieJiStart_station_id,
								end_station_id: "",
								start_station_name: data.list.area_name,
								end_station_name: this.jieJiEnd_station_name,
								day_count: 1,
								start_run_date: this.jieJiTrueRunDate,
								start_run_time: this.start_run_time,
								seat_count: arr1.join(','),
								age_type: arr2.join(',')
							}
							this.searchDefault.start_station_id = this.jieJiStart_station_id;
							this.searchDefault.end_station_id = "";
							this.searchDefault.start_station_name = this.jieJiStart_station_name;
							this.searchDefault.end_station_name = this.jieJiEnd_station_name;
							this.$emit('btnSearchClick', param);
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})

			} else if (this.showEnumType == this.enumType.enumJieZhan) { //接站
				param = {
					bus_type: this.showEnumType,
					start_station_id: this.jieZhanStart_station_id,
					end_station_id: "",
					start_station_name: this.jieZhanStart_station_name,
					end_station_name: this.jieZhanEnd_station_name,
					day_count: 1,
					start_run_date: this.start_run_date,
					start_run_time: this.start_run_time,
					seat_count: arr1.join(','),
					age_type: arr2.join(',')
				}
				this.searchDefault.start_station_id = this.jieZhanStart_station_id;
				this.searchDefault.end_station_id = "";
				this.searchDefault.start_station_name = this.jieZhanStart_station_name;
				this.searchDefault.end_station_name = this.jieZhanEnd_station_name;
				this.$emit('btnSearchClick', param);
			} else if (this.showEnumType == this.enumType.enumSongJi) { //送机

				param = {
					bus_type: this.showEnumType,
					start_station_id: "",
					end_station_id: this.songJiEnd_station_id,
					start_station_name: this.songJiStart_station_name,
					end_station_name: this.songJiEnd_station_name,
					day_count: 1,
					start_run_date: this.start_run_date,
					start_run_time: this.start_run_time,
					seat_count: arr1.join(','),
					age_type: arr2.join(',')
				}
				this.searchDefault.start_station_id = "";
				this.searchDefault.end_station_id = this.songJiEnd_station_id;
				this.searchDefault.start_station_name = this.songJiStart_station_name;
				this.searchDefault.end_station_name = this.songJiEnd_station_name;
				this.$emit('btnSearchClick', param);
			} else if (this.showEnumType == this.enumType.enumSongZhan) { //送站
				param = {
					bus_type: this.showEnumType,
					start_station_id: "",
					end_station_id: this.songZhanEnd_station_id,
					start_station_name: this.songZhanStart_station_name,
					end_station_name: this.songZhanEnd_station_name,
					day_count: 1,
					start_run_date: this.start_run_date,
					start_run_time: this.start_run_time,
					seat_count: arr1.join(','),
					age_type: arr2.join(',')
				}
				this.searchDefault.start_station_id = "";
				this.searchDefault.end_station_id = this.songZhanEnd_station_id;
				this.searchDefault.start_station_name = this.songZhanStart_station_name;
				this.searchDefault.end_station_name = this.songZhanEnd_station_name;
				this.$emit('btnSearchClick', param);
			} else {}
			//航班号
			param.flight=this.jieJiFlightNumber;
			param.flight_start_date=this.start_run_date;
			// if(param==null){
			// 	this.$Message.warning('')
			// }
		},
		// 车型切换
		btnBusTypeClick(item) {
			// this.bus_types.map(x => x.selected = false);
			if (item.id == "") {
				this.bus_types.map(x => x.selected = false);
				this.bus_types[0].selected = true;
			} else {
				this.bus_types[0].selected = false;
				item.selected = !item.selected;
			}
			let arr=this.bus_types.map(x=>x.selected)
			if(arr.indexOf(true)==-1){
				this.bus_types[0].selected=true;
			}
			this.btnSearchClick();
		},
		// 车龄切换
		btnBusAgeClick(item) {
			// this.bus_ages.map(x => x.selected = false);
			if (item.id == "") {
				this.bus_ages.map(x => x.selected = false);
				this.bus_ages[0].selected = true;
			} else {
				this.bus_ages[0].selected = false;
				item.selected = !item.selected;
			}
			let arr=this.bus_ages.map(x=>x.selected)
			if(arr.indexOf(true)==-1){
				this.bus_ages[0].selected=true;
			}
			this.btnSearchClick();
		},
		//日期
		changeDate(val) {
			if(this.showEnumType == this.enumType.enumJieJi){
				this.jieJiFlight_date = val;
			}else{
				this.start_run_date = val;
			}

		},
		changeTime(val) {
			this.start_run_time = val;
		},
		//select
		selectSongJiChange(item){
			this.songJiEnd_station_name = item.label;
			this.songJiEnd_station_id = item.value;
		},
		selectJieZhanChange(item){
			this.jieZhanStart_station_name = item.label;
			this.jieZhanStart_station_id = item.value;
		},
		selectSongZhanChange(item){
			this.songZhanEnd_station_name = item.label;
			this.songZhanEnd_station_id = item.value;
		},
		//回调函数
		//省  出发地变更
		shengShiJiStartPoiChange(id,name) {
			this.shengShiJiStart_station_id = id;
			this.shengShiJiStart_station_name=name;
			Util.ZZLog(id,name);
		},
		//省 目的地变更
		shengShiJiEndPoiChange(id,name) {
			this.shengShiJiEnd_station_id = id;
			this.shengShiJiEnd_station_name=name;
				Util.ZZLog(id,name);
		},
		//市区
		shiQuStartPoiChange(id,name) {
			this.shiQuStart_station_id = id;
			this.shiQuStart_station_name=name;
			Util.ZZLog(id,name);
		},
		//地图检索结果
		onMapSearchResultJieJi(arr) {
			let item = arr[0];
			this.jieJiEnd_station_name = item.name;
			Util.ZZLog(item);
		},
		onMapSearchResultJieZhan(arr) {
			let item = arr[0];
			this.jieZhanEnd_station_name = item.name;
			Util.ZZLog(item);
		},
		onMapSearchResultSongJi(arr) {
			let item = arr[0];
			this.songJiStart_station_name = item.name;
			Util.ZZLog(item);
		},
		onMapSearchResultSongZhan(arr) {
			let item = arr[0];
			this.songZhanStart_station_name=item.name;
			Util.ZZLog(item);
		}
	}
}
</script>
<style>
.start_poi .ivu-input-wrapper {
	width: 275px!important;
}

.content .poi_input {
	width: 275px!important;
}

.content .poi_search {
	width: 275px!important;
}

.content .search-btn {
	display: none!important;
}

.content .el-vue-search-box-container .search-box-wrapper {
	height: 32px!important;
	display: inline-block!important;
	width: 100%!important;
	line-height: 32px!important;
	font-size: 12px!important;
	border: 1px solid #d7dde4!important;
	border-radius: 4px!important;
	color: #333!important;
	background-color: #fff!important;
	background-image: none!important;
	position: relative!important;
	cursor: text!important;
	transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out!important;
	/* box-sizing: border-box!important; */
}

.content .search-box-wrapper input {
	width: 100%!important;
	color:#333!important;
	font-size:12px!important;
	height: 26px!important;
	text-indent: 0px!important;
}
.content .search-box-wrapper:hover{
		border-color: #ffac40 !important;
	}
.content .search-box-wrapper:focus{
		border-color: #ffac40 !important;
	}

.content .el-vue-search-box-container {
	position: relative!important;
	/* width: 360px!important; */
	height: 32px!important;
	background: #f3f3f3!important;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0)!important;
	border-radius: 2px 3px 3px 2px!important;
	z-index: 10!important;
}

.content .el-vue-search-box-container .search-tips {
	position: absolute!important;
	top: 100%!important;
	width: 275px!important;;
	border: 0px solid #dbdbdb!important;
	background: #fff!important;
	overflow: auto!important;
}

.content .el-vue-search-box-container .search-tips ul li {
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

.content .el-vue-search-box-container .search-tips ul li:active {
	background: #ff9710!important;
	color: #fff!important;
}
.content .tag_class{
	max-width:190px!important;
}
</style>
<style scoped="scoped">
.menu {
	cursor: pointer;
}

.menu:hover {
	background: #fff5e5!important;
}

.menu:hover>.top_border {
	/*background: #ff9710!important;*/
}




/*search input*/

.input_left {
	font-family: PingFangSC;
	font-size: 12px;
	font-weight: 500;
	color: #999999;
	margin-right: 32px;
	width: 50px;
	text-align-last: justify;
	text-align: right;
}




/*车型  车龄*/

.row {
	text-align: left;
}

.row:not(:first-child) {
	margin-top: 15px;
}
.row_line{
}
.row_menu_title {
	padding: 4px 0!important;
	font-size: 12px;
	font-weight: 500;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	color: #999999;
	display: inline-block;
}

.row_menu {
	padding: 4px 8px 4px 8px;
	cursor: pointer;
	font-family: PingFangSC;
	font-size: 12px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	display: inline-block;
}
.row_menu:hover{
	background: #FF9710;
	color: #ffffff;
}

.row_menu:first-child {
	padding: 4px 21px 4px 21px!important;
}

.row_menu_value {
	cursor: pointer;
	font-family: PingFangSC;
	font-size: 12px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	display: inline-block;
}

.right_menu>.row_menu {
	margin-left: 28px;
}

.row_menu_selected {
	background: #ff9710;
	color: #fff;
}
.search_btn:hover{
	background: #FFAC40 !important;
}
</style>
