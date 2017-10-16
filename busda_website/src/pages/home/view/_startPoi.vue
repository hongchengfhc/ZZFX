<template>
	<div>
		<Input ref='s_input' placeholder="选择出发地" v-model="search_input" @on-change="inputChange" @on-focus="inputFocus" style="width: 215px;"></Input>
		<div v-show="this.switch == true">
			<div class="poi_box " :style="this.show_box==true&& this.close==false?'display:block':'display:none'">
				<div  @click="closeDidClick" style="color: #cccccc;font-size: 20px;position: absolute;right: 15px;top: 4px;cursor: pointer;">
					<Icon style="font-size:30px;" type="ios-close-empty" ></Icon>
				</div>
				<!--<div class="ub ub-f1" style="font-size: 14px;-webkit-transform:scale(0.8);margin-left: -48px;line-height: 1;	color: #999999;margin-top: 10px;">可输入城市商圈、景区 中文 / 拼音 / 简拼 查询</div>-->
				<div class="" style="font-size: 12px;line-height: 1;	color: #999999;margin-top: 10px;text-align: left;margin-left: 13px;">可输入城市商圈、景区 中文 / 拼音 / 简拼 查询</div>
				<!--<div class="" style="font-size: 14px;-webkit-transform:scale(0.8);-ms-transform: scale(0.8);margin-left: -48px;line-height: 1;	color: #999999;margin-top: 10px;text-align: left;">可输入城市商圈、景区 中文 / 拼音 / 简拼 查询</div>-->
				<div class="" style="margin: 15px 0;text-align: left;">
					<div style="display: inline-block;line-height: 21px;margin: 5px 0;" v-for="(item,index) in poi_list" class=" hightlight" :class="item.selected==true?'sel_city':'dis_city'" :key="item.id" @click="cityDidClick(item)">{{item.area_name}}</div>
				</div>
				<!--type类型-->
				<div class="" >
					<div v-for="(item,index) in info_list" :key="item.type_id" @click="typeDidClick(item)" class="" style="width: 50px;height: 30px;cursor: pointer;float: left;" :class="item.selected==true?'type_sel':'type_dis'">
						<div class="hightlight">{{item.name}}</div>
						<div class="type_border" :style="item.selected?'background:#ff9710':''"></div>
					</div>
				</div>
				<div style="height: 1px;background:  #cccccc;margin-top: -3px;margin-bottom: 12px;clear: both;"></div>
				<div style="text-align: left;">
					<div class="hightlight" v-for="(item,index) in station_list" :key="item.station_id" style="padding: 8px 8px;cursor: pointer;color: #666666;display: inline-block;" @click="stationDidClick(item)">{{item.area_name}}</div>
				</div>
			</div>
			<div class="poi_search" :style="this.show_box==false && this.close==false?'display:block':'display:none'">
				<!-- <div v-if="this.search_list.length == 0" class="ub ub-ac ub-pc" style="padding: 10px;">无相关结果</div> -->
				<div v-if="show_empty" class="" style="padding: 10px;text-align: center;">无相关结果</div>
				<div v-else v-for="(item,index) in search_list" style="font-size: 12px;padding: 5px 0;color: #333333;clear: both;display: table;width: 100%;" :key="item.station_id" @click="searchDidClick(item)" class="search_cell" :class="item.selected==true?'search_sel':'search_dis'">
					<div class="" style="padding-left: 10px;display: table-cell;vertical-align: middle;">{{item.full_name}}</div>
					<!--<Icon :style="item.selected==true?'display:block':'display:none'" type="ios-checkmark-empty" style="color: #FFFFFF;display: table;"></Icon>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'
	export default {
		props: {
			default_type: [String, Number]
		},
		data() {
			return {
				show_empty:false,
				search_input: '',
				poi_list: [],
				sel_city_id: '',
				info_list: [],

				sel_type_id: '',
				station_list: [],
				search_input: '',
				show_box: true,
				//			search_list: [{
				//				station_name: '上海市',
				//				station_id: '1',
				//				selected: false
				//			}, {
				//				station_name: '北京市',
				//				station_id: '2',
				//				selected: false
				//			}],
				search_list: [],
				search_input_sel: '',
				search_input_name: '',
				close: false,
				value: '',
				switch: false
			}
		},
		methods: {
			initData() {
				Util.post({
					obj: this,
					url: '/booking/bus-list/get-search-init',
					data: {
						bus_type: this.default_type,
						show_type: 'start'
					},
					success: (res_data) => {
						Util.ZZLog(res_data);
						if(!res_data.flag) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							//城市数组
							this.poi_list = data.city_list;
							this.poi_list.map((x, i) => {
								if(i == 0) {
									this.$set(x, 'selected', true);
								} else {
									this.$set(x, 'selected', false);
								}
							});
							//类型数组
							this.info_list = data.info_list;
							this.info_list.map((x, i) => {
								if(i == 0) {
									this.$set(x, 'selected', true);
									this.station_list = x.list;
								} else {
									this.$set(x, 'selected', false);
								}
								this.$set(x, 'type_id', i);
							})
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			//筛选城市
			cityDidClick(item) {
				this.poi_list.map(x => x.selected = false);
				item.selected = true;
				this.sel_city_id = item.id;

				Util.post({
					obj: this,
					url: '/booking/bus-list/get-county-by-city',
					data: {
						bus_type: this.default_type,
						city_id: this.sel_city_id,
						show_type: 'start'
					},
					success: (res_data) => {
						Util.ZZLog(res_data);
						if(!res_data.flag) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							this.info_list = data.list;
							this.info_list.map((x, i) => {
								if(i == 0) {
									this.$set(x, 'selected', true);
									this.station_list = x.list;
								} else {
									this.$set(x, 'selected', false);
								}
								this.$set(x, 'type_id', i);
							})
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			//筛选类型
			typeDidClick(item) {
				this.info_list.map(x => x.selected = false);
				item.selected = true;
				this.sel_type_id = item.type_id;
				this.station_list = item.list;
			},
			stationDidClick(item) {
				this.search_input = item.full_name;
				this.search_input_sel = item.id;
				this.search_input_name = item.full_name;
				this.close = true;
				this.$emit('poiName', item.id, item.full_name);
			},
			//搜索框的选中
			searchDidClick(item) {
				//				item.selected = true;
				//				this.search_input = '';
				this.search_input = item.full_name;
				this.$emit('poiName', item.id, item.full_name);
				this.search_input_sel = item.id;
				this.search_input_name = item.full_name;
				//				this.$refs.s_input.focus();
				this.close = true;
			},
			inputFocus() {
				this.search_list = [];
				this.switch = true;
				this.close = false;
				if(this.search_input == '') {
					this.show_box = true;
				} else {
					this.show_box = false;
					Util.post({
						obj: this,
						url: '/booking/bus-list/get-city',
						data: {
							bus_type: this.default_type,
							search_str: this.search_input,
							show_type: 'start'
						},
						success: (res_data) => {
							Util.ZZLog(res_data);
							if(!res_data.flag) {
								this.show_empty=false;
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								this.search_list = data.list;
								if(this.search_list.length != 0) {
									this.show_empty=false;
									this.search_list.map((x, i) => {
										if(x.id == this.search_input_sel) {
											this.$set(x, 'selected', true);
										} else {
											this.$set(x, 'selected', false);
										}
									})
								}else{
									this.show_empty=true;
								}
							}
						},
						error: () => {
							this.$Message.error(infoType.infoApiError);
						}
					})

				}
			},
			closeDidClick(){
				this.close = true;
			},
			inputChange() {
				this.close = false;
				if(this.search_input == '') {
					this.show_box = true;
				} else {
					this.show_box = false;
					Util.delay(() => {
						Util.post({
							obj: this,
							url: '/booking/bus-list/get-city',
							data: {
								bus_type: this.default_type,
								search_str: this.search_input,
								show_type: 'start'
							},
							success: (res_data) => {
								Util.ZZLog(res_data);
								if(!res_data.flag) {
									this.$Message.warning(res_data.msg);
								} else {
									let data = res_data.data;
									this.search_list = data.list;
									if(this.search_list.length==0){this.show_empty=true;}
									else{
										this.show_empty=false;
									}
									//								if(this.search_list.length!= 0){
									this.search_list.map((x, i) => {
										if(x.id == this.search_input_sel) {
											this.$set(x, 'selected', true);
										} else {
											this.$set(x, 'selected', false);
										}
									})
									//								}
								}
							},
							error: () => {
								this.$Message.error(infoType.infoApiError);
							}
						})
					}, 300);
				}
			},
		},
		mounted: function() {
			document.addEventListener('click', (e) => {
				if(!this.$el.contains(e.target)) {
					this.close = true;
				}
			})
			this.$nextTick(() => {
				this.initData();
			})
		}
	}
</script>

<style scoped>
	.hightlight:hover:not(.sel_city) {
		color: #ff9710 !important;
	}

	.poi_box {
		width: 550px;
		min-height: 300px;
		border-radius: 2px;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.3);
		position: absolute;
		z-index: 11;
		margin-top: 6px;
		margin-left: 0;
		padding: 20px;
		background: #FFFFFF;
	}

	.poi_search {
		width: 215px;
		height: 188px;
		border-radius: 2px;
		box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.3);
		position: absolute;
		z-index: 11;
		margin-top: 6px;
		margin-left: 0;
		text-align: left;
		overflow: auto;
		background: #FFFFFF;
	}

	.sel_city {
		width: 50px;
		height: 21px;
		background-color: #ff9710;
		color: #FFFFFF;
		text-align: center;
		font-size: 12px;
		cursor: pointer;
	}

	.dis_city {
		width: 50px;
		height: 21px;
		background-color: #ffffff;
		color: #666666;
		text-align: center;
		font-size: 12px;
		cursor: pointer;
	}

	.type_sel {
		font-size: 12px;
		/*line-height: 1.0;*/
		color: #ff9100;
	}

	.type_dis {
		font-size: 12px;
		/*line-height: 1.0;*/
		color: #b0b0b0;
	}

	.type_border {
		height: 1px;
		width: 100%;
		margin-top: 12px;
	}

	.search_cell:hover:not(.search_sel) {
		background-color: #eeeeee;
		/*height: 30px;*/
		/*padding: 8px 0;*/
	}

	.search_sel {
		background-color: #ff9710;
		color: #FFFFFF !important;
		/*display: block !important;*/
		/*height: 30px;*/
		/*padding: 8px 0;*/
	}
</style>
