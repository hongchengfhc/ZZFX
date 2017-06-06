<template>
	<div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" id="commissionDIV">
		<div class="iframe_box">
			<el-tabs type="border-card">
				<el-tab-pane label="佣金明细">
					<div role="tabpanel" class="tab-pane active" id="commission_detail">
						<div class="dis_search" style="text-align: left;">
							<div class="form-inline search_list_1">
								<span class="search_name">订单编号：</span>
								<div class="form-group">
									<el-input v-model="order_id" size="small" placeholder="订单编号"></el-input>
									<!--<input v-model="order_id" type="text" class="form-control" placeholder="订单编号">-->
								</div>
								<span class="search_name">订单类型：</span>
								<div class="form-group">
									<el-select v-model="select_order_type" size="small" filterable placeholder="请选择">
										<el-option v-for="item in order_type_list" :key="item.order_type_id" :value="item.order_type_id" :label="item.order_type_des">
										</el-option>
									</el-select>
								</div>
								<span class="search_name">下单开始时间：</span>
								<el-date-picker v-model="date1Val" @change="change1" size="small" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
								<span class="search_name">下单结束时间：</span>
								<el-date-picker v-model="date2Val" @change="change2" size="small" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							</div>
							<div class="form-inline">
								<span class="search_name">订单状态：</span>
								<div class="form-group">
									<!--<select id="order-status-select" v-model="select_status" @change="order_status_change" class="form-control" style="width: 151px;">
									<option v-for="item in order_status_list" v-bind:value="item.order_status_id" v-text="item.order_status_id"></option>
								</select>-->
									<el-select v-model="select_status" size="small" filterable placeholder="请选择">
										<el-option v-for="item in order_status_list" :key="item.order_status_id" :value="item.order_status_id" :label="item.order_status_des">
										</el-option>
									</el-select>
								</div>
								<span class="search_name">结算开始时间：</span>
								<el-date-picker v-model="date3Val" size="small" @change="change3" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
								<span class="search_name">结算结束时间：</span>
								<el-date-picker v-model="date4Val" size="small" @change="change4" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>

								<el-button @click="btn_search" size="small" icon="search" type="primary" style="float: right;">搜索</el-button>
								<el-button @click="btn_reset" size="small" type="warning" style="float: right;margin-right: 10px;">重置</el-button>
							</div>
						</div>
						<!--dis_search end-->
						<div class="dis_middle">
							<el-button type="danger" @click="btn_export" class="el-icon-document" size="small">导出</el-button>
						</div>
						<div class="dis_table">
							<el-table :data="prod_list" style="width: 100%;text-align: left;">
								<el-table-column prop="order_id" label="订单编号">
								</el-table-column>
								<el-table-column prop="order_type_des" label="订单类型">
								</el-table-column>
								<el-table-column prop="create_order_date" label="下单时间" width="180">
								</el-table-column>
								<el-table-column prop="order_price" label="订单金额">
								</el-table-column>
								<el-table-column prop="order_status_des" label="订单状态">
								</el-table-column>
								<el-table-column prop="settlement_order_date" label="结算时间">
								</el-table-column>
								<el-table-column prop="all_commission_money" label="合计佣金">
								</el-table-column>
								<el-table-column prop="" label="操作">
									<template scope="scope">
										<el-button size="small" type="info" @click="clickDetail(scope.row)">佣金详情</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!--dis_table end-->
						<el-pagination style="text-align: right;margin-right: 30px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current_page" :page-size="10" layout="prev, pager, next, jumper" :total="total_count">
						</el-pagination>
					</div>

				</el-tab-pane>
			</el-tabs>

		</div>
		<el-dialog title="佣金详情" style="text-align: left;" v-model="dialog_show_flag">
			<el-table :data="detail_list" style="text-align: left;">
				<el-table-column property="prod_name" label="商品名称" width="150"></el-table-column>
				<el-table-column property="prod_single_price" label="单价(元)" width="200"></el-table-column>
				<el-table-column property="prod_count" label="数量"></el-table-column>
				<el-table-column property="commission" label="佣金(元)"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	import Util from '../libs/Util'
	import AdminConfig from '../common/admin-config'

	export default {
		name: "commissionDIV",
		data() {
			return {
				pickerOptions0: {
					//					disabledDate(time) {
					//						return time.getTime() < Date.now() - 8.64e7;
					//					}
				},
				current_page: 1,
				page_size: 10,
				total_count: 0,
				order_type_list: [],
				order_status_list: [],
				select_order_type: "",
				select_status: "",
				prod_list: [],
				order_id: "",
				date1Val: "",
				date2Val: "",
				date3Val: "",
				date4Val: "",
				detail_list: [],
				no_info: "无查询结果",
				dialog_show_flag: false,
				loading: true, //加载 loading
				fx_uid: 0
			}
		},
		//过滤器
		filters: {

		},
		//钩子函数
		mounted: function() {
			this.$nextTick(function() {
				Util.delay(this.httpLoadInfo, AdminConfig.delayTime);
			})
		},
		beforeRouteEnter(to, from, next) {
			console.log(to, from, next, this);
			next((vm) => {
				vm.btn_search();
			})
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.current_page = val;
				this.httpData();
				console.log(`当前页: ${val}`);
			},
			change1(val) {
				this.date1Val = val;
			},
			change2(val) {
				this.date2Val = val;
			},
			change3(val) {
				this.date3Val = val;
			},
			change4(val) {
				this.date4Val = val;
			},
			httpLoadInfo() {
				let _this = this;
				let data = {
					fx_uid: this.fx_uid
				}
				this.$http.post(
					AdminConfig.base_api + "order/order/get-initialize", data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					this.loading = false;
					if(res_data['flag'] == false) {
						this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						Util.ZZLog(res_data);
						this.order_type_list = data['order_type_list'];
						this.order_status_list = data['order_status_list'];
						this.btn_search();
					}

				}, function() {
					this.loading = false;
					this.$message.error(AdminConfig.infoApiError);
				});
				this.httpFirstInfo();
			},
			httpFirstInfo() {
				this.current_page = 1;
				this.fx_uid = Util.getPar('fx_uid')
				let fx_uid = this.fx_uid;
				let order_id = this.order_id;
				let order_type_id = this.select_order_type;
				let order_status_id = this.select_status;
				let create_order_start_date = this.date1Val;
				let create_order_end_date = this.date2Val;
				let settlement_start_date = this.date3Val;
				let settlement_end_date = this.date4Val;
				let data = {
					current_page: this.current_page,
					page_size: this.page_size,
					fx_uid,
					order_id,
					order_type_id,
					order_status_id,
					create_order_start_date,
					create_order_end_date,
					settlement_start_date,
					settlement_end_date
				};

				Util.ZZLog(AdminConfig.base_api + "order/order/get-commission-list", JSON.stringify(data));
				this.$http.post(
					AdminConfig.base_api + "order/order/get-commission-list", data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					this.loading = false;
					if(res_data['flag'] == false) {
						this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						let page = data['page'];
						this.total_count = parseInt(page['total_count']);
						let prod_list = data['prod_list'];
						this.prod_list = prod_list;
						//分页控件
					}

				}, function() {
					this.loading = false;
					this.$message.error(AdminConfig.infoApiError);
				});
			},
			httpData() {
				let fx_uid = this.fx_uid;
				let order_id = this.order_id;
				let order_type_id = this.select_order_type;
				let order_status_id = this.select_status;
				let create_order_start_date = this.date1Val;
				let create_order_end_date = this.date2Val;
				let settlement_start_date = this.date3Val;
				let settlement_end_date = this.date4Val;
				let data = {
					current_page: this.current_page,
					page_size: this.page_size,
					fx_uid,
					order_id,
					order_type_id,
					order_status_id,
					create_order_start_date,
					create_order_end_date,
					settlement_start_date,
					settlement_end_date
				};

				Util.ZZLog(AdminConfig.base_api + "order/order/get-commission-list", JSON.stringify(data));
				this.$http.post(
					AdminConfig.base_api + "order/order/get-commission-list", data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					this.loading = false;
					if(res_data['flag'] == false) {
						this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						let page = data['page'];
						let prod_list = data['prod_list'];
						this.prod_list = prod_list;
					}
				}, function() {
					this.loading = false;
					this.$message.error(AdminConfig.infoApiError);
				});
			},
			btn_search() {
				this.httpFirstInfo();
			},
			btn_reset() {
				this.date1Val = "";
				this.date2Val = "";
				this.date3Val = "";
				this.date4Val = "";
				this.order_id = "";
				this.select_order_type = "";
				this.select_status = "";
				this.btn_search();
			},
			btn_export() {
				console.log('export');
				this.$router.push({
					name: "order_list"
				})
			},
			clickDetail(item) {
				let order_id = item['order_id'];
				let data = {
					order_id
				};
				Util.ZZLog(AdminConfig.base_api + 'order/order/get-commission-detail', JSON.stringify(data));
				this.$http.post(
					AdminConfig.base_api + 'order/order/get-commission-detail', data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res.body;
					Util.ZZLog(res_data);
					if(false == res_data['flag']) {
						this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						this.detail_list = data['detail'];
						this.dialog_show_flag = true;
					}
				}, function() {

					this.$message.error(AdminConfig.infoApiError);
				});

			}
		}
	}
</script>

<style scoped>
	/*require("css/common/bootstrap.css")
require("css/common/bootstrap-datetimepicker.min.css")
require("css/common/module.css")*/
	/*require("css/commission_details.css")*/
	
	@import "../css/common/bootstrap.css";
	@import "../css/common/bootstrap-datetimepicker.min.css";
	@import "../css/common/module.css";
	@import "../css/commission_details.css";
	.el-date-editor.el-input {
		width: 149px;
	}
	
	.el-select {
		width: 149px;
	}
	/*@import url("../css/common/bootstrap.css");
@import url("../css/common/bootstrap-datetimepicker.min.css");
@import url("../css/common/module.css");
@import url("../css/common/common.css");*/
</style>