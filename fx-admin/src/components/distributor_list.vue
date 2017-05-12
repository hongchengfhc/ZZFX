<template>
	<div id="distributorDIV">
		<div class="iframe_box">
			<el-tabs v-model="top_type_name" type="card" @tab-click="top_tab_click">
				<el-tab-pane label="分销商列表" name="first">分销商列表</el-tab-pane>
				<el-tab-pane label="分销商审核" name="second">分销商审核</el-tab-pane>
			</el-tabs>
			<!--<ul id="myTabs" class="nav nav-tabs" role="tablist">
				<li role="presentation" class="active" href="#distributor_list" data-toggle="tab">
					<a>分销商列表</a>
				</li>
				<li role="presentation" href="#distributor_check" data-toggle="tab">
					<a>分销商审核</a>
				</li>
			</ul>-->
			<div class="tab-content table_box">
				<div role="tabpanel" class="tab-pane active" id="distributor_list">
					<div class="dis_search">
						<div class="form-inline search_list_1">
							<span class="search_name">名称：</span>
							<div class="form-group">
								<el-input v-model="user_wechat_name" size="small" placeholder="用户名"></el-input>
								<!--<input type="text" class="form-control" id="user_name" placeholder="用户名">-->
							</div>
							<span class="search_name">手机号：</span>
							<div class="form-group">
								<el-input v-model="user_phone" size="small" placeholder="手机号"></el-input>
								<!--<input type="text" class="form-control" id="user_phone" placeholder="手机号">-->
							</div>
							<span class="search_name">开始时间：</span>
							<el-date-picker v-model="user_start_date" size="small" @change="change_user_date1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							<span class="search_name">结束时间：</span>
							<el-date-picker v-model="user_end_date" size="small" @change="change_user_date2" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
						</div>
						<div class="form-inline" style="text-align: right;">
							<div class="form-group" id="btns">
								<button type="button" class="btn btn-primary float_r mar_r" onclick="btn_search_user()"><span class="glyphicon glyphicon-search"></span> 搜索</button>
								<button type="button" class="btn btn-warning float_r  mar_r" onclick="btn_reset_user()">重置</button>
							</div>

						</div>

					</div>
					<div class="dis_table">
						<el-table :data="user_list" style="width: 100%;text-align: left;">
							<el-table-column prop="wechat_name" width="120" label="名称"></el-table-column>
							<el-table-column prop="user_name" width="120" label="用户名">
								<template scope="scope">
									<el-input v-model="scope.row.user_name" size="small" placeholder=""></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="fx_phone" width="130" label="手机号"></el-table-column>
							<el-table-column prop="reg_time" width="200" label="加入时间"></el-table-column>
							<el-table-column prop="remaining_sum" width="150" label="预付款账户余额"></el-table-column>
							<el-table-column prop="total_commission" width="110" label="累计佣金"></el-table-column>
							<el-table-column prop="available_commission" width="110" label="已经提线"></el-table-column>
							<el-table-column prop="fx_status" width="120" label="状态"></el-table-column>
							<el-table-column label="操作" width="300">
								<template scope="scope">
									<el-button size="small" type="info" @click="seeEticket(scope.row)">查看二维码</el-button>
									<el-button size="small" type="info" @click="seeCommission(scope.row)">查看佣金</el-button>
									<el-button v-if="scope.row.fx_status_id==2" size="small" type="info" @click="changeStatus(scope.row)">启用</el-button>
									<el-button v-else size="small" type="info" @click="changeStatus(scope.row)">停用</el-button>

								</template>
							</el-table-column>
						</el-table>
					</div>
					<div id="pageDivList" class="pageDiv"></div>
				</div>
				<div role="tabpanel" class="tab-pane" id="distributor_check">
					<div class="dis_search">
						<div class="form-inline search_list_1">
							<span class="search_name">名称：</span>
							<div class="form-group">
								<input type="text" class="form-control" id="user_name_dis" placeholder="用户名">
							</div>
							<span class="search_name">手机号：</span>
							<div class="form-group">
								<input type="text" class="form-control" id="user_phone_dis" placeholder="手机号">
							</div>
							<span class="search_name">开始时间：</span>
							<div class="form-group">
								<div class="input-group date form_date_start">
									<input class="form-control" size="16" type="text" id="start_date_dis" readonly>
									<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
								</div>
							</div>
							<span class="search_name">结束时间：</span>
							<div class="form-group">
								<div class="input-group date form_date_end">
									<input class="form-control" size="16" type="text" id="end_date_dis" readonly>
									<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
								</div>
							</div>
						</div>
						<div class="form-inline">
							<span class="search_name">审核状态：</span>
							<select class="form-control" id="dis_status" style="width: 152px;">
								<option value="">全部</option>
								<option value="1">审核未通过</option>
								<option value="2">审核通过</option>
								<option value="3">待审核</option>
							</select>
							<div class="form-group" id="btns" style="float: right;">
								<button type="button" class="btn btn-primary float_r mar_r" onclick="disSearchDidClick()"><span class="glyphicon glyphicon-search"></span> 搜索</button>
								<button type="button" class="btn btn-warning float_r  mar_r" onclick="disResetDidClick()">重置</button>
							</div>

						</div>

					</div>
					<div class="dis_table">
						<div class="table-responsive">
							<table class="table table-striped table-hover">
								<thead>
									<tr>
										<th>微信名称</th>
										<th>用户名</th>
										<th>手机号</th>
										<th>申请时间</th>
										<th>状态</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody id="examine_table_list">
									<!--<tr>
						                <td>小猛</td>
						                <td>1982178299</td>
						                <td>2017-02-22</td>
						                <td>
						                		<button type="button" class="btn btn-success btn-xs mar_r">已通过</button>
						                </td>
						                <td>
						                		<button type="button" class="btn btn-error btn-xs mar_r">已通过</button>
						                </td>
						             </tr>-->
								</tbody>
							</table>
						</div>
					</div>
					<div id="pageDivExamine" class="pageDiv"></div>
				</div>
			</div>

			<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-sm">
					<div class="modal-content" style="overflow: hidden;">
						<div style="font-size: 16px;margin-top: 10px;padding-left: 10px;">分销二维码</div>
						<div style="text-align: center;margin-top: 5px;margin-bottom: 20px;">
							<img id="eticket" style="width: 185px;height: 185px;" src="../assets/base.png" />
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import Util from '../libs/Util'
	import AdminConfig from '../common/admin-config'
	export default {
		name: "distributorDIV",
		data() {
			return {
				pickerOptions0: {},
				current_page: 1,
				page_size: 10,
				total_count: 0,

				top_type_name: 'first',
				user_list: [],
				fx_list: [],
				user_wechat_name: '',
				user_phone: '',
				user_start_date: '',
				user_end_date: '',

				no_info: "无查询结果",
				dialogFormVisible: false,
				formDict: {},
				formLabelWidth: "",
				loading: true //显示loading
			}
		}, //过滤器
		filters: {}, //钩子函数
		mounted: function() {
			this.$nextTick(function() {
				Util.delay(this.httpLoadInfo, AdminConfig.delayTime);
			})
		},
		methods: {
			top_tab_click(tab, event) {
				console.log(tab, event);
			},
			handleSizeChange(val) {
				console.log(`每页 $ {val}条`);
			},
			handleCurrentChange(val) {
				this.current_page = val;
				//				this.httpData();
				console.log(`当前页: $ {val}`);
			},
			httpLoadInfo() {
				this.firstReloadSupplierListData();
			},
			//初始化 分销商列表
			firstReloadSupplierListData() {
				let wechat_name = this.user_wechat_name;
				let fx_phone = this.user_phone;
				let start_reg_time = this.user_start_date;
				let end_reg_time = this.user_end_date;
				let current_page = 1;
				let data = {
					wechat_name,
					fx_phone,
					start_reg_time,
					end_reg_time,
					current_page,
					page_size: this.page_size
				}
				let _this = this;
				this.$http.post(AdminConfig.base_api + "user/fx-user/fx-user-list", data, {
					emulateJSON: true
				}).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					if(res_data['flag'] == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						_this.user_list = data['user_list'];
					}
				}, function() {
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			httpFirstData() {
				//				this.current_page = 1;
				//				let current_page = this.current_page;
				//				let page_size = this.page_size;
				//				let apply_user_name = this.apply_user_name;
				//				let apply_user_phone = this.apply_user_phone;
				//				let start_time = this.date1Val;
				//				let end_time = this.date2Val;
				//				let apply_status_id = this.apply_status_id;
				//				let data = {
				//					current_page,
				//					page_size,
				//					apply_user_name,
				//					apply_user_phone,
				//					start_time,
				//					end_time,
				//					apply_status_id
				//				};
				//				let _this = this;
				//				this.$http.post(AdminConfig.base_api + "order/order/get-apply-list", data, {
				//					emulateJSON: true
				//				}).then(function(res) {
				//					let res_data = res['body'];
				//					Util.ZZLog(res_data);
				//					_this.loading = false;
				//					if(res_data['flag'] == false) {
				//						_this.$message.warning(res_data['msg']);
				//					} else {
				//						let data = res_data['data'];
				//						let page = data['page'];
				//						_this.apply_listinfo = data['prod_list'];
				//						_this.total_count = parseInt(page['total_count']);
				//					}
				//				}, function() {
				//					_this.loading = false;
				//					_this.$message.error(AdminConfig.infoApiError);
				//				});
			},
			httpData() {
				//				let current_page = this.current_page;
				//				let page_size = this.page_size;
				//				let apply_user_name = this.apply_user_name;
				//				let apply_user_phone = this.apply_user_phone;
				//				let start_time = this.date1Val;
				//				let end_time = this.date2Val;
				//				let apply_status_id = this.apply_status_id;
				//				let data = {
				//					current_page,
				//					page_size,
				//					apply_user_name,
				//					apply_user_phone,
				//					start_time,
				//					end_time,
				//					apply_status_id
				//				};
				//				let _this = this;
				//				this.$http.post(AdminConfig.base_api + "order/order/get-apply-list", data, {
				//					emulateJSON: true
				//				}).then(function(res) {
				//					let res_data = res['body'];
				//					Util.ZZLog(res_data);
				//					_this.loading = false;
				//					if(res_data['flag'] == false) {
				//						_this.$message.warning(res_data['msg']);
				//					} else {
				//						let data = res_data['data'];
				//						let page = data['page'];
				//						_this.apply_listinfo = data['prod_list'];
				//						_this.total_count = parseInt(page['total_count']);
				//					}
				//				}, function() {
				//					_this.loading = false;
				//					_this.$message.error(AdminConfig.infoApiError);
				//				});
			},
			btn_search_user() {

			},
			btn_reset_user() {

			},
			seeEticket(dict) {

			},
			seeCommission(dict) {

			},
			changeStatus(dict) {

			},
			change_user_date1(val) {
				this.user_start_date = val;
			},
			change_user_date2(val) {
				this.user_end_date = val;
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../css/common/bootstrap.css";
	@import "../css/common/bootstrap-datetimepicker.min.css";
	@import "../css/common/module.css";
	@import "../css/distributor_list.css";
	.el-date-editor.el-input {
		width: 149px;
	}
	
	.el-select {
		width: 149px;
	}
</style>