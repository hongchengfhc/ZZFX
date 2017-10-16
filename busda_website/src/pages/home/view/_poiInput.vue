<template>
	<div class="aaa">
		<div class="poi_input" style="text-align: left;overflow: hidden;display: table;">
			<div class="tag_class" ref="tag_div" id="id_tag" style="text-align: left;max-width: 150px;overflow: scroll;overflow-y: hidden;padding-top: 4px;">
				<Tag v-for="(item,index) in tags" :key="item.station_id" :name="index" closable class="tag_one" @on-close="tagClose" style="display: inline;">{{item.full_name}}</Tag>
			</div>
			<Input class="" ref="s_input" placeholder="可按顺序输入/选择多个目的地" v-model='search_input' @on-change="inputChange" @on-focus="inputFocus" style="display: table-cell"></Input>
		</div>
		<div v-show="this.switch == true">
			<div class="poi_box " :style="this.show_box==true&& this.close==false?'display:block':'display:none'">
				<div  @click="closeDidClick" style="color: #cccccc;font-size: 20px;position: absolute;right: 15px;top: 4px;cursor: pointer;">
					<Icon style="font-size: 30px;" type="ios-close-empty" ></Icon>
				</div>
				<div class="" style="font-size: 12px;line-height: 1;	color: #999999;margin-top: 10px;text-align: left;margin-left: 13px;">可输入城市商圈、景区 中文 / 拼音 / 简拼 查询</div>
				<!--<div class="ub ub-f1" style="font-size: 14px;-webkit-transform:scale(0.8);margin-left: -48px;line-height: 1;	color: #999999;margin-top: 10px;">可输入城市商圈、景区 中文 / 拼音 / 简拼 查询</div>-->
				<div class="" style="margin: 15px 0;text-align: left;">
					<div style="display: inline-block;line-height: 21px;margin: 5px 0;" v-for="(item,index) in poi_list" class="hightlight" :class="item.selected==true?'sel_city':'dis_city'" :key="item.poi_id" @click="cityDidClick(item)">{{item.area_name}}</div>
				</div>
				<!--type类型-->
				<div class="">
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
				<div v-if="this.search_list.length == 0" class="" style="padding: 10px;text-align: center;">无相关结果</div>
				<div v-else v-for="(item,index) in search_list" style="font-size: 12px;line-height: 1;padding: 8px 0;color: #333333;width: 100%;" :key="item.station_id" @click="searchDidClick(item)" class="search_cell">
					<div class="" style="padding-left: 10px;">{{item.full_name}}</div>
					<!--<Icon :style="item.selected==true?'display:block':'display:none'" type="ios-checkmark-empty" style="color: #ff9710;"></Icon>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'

	export default {
		data() {
			return {
				tags: [],
				id_ary: [],
				name_ary: [],
				poi_list: [],
				sel_city_id: '',
				info_list: [],
				sel_type_id: '',
				station_list: [],
				search_input: '',
				show_box: true,
				search_list: [],
				close: false,
				switch: false
			}
		},
		methods: {
			initData() {
				Util.post({
					obj: this,
					url: '/booking/bus-list/get-search-init',
					data: {
						bus_type: 1,
						show_type: 'end'
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
			tagClose(event, name) {
				this.tags.splice(name, 1);
				this.id_ary.splice(name, 1);
				this.name_ary.splice(name, 1);
				this.$emit('poiName', this.id_ary.join(','), this.name_ary.join(','));
				Util.delay(()=>{
					document.getElementById('id_tag').scrollLeft = (document.getElementById('id_tag').scrollWidth);
				},1);
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
						bus_type: 1,
						city_id: this.sel_city_id,
						show_type: 'end'
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
				this.tags.push(item);
				this.id_ary.push(item.id);
				this.name_ary.push(item.full_name);
				//				this.tags.unshift(item);
				//				this.name_ary.unshift(item.area_name);
				//				this.id_ary.unshift(item.id);
				this.$emit('poiName', this.id_ary.join(','), this.name_ary.join(','));
				Util.delay(()=>{
					document.getElementById('id_tag').scrollLeft = (document.getElementById('id_tag').scrollWidth);
				},1);
			},
			//搜索框的选中
			searchDidClick(item) {
				//				item.selected = true;
				this.search_input = '';
				//				this.tags.unshift(item);
				//				this.id_ary.unshift(item.id);

				this.tags.push(item);
				this.id_ary.push(item.id);
				this.name_ary.push(item.full_name);

				this.$refs.s_input.focus();
				this.$emit('poiName', this.id_ary.join(','), this.name_ary.join(','));
				Util.delay(()=>{
					document.getElementById('id_tag').scrollLeft = (document.getElementById('id_tag').scrollWidth);
				},1);
			},
			inputFocus() {
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
							bus_type: 1,
							search_str: this.search_input,
							show_type: 'end'
						},
						success: (res_data) => {
							Util.ZZLog(res_data);
							if(!res_data.flag) {
								this.$Message.warning(res_data.msg);
							} else {
								let data = res_data.data;
								this.search_list = data.list;
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
					Util.delay(()=>{
						Util.post({
							obj: this,
							url: '/booking/bus-list/get-city',
							data: {
								bus_type: 1,
								search_str: this.search_input,
								show_type: 'end'
							},
							success: (res_data) => {
								Util.ZZLog(res_data);
								if(!res_data.flag) {
									this.$Message.warning(res_data.msg);
								} else {
									let data = res_data.data;
									this.search_list = data.list;
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

<style type="text/css">
	.aaa .ivu-input:focus {
		border-color: #ffffff !important;
		outline: 0;
		box-shadow: 0 0 0 2px rgba(255, 151, 16, 0) !important;
	}
	.poi_input input{
		height: 28px;
	}
	.aaa .ivu-input {
		border: 1px solid #ffffff !important;
	}

	.aaa .ivu-tag .ivu-icon-ios-close-empty {
		display: inline-block;
		font-size: 14px;
		font-size: 20px \9;
		transform: scale(1.42857143) rotate(0deg);
		cursor: pointer;
		margin-left: 2px;
		color: #666;
		opacity: 0.66;
		position: relative;
		top: 1px;
	}
</style>
<style scoped="scoped">
	.hightlight:hover:not(.sel_city) {
		color: #ff9710 !important;
	}

	.poi_input {
		width: 215px;
		min-height: 32px;
		border-radius: 4px;
		border: solid 1px #d7dde4;
	}

	.poi_input:hover {
		border: solid 1px #ff9710;
	}

	.poi_input:focus {
		border: solid 1px #ff9710;
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
		color: #ff9710;
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

	.search_cell:hover {
		background-color: #eeeeee;
	}

	.tt input {
		border: 1px solid #ffffff !important;
	}

	.ivu-input {
		display: inline-block;
		width: 100%;
		height: 32px;
		line-height: 1.5;
		padding: 4px 7px;
		font-size: 12px;
		border: none !important;
		border-radius: 4px;
		color: #4a494a;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}

	input,
	input:active {
		border: none !important;
		box-shadow: none;
	}

	.ivu-input:focus {
		border: none !important;
		box-shadow: none !important;
	}

	.ivu-input:focus,
	.ivu-input:hover {
		border: none !important;
	}

	.ivu-tag {
		display: inline;
		height: 22px;
		line-height: 22px;
		margin: 2px 4px 2px 0;
		padding: 2px 8px;
		border: 1px solid #e3e8ee;
		border-radius: 3px;
		background: #f7f7f7;
		font-size: 12px;
		vertical-align: middle;
		opacity: 1;
		overflow: hidden;
		cursor: pointer;
		white-space: nowrap;
	}

	.tag_class::-webkit-scrollbar {
		/*display: none;*/
		height: 4px;
		background-color: #FFFFFF !important;
		color: #FFFFFF;
		/*-webkit-box-shadow:inset 0 0 4px rgba(0,0,0,0.2);*/
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
		border-bottom-left-radius: 6px;
	}
	/*::-ms-scrollbar{
		background: #CCCCCC;
		border-radius: 10px;
	}*/

	.tag_class::-webkit-scrollbar-thumb {
		background: #CCCCCC;
		border-radius: 10px;
	}
	/*::-ms-scrollbar-thumb{
		background: #CCCCCC;
		border-radius: 10px;
	}*/
	/*::scrollbar{
		background: #CCCCCC;
		border-radius: 10px;
	}*/
	.tag_one{
		transition: all 0.3s;
	}
	/*#id_tag{
		scrollbar-face-color: #ff9710;
		scrollbar: 10px;
		scrollbar-base-color: #ff9710;
	}*/
</style>
