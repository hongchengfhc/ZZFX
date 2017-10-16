<template>
<div class="busList">

	<div v-show="loadSuccess">
		<header-view ref="headerView" :selectMenu="2"></header-view>
		<div class="bus_list" style="background:#eee;padding-top:1px;">
			<div class="center" style="width:1200px;margin:0 auto;">
				<top-search-view ref="ref_topSearch" :searchDefault="urlParam" @btnSearchClick="searchClick" :bus_types="seat_list" :bus_ages="age_type_list"></top-search-view>
				<bus-table-view ref="ref_busTable" style="margin-top:20px;" @sort="listSort" @changePage="changePage" @bookClick="bookClick" @seeBusImageClick="seeBusImageClick" :busList="busList" :page="page"></bus-table-view>
			</div>
		</div>

		<footer-view ref="footer"></footer-view>
		<bus-photo ref="bus_photo"></bus-photo>
	</div>
	<!-- <div class="loading" v-show="loadSuccess==false">
		<Spin fix size="large">
			<Icon type="load-c" size="50" class="demo-span-icon-load"></Icon>
			<div style="font-size:30px;">Loading</div>
		</Spin>
	</div> -->
</div>
</template>

<script>
import Vue from 'vue'
import Util from '../../config/Util'
import infoType from '../../config/infoType'
import headerView from '../common/_header.vue'
import footerView from '../common/_footer.vue'
import topSearchView from './view/_topSearchView.vue'
import busTableView from './view/_busTableView.vue'
import busPhoto from './view/_bus_photo'

var Mock = require('mockjs')


