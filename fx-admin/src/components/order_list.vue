<template>
	<div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" id="order_listDIV">
		<div class="iframe_box">
			<ul id="myTabs" class="nav nav-tabs" role="tablist">
				<li role="presentation" class="active" href="#order_list" data-toggle="tab">
					<a>订单列表</a>
				</li>
			</ul>
			<div class="tab-content table_box">
				<div role="tabpanel" class="tab-pane active order_list" id="order_list">
					<div class="dis_search" id="dis_search">
						<div class="form-inline search_list_1">
							<span class="search_name">订单编号：</span>
							<div class="form-group">
								<el-input v-model="order_id" size="small" placeholder="订单编号"></el-input>
							</div>
							<span class="search_name">订单类型：</span>
							<el-select v-model="select_order_type" size="small" filterable placeholder="请选择">
								<el-option v-for="item in order_type_list" :key="item.order_type_id" :value="item.order_type_id" :label="item.order_type_des">
								</el-option>
							</el-select>
							<span class="search_name">下单开始时间：</span>
							<el-date-picker v-model="start_time" @change="change1" size="small" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							<span class="search_name" id="">下单结束时间：</span>
							<el-date-picker v-model="end_time" @change="change2" size="small" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
						</div>
						<div class="form-inline">
							<span class="search_name">订单状态：</span>
							<el-select v-model="select_order_status" size="small" filterable placeholder="请选择">
								<el-option v-for="item in order_status_list" :key="item.order_status_id" :value="item.order_status_id" :label="item.order_status_des">
								</el-option>
							</el-select>
							<span class="search_name">结算开始时间：</span>
							<el-date-picker v-model="settlement_startday" size="small" @change="change3" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							<span class="search_name">结算结束时间：</span>
							<el-date-picker v-model="settlement_endday" size="small" @change="change4" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							<div class="form-group" id="btns" style="float: right;">
								<el-button @click="searchDidClick" size="small" icon="search" type="primary" style="float: right;">搜索</el-button>
								<el-button @click="resetDidClick" size="small" type="warning" style="float: right;margin-right: 10px;">重置</el-button>
							</div>

						</div>

					</div>
					<div class="dis_middle">
						<el-button type="danger" class="el-icon-document" size="small" @click="btn_export()">导出</el-button>
					</div>
					<div class="dis_table">
						<el-table v-loading.body="loading" :data="order_listinfo" stripe style="width: 100%;text-align: left;font-size:12px">
							<el-table-column prop="order_id" label="订单编号" width="85">
							</el-table-column>
							<el-table-column prop="create_order_time" label="预订时间" width="150">
							</el-table-column>
							<el-table-column prop="order_type_des" label="订单类型" width="85">
							</el-table-column>
							<el-table-column label="预订产品" width="300">
								<template scope="scope">
									<div v-text="scope.row.book_product"></div>
									<div style="color: darkgray;font-weight: 700;" v-text="scope.row.prod_des"></div>
								</template>
							</el-table-column>
							<el-table-column prop="total_money" :formatter="monty_format" label="支付金额" width="85">
							</el-table-column>
							<el-table-column prop="start_time" label="出发时间" width="150">
							</el-table-column>
							<el-table-column prop="contacts_name" label="联系人" width="175">
								<template scope="scope">
									<div v-text="scope.row.contacts_name"></div>
									<div v-text="scope.row.contacts_phone"></div>
									<div v-text="scope.row.contacts_ID"></div>
								</template>
							</el-table-column>
							<el-table-column prop="order_status_des" label="状态">
							</el-table-column>
							<el-table-column prop="pay_type_des" label="支付方式">
							</el-table-column>
							<el-table-column prop="order_come" label="订单来源">
								<template scope="scope">
									<div v-text="scope.row.order_come.come1"></div>
									<div v-text="scope.row.order_come.come2"></div>
								</template>
							</el-table-column>
							<el-table-column prop="" label="操作">-
								<template scope="scope">
									-
									<!--<el-button size="small" type="info" @click="clickDetail(scope.row)">佣金详情</el-button>-->
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: right;margin-right: 30px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current_page" :page-size="10" layout="prev, pager, next, jumper" :total="total_count">
					</el-pagination>
					<!--<div class="pageDiv"></div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../libs/Util'
	import AdminConfig from '../common/admin-config'
	import $ from 'jquery'
	export default {
		name: "order_listDIV",
		data() {
			return {
				pickerOptions0: {
					//					disabledDate(time) {
					//						return time.getTime() < Date.now() - 8.64e7;
					//					}
				},
				current_page: 1,
				page_size: 10,
				total_count:0,
				order_status_list: [],
				order_type_list: [],
				start_time: '',
				end_time: '',
				settlement_startday: '',
				settlement_endday: '',
				order_listinfo: [],
				no_info: "无查询结果",
				select_order_type: '',
				select_order_status: '',
				order_id: '',   //筛选条件
				loading:true    //加载loading
			}
		},
		//过滤器
		filters: {
			filterReplace: function(total_money) {
				return `￥${total_money}`;
			}
		},
		//钩子函数
		mounted: function() {
			this.$nextTick(function() {
				Util.delay(this.httpBaseInfo,AdminConfig.delayTime);
			})
		},
		//方法
		methods: {
			//处理
			monty_format(row,column){
				return 	"￥"+row.total_money;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.current_page = val;
				this.httpData();
				console.log(`当前页: ${val}`);
			},
			change1(val) {
				this.start_time = val;
			},
			change2(val) {
				this.end_time = val;
			},
			change3(val) {
				this.settlement_startday = val;
			},
			change4(val) {
				this.settlement_endday = val;
			},
			//配置页面参数基本信息
			httpBaseInfo() {
				let _this = this;
				this.$http.post(
					AdminConfig.base_api + "order/order/get-initialize", {}, { emulateJSON: true }
				).then(res => {
						let res_data = res.body;
						_this.loading=false;
						if(res_data['flag']==false){
							_this.$message.warning(res_data['msg']);
						}else{
							let data = res_data.data;
							
						Util.ZZLog('参数返回', data);
						_this.order_status_list = data.order_status_list,
							_this.order_type_list = data.order_type_list,
							_this.searchDidClick();
						
						}
						
					},
					error => {
						_this.$message.error(AdminConfig.infoApiError);
					})
				this.httpFirstData();
			},
			//搜索按钮的点击事件
			searchDidClick() {
				this.httpFirstData();
			},
			//第一次查询数据 (搜索按钮的点击查询)
			httpFirstData() {
				this.current_page = 1;
				let order_id = this.order_id;
				let order_type_id = this.select_order_type;
				let start_time = this.start_time;
				let end_time = this.end_time;
				let order_status_id = this.select_order_status;
				let settlement_startday = this.settlement_startday;
				let settlement_endday = this.settlement_endday;
				let data = {
					current_page: this.current_page,
					page_size: this.page_size,
					order_id,
					order_type_id,
					start_time,
					end_time,
					order_status_id,
					settlement_startday,
					settlement_endday
				}
				let urlstr = AdminConfig.base_api + 'order/order/get-order-list';
				let _this = this;
				this.$http.post(urlstr, data, { emulateJSON: true }
				).then(res => {
					let res_data = res.body;
					Util.ZZLog(res_data);
					_this.loading=false;
					if(res_data['flag'] == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data.data;
						let page = data.page;
						data.order_list.forEach((v,i)=>{
							var oc = v.order_come.split('<br/>');
							v.order_come = {come1:oc[0],come2:oc[1]};
						})
						this.order_listinfo = data.order_list;
						let totalpage = page.total_pages;
						this.total_count = parseInt(page['total_count']);
					}
				}, error => {
					_this.loading=false;
					_this.$message.error(AdminConfig.infoApiError);
				})
				},
			//分页查询数据
			httpData() {
				let order_id = this.order_id;
				let order_type_id = this.select_order_type;
				let start_time = this.start_time;
				let end_time = this.end_time;
				let order_status_id = this.select_order_status;
				let settlement_startday = this.settlement_startday;
				let settlement_endday = this.settlement_endday;
				let data = {
					current_page: this.current_page,
					page_size: this.page_size,
					order_id,
					order_type_id,
					start_time,
					end_time,
					order_status_id,
					settlement_startday,
					settlement_endday
				}
				let urlstr = AdminConfig.base_api + 'order/order/get-order-list';
				let _this = this;
				this.$http.post(urlstr, data, { emulateJSON: true }).then(res => {
					let res_data = res.body;
					Util.ZZLog(res_data);
					_this.loading=false;
					if(res_data.flag == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data.data;
						let page = data.page;
						_this.order_listinfo=[];
						data.order_list.forEach((v,i)=>{
							var oc = v.order_come.split('<br/>');
							v.order_come = {come1:oc[0],come2:oc[1]};
						})
						_this.order_listinfo = data.order_list;
					}
				}, error => {
					_this.loading=false;
					_this.$message.error(AdminConfig.infoApiError);
				})
			},
			//重置按钮
			resetDidClick() {
				this.order_id = '';
				this.select_order_type = '';
				this.select_order_status = '';
				this.settlement_startday = '';
				this.settlement_endday = '';
				this.start_time = '';
				this.end_time = '';
				this.httpFirstData();
			},
			//导出
			btn_export(){
				this.$router.push({
					name:"commission_details",
					query:{
						fx_uid:22
					}
				})
			}
			,
			//取消订单
			cancelDidClick(dict) {
				let urlstr = AdminConfig.base_api + 'order/order/cancel';
				let data = { order_id: dict.order_id };
				let _this = this;
				comfirm('确定取消当前订单？', () => {
					this.$http.post(urlstr, data, { emulateJSON: true }).then(res => {
						let res_data = res.body;
						Util.ZZLog(res_data);
						if(res_data['flag'] == false) {
							_this.$message.warning(res_data['msg'])
						} else {
							_this.$message.success(AdminConfig.infoCancelSuccess);
							this.httpData();
						}
					}, error => {
						_this.$message.error(AdminConfig.infoApiError);
					})
				})
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../css/common/bootstrap.css";
	@import "../css/common/bootstrap-datetimepicker.min.css";
	@import "../css/common/module.css";
	@import "../css/order_list.css";
	#order_list {
		text-align: left;
	}
	
	.el-date-editor.el-input {
		width: 149px;
	}
	
	.el-select {
		width: 149px;
	}
</style>