export default {
	name: "busList",
	components: {
		headerView,
		footerView,
		topSearchView,
		busTableView,
		busPhoto
	},
	data() {
		return {
			loadSuccess: true,
			tranName: 'component-fade',
			busList: [],
			age_type_list: [], //车龄
			seat_list: [], //车型
			//查询的参数
			page: {
				current_page: 1,
				page_size: 10,
				total_count: 0,
				total_pages: 1
			},
			searchParam: {},
			urlParam: null

		}
	},
	// beforeCreate() {
	//   console.log('beforeCreate');
	// console.log(this.$route);
	// },
	// created() {
	//   console.log('created');console.log(this.$route);
	// },
	// beforeMount() {
	// 	console.log('beforeMount');
	// 	console.log(this.$route);
	// },
	mounted: function() {
		this.$nextTick(() => {
			this.initData();
			this.urlParam = this.$route.query;
		});
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.urlParam = vm.$route.query;
			Util.ZZLog(vm.$refs);
			vm.$refs.ref_topSearch.location_amap_flag = true;
			vm.$refs.headerView.loginUserInfo();
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$refs.ref_topSearch.$refs.ref_shiQuStart.search_input_sel = "";
		this.$refs.ref_topSearch.$refs.ref_shiQuStart.search_input_name = "";
		this.$refs.ref_topSearch.$refs.ref_shiQuStart.search_input = "";
		this.$refs.ref_topSearch.location_amap_flag = false;
		next((vm) => {

		})
	},
	methods: {
		initData() {
			Util.post({
				obj: this,
				url: '/booking/bus-list/init',
				success: (res_data) => {
					Util.ZZLog(res_data);
					this.loadSuccess = true;
					if (!res_data.flag) {
						this.$Message.warning(res_data.msg);
					} else {
						let data = res_data.data;
						this.seat_list = data.seat_list;
						this.seat_list.map(x => this.$set(x, 'selected', false));
						this.seat_list.unshift({
							id: '',
							name: "不限",
							seat_num: '',
							selected: true
						});

						this.age_type_list = data.age_type_list;
						this.age_type_list.map(x => this.$set(x, 'selected', false));
						this.age_type_list.unshift({
							id: '',
							name: "不限",
							selected: true
						});

						// this.searchClick();
					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})
		},
		//头部search的查询条件
		searchClick(item) {
			Util.ZZLog(this.searchParam, 'searchClick');
			this.searchParam = item;
			this.$set(this.searchParam, 'sort_str', '');
			this.$set(this.searchParam, 'sort_type', '');
			this.$set(this.searchParam, 'current_page', 1);
			this.$set(this.searchParam, 'page_size', 10);
			this.$refs.ref_busTable.setSortTypeDefault();
			this.loadListInfo();
		},
		loadListInfo() {
			let bus_type = this.searchParam.bus_type;
			let start_station_name = this.searchParam.start_station_name;
			let start_station_id = this.searchParam.start_station_name;
			let end_station_name = this.searchParam.end_station_name;
			let end_station_id = this.searchParam.end_station_id;
			let start_run_date = this.searchParam.start_run_date;
			let start_run_time = this.searchParam.start_run_time;
			let day_count = this.searchParam.day_count;
			if (bus_type == 1) {
				if(!start_station_name){
					this.$Message.warning('请选择出发地');return;
				}
				if(!end_station_name){
					this.$Message.warning('请选择目的地');return;
				}
				if(day_count==0){
					this.$Message.warning('请选择行程天数');return;
				}
				if(!start_run_date){
					this.$Message.warning('请选择出发日期');return;
				}
			} else if (bus_type == 2) {
				if(!start_station_name){
					this.$Message.warning('请选择出发地');return;
				}
				if(day_count==0){
					this.$Message.warning('请选择行程天数');return;
				}
				if(!start_run_date){
					this.$Message.warning('请选择出发日期');return;
				}
				if(!start_run_time){
					this.$Message.warning('请选择出发时间');return;
				}

			} else if (bus_type == 3) {
				if(!start_station_name){
					this.$Message.warning('请输入接机航班');return;
				}
				if(!end_station_name){
					this.$Message.warning('请选择抵达地点');return;
				}
				if(!start_run_date){
					this.$Message.warning('请选择起飞日期');return;
				}
			} else if (bus_type == 4) {
				if(!end_station_id){
					this.$Message.warning('请选择送机机场');return;
				}
				if(!start_station_name){
					this.$Message.warning('请选择出发地点');return;
				}
				if(!start_run_date){
					this.$Message.warning('请选择出发日期');return;
				}
				if(!start_run_time){
					this.$Message.warning('请选择出发时间');return;
				}
			} else if (bus_type == 5) {
				if(!start_station_id){
					this.$Message.warning('请选择火车站');return;
				}
				if(!end_station_name){
					this.$Message.warning('请选择抵达地点');return;
				}
				if(!start_run_date){
					this.$Message.warning('请选择出发日期');return;
				}
				if(!start_run_time){
					this.$Message.warning('请选择出发时间');return;
				}
			} else if(bus_type==6){
				if(!end_station_id){
					this.$Message.warning('请选择火车站');return;
				}
				if(!start_station_name){
					this.$Message.warning('请选择出发地点');return;
				}
				if(!start_run_date){
					this.$Message.warning('请选择出发日期');return;
				}
				if(!start_run_time){
					this.$Message.warning('请选择出发时间');return;
				}
			} else{}
			Util.post({
				obj: this,
				url: '/booking/bus-list/list',
				data: this.searchParam,
				success: (res_data) => {
					Util.ZZLog(res_data);
					window.scrollTo(0, 0);
					if (!res_data.flag) {
						this.$Message.warning(res_data.msg);
						this.busList = [];
					} else {
						let data = res_data.data;
						this.busList = data.list;
						this.busList.map(x => {
							this.$set(x, 'bus_type', this.searchParam.bus_type);
						})
						this.page = data.page;
					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
					// this.$Modal.error({
					// 	title: '温馨提示',
					// 	content: infoType.infoApiError
					// })
				}
			})
		},
		//表格的回调函数
		listSort(sort, enumObj) {
			let sort_str = "";
			let sort_type = "";
			if (sort == enumObj.enumSortDefault) {

			} else if (sort == enumObj.enumSortPriceDown) {
				sort_str = "model_price";
				sort_type = "desc";
			} else if (sort == enumObj.enumSortPriceUp) {
				sort_str = "model_price";
				sort_type = "";
			} else if (sort == enumObj.enumSortAgeDown) {
				sort_str = "z.age_type";
				sort_type = "desc";
			} else if (sort == enumObj.enumSortAgeUp) {
				sort_str = "z.age_type";
				sort_type = "";
			} else {}
			this.searchParam.sort_str = sort_str;
			this.searchParam.sort_type = sort_type;
			this.loadListInfo();
		},
		changePage(selectPage) {
			Util.ZZLog('点击了分页', selectPage);
			this.page.current_page = selectPage;
			this.searchParam.current_page = selectPage;
			this.loadListInfo();

		},
		//cell的回调函数
		bookClick(item) {
			Util.ZZLog('点击了cell的预订', item, this.searchParam);
			let bookParam = {
				bus_id: item.id,
				bus_type: this.searchParam.bus_type,
				start_run_date: this.searchParam.start_run_date,
				start_run_time: this.searchParam.start_run_time,
				start_station_id: this.searchParam.start_station_id,
				start_station_name: this.searchParam.start_station_name,
				end_station_id: this.searchParam.end_station_id,
				end_station_name: this.searchParam.end_station_name,
				day_count: this.searchParam.day_count,
				flight: this.searchParam.flight,
				flight_start_date: this.searchParam.flight_start_date
			}
			this.$router.push({
				name: 'busReserve',
				query: bookParam
			})
			// Util.$router.push({
			// 	router:this.$router,
			// 	name:'busReserve',
			// 	query:bookParam
			// })
		},
		getParamStr(param) {
			// param.forEach(())
			let str = '';
			let arr = [];
			for (var key in param) {
				var val = param[key] ? param[key] : "";
				arr.push(key + '=' + val);
			}
			str += arr.join('&');
			return str;
		},
		seeBusImageClick(item) {
			Util.ZZLog('点击了cell的icon', item);
			if (item.img_cnt == '0') {
				this.$Message.warning('该车型暂无相关图片');
				return;
			}
			var data = {
				bus_ids: item.bus_id
			}
			Util.post({
				obj: this,
				url: '/booking/bus-list/get-bus-images',
				data: data,
				success: (res_data) => {
					Util.ZZLog(res_data);
					if (!res_data.flag) {
						this.$Message.warning(res_data.msg);
					} else {
						//						let data = res_data.data;
						//						this.$refs.bus_photo.photo_items = res_data.data.list;

						if (res_data.data.list.length > 0) {
							this.$refs.bus_photo.realimg = '';
							this.$refs.bus_photo.realimg = res_data.data.list[0].show;
							this.$refs.bus_photo.photo_items = res_data.data.list;
							this.$refs.bus_photo.photo_model = true;
						} else {
							this.$Modal.info({
								title: '温馨提示',
								content: '该车型暂无相关图片'
							});
						}

					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})

			//			this.$refs.bus_photo.photo_model = true;

		}
	}
}
</script>

<style scoped="scoped">
.left_title {
	font-family: PingFangSC;
	font-size: 12px;
	font-weight: 500;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	color: #333;
}

.sort_type {
	cursor: pointer;
}

.sort_type:hover {
	color: #ff9710;
}












/*价格的汉字颜色 改变*/

.sort_type:nth-child(3):hover {
	color: black;
}






/*上下箭头还原成黑色*/

.sort_type:nth-child(3):hover>div:first-child {
	color: #ff9710;
}



.component-fade-enter-active,
.component-fade-leave-active {
	transition: opacity .3s ease;
}

.component-fade-enter,
.component-fade-leave-to {
	opacity: 0;
}
</style>
