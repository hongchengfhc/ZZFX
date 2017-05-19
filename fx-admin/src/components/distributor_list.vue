<template>
	<div id="distributorDIV">
		<div class="iframe_box">
			<el-tabs v-model="top_type_name" type="card" @tab-click="top_tab_click">
				<el-tab-pane label="分销商列表" name="first"></el-tab-pane>
				<el-tab-pane label="分销商审核" name="second"></el-tab-pane>
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
				<div role="tabpanel" v-if="top_type_name=='first'">
					<div class="dis_search" style="text-align: left">
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
								<el-button @click="btn_search_user" size="small" icon="search" type="primary" style="float: right;">搜索</el-button>
								<el-button @click="btn_reset_user" size="small" type="warning" style="float: right;margin-right: 10px;">重置</el-button>
								<!--<button type="button" class="btn btn-primary float_r mar_r" onclick="btn_search_user()"><span class="glyphicon glyphicon-search"></span> 搜索</button>
								<button type="button" class="btn btn-warning float_r  mar_r" onclick="btn_reset_user()">重置</button>-->
							</div>

						</div>

					</div>
					<div class="dis_table">
						<el-table :data="user_list" style="width: 100%;text-align: left;">
							<el-table-column prop="wechat_name" min-width="110" label="名称"></el-table-column>
							<el-table-column prop="user_name" min-width="135" label="用户名">
								<template scope="scope">
									<el-input v-model="scope.row.user_name" @change="user_name_change" @blur="blur_user_name1(scope.row)" size="small" placeholder=""></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="fx_phone" min-width="130" label="手机号"></el-table-column>
							<el-table-column prop="reg_time" min-width="110" label="加入时间"></el-table-column>
							<el-table-column prop="remaining_sum" min-width="140" label="预付款账户余额"></el-table-column>
							<el-table-column prop="total_commission" width="110" label="累计佣金"></el-table-column>
							<el-table-column prop="available_commission" width="110" label="已经提线"></el-table-column>
							<el-table-column prop="fx_status" label="状态"></el-table-column>
							<el-table-column label="操作" min-width="260">
								<template scope="scope">
									<el-popover placement="left" width="400" trigger="click" @show="seeEticket(scope.row)">
										<div style="font-size: 16px;margin-top: 10px;padding-left: 10px;">分销二维码</div>
										<div style="text-align: center;margin-top: 5px;margin-bottom: 20px;">
											<img style="width: 185px;height: 185px;" src="../assets/base.png" v-if="fx_qrCode_img_src!=''" :src="fx_qrCode_img_src" />
										</div>
										<el-button size="small" slot="reference" type="info">查看二维码</el-button>
									</el-popover>

									<!--<el-button size="small" v-popover=fx_qrCode type="info" @click="seeEticket(scope.row)">查看二维码</el-button>-->
									<el-button size="small" type="success" @click="seeCommission(scope.row)">查看佣金</el-button>
									<el-button v-if="scope.row.fx_status_id==2" size="small" type="danger" @click="changeStatus(scope.row)">启用</el-button>
									<el-button v-else size="small" type="danger" @click="changeStatus(scope.row)">停用</el-button>

								</template>
							</el-table-column>
						</el-table>
					</div>
					<!--<div id="pageDivList" class="pageDiv"></div>-->
					<el-pagination v-if="user_list.length>0" style="text-align: right;margin-right: 30px;" @size-change="userPageSizeChange" @current-change="userPageCurrentChange" :current-page="current_page" :page-size="page_size" layout="prev, pager, next, jumper" :total="total_count">
					</el-pagination>
				</div>
				<div role="tabpanel" v-if="top_type_name=='second'">
					<div class="dis_search" style="text-align: left;">
						<div class="form-inline search_list_1">
							<span class="search_name">名称：</span>
							<div class="form-group">
								<el-input v-model="dis_wechat_name" size="small" placeholder="用户名"></el-input>
								<!--<input type="text" class="form-control" id="user_name" placeholder="用户名">-->
							</div>
							<span class="search_name">手机号：</span>
							<div class="form-group">
								<el-input v-model="dis_phone" size="small" placeholder="手机号"></el-input>
								<!--<input type="text" class="form-control" id="user_phone" placeholder="手机号">-->
							</div>
							<span class="search_name">开始时间：</span>
							<el-date-picker v-model="dis_start_date" size="small" @change="change_dis_date1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							<span class="search_name">结束时间：</span>
							<el-date-picker v-model="dis_end_date" size="small" @change="change_dis_date2" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
						</div>
						<div class="form-inline">
							<span class="search_name">审核状态：</span>
							<el-select v-model="select_dis_status" size="small" filterable placeholder="请选择">
								<el-option v-for="item in dis_status_list" :key="item.status_id" :value="item.status_id" :label="item.status_des">
								</el-option>
							</el-select>
							<!--<select class="form-control" id="dis_status" style="width: 152px;">
								<option value="">全部</option>
								<option value="1">审核未通过</option>
								<option value="2">审核通过</option>
								<option value="3">待审核</option>
							</select>-->
							<div class="form-group" id="btns" style="float: right;">
								<el-button @click="btn_search_dis" size="small" icon="search" type="primary" style="float: right;">搜索</el-button>
								<el-button @click="btn_reset_dis" size="small" type="warning" style="float: right;margin-right: 10px;">重置</el-button>
								<!--<button type="button" class="btn btn-primary float_r mar_r" :click="btn_search_dis()"><span class="glyphicon glyphicon-search"></span> 搜索</button>
								<button type="button" class="btn btn-warning float_r  mar_r" :click="btn_reset_dis()">重置</button>-->
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

			<!--二维码-->

			<!--<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-sm">
					<div class="modal-content" style="overflow: hidden;">
						<div style="font-size: 16px;margin-top: 10px;padding-left: 10px;">分销二维码</div>
						<div style="text-align: center;margin-top: 5px;margin-bottom: 20px;">
							<img id="eticket" style="width: 185px;height: 185px;" src="../assets/base.png" />
						</div>
					</div>
				</div>
			</div>-->

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

				//cache
				qr_code_img_cache: {},

				top_type_name: 'first',
				user_list: [],
				fx_list: [],
				user_wechat_name: '',
				user_phone: '',
				user_start_date: '',
				user_end_date: '',

				//dis
				select_dis_status: "",
				dis_status_list: [{
					status_id: "",
					status_des: "全部"
				}, {
					status_id: "1",
					status_des: "审核未通过"
				}, {
					status_id: "2",
					status_des: "审核通过"
				}, {
					status_id: "3",
					status_des: "待审核"
				}],
				dis_wechat_name: '',
				user_name1: "",
				user_name2: "",
				dis_phone: '',
				dis_start_date: '',
				dis_end_date: '',
				examine_current_page: 1,
				examine_total_count: 0,
				distributor_confirm_list: [],

				fx_qrCode_img_src: "",

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
				//				console.log(tab, event);
				//				if("first"==tab.name){
				//				}else if("second"==tab.name){
				//					
				//				}
			},
			userPageSizeChange(val) {
				console.log(`每页 $ {val}条`);
			},
			userPageCurrentChange(val) {
				this.current_page = val;
				this.userHttpData();
				console.log(`当前页: $ {val}`);
			},
			httpLoadInfo() {
				this.userHttpFirstData();
			},
			//初始化 分销商列表
			userHttpFirstData() {
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
						let page = data['page'];
						_this.total_count = page['total_count'] - 0;
					}
				}, function() {
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			userHttpData() {
				let wechat_name = this.user_wechat_name;
				let fx_phone = this.user_phone;
				let start_reg_time = this.user_start_date;
				let end_reg_time = this.user_end_date;
				let current_page = this.current_page;
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
			btn_search_user() {
				this.userHttpFirstData();
			},
			btn_reset_user() {
				this.user_wechat_name = "";
				this.user_phone = "";
				this.user_start_date = "";
				this.user_end_date = "";
				this.btn_search_user();
			},
			btn_search_dis() {},
			btn_reset_dis() {
				this.dis_wechat_name = "";
				this.dis_phone = "";
				this.dis_start_date = "";
				this.dis_end_date = "";
				this.btn_search_dis();
			},
			//查看二维码
			seeEticket(dict) {
				this.fx_qrCode_img_src='';
				let fx_uid = dict['fx_uid'];
				if(this.qr_code_img_cache.hasOwnProperty(fx_uid)) {
					this.fx_qrCode_img_src = this.qr_code_img_cache[fx_uid];
				} else {
					let data = {
						fx_uid
					};
					this.$http.post(AdminConfig.base_api + "user/fx-user/get-qr-code", data, {
						emulateJSON: true
					}).then(res => {
						let res_data = res['body'];
						Util.ZZLog(res_data);
						if(res_data['flag'] == false) {
							this.$message.warning(res_data['msg']);
						} else {
							let data = res_data['data'];
							this.fx_qrCode_img_src = data['qr_code'];
							this.qr_code_img_cache[fx_uid] = data['qr_code'];
						}
					}, () => {
						this.$message.error(AdminConfig.infoApiError);
					});
				}
			},
			//查看佣金详情
			seeCommission(dict) {
				let fx_uid = dict['fx_uid'];
				this.$router.push({
					name: "commission_details",
					query: {
						fx_uid
					}
				})
			},
			//停用 | 启用
			changeStatus(dict) {
				let fx_uid = dict['fx_uid'];
				let fx_status_id = dict['fx_status_id'];
				let data = {
					fx_uid,
					fx_status_id
				};
				let _this = this;
				this.$http.post(AdminConfig.base_api + "user/fx-user/change-fx-user", data, {
					emulateJSON: true
				}).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					if(res_data['flag'] == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						_this.userHttpData();
						_this.$message.success(AdminConfig.infoUpdateSuccess);
					}
				}, function() {
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			blur_user_name1(dict) {
				if(this.user_name1 == dict['user_name']) {
					return;
				}
				let user_name = this.user_name1;
				let fx_uid = dict['fx_uid'];
				let data = {
					fx_uid,
					user_name
				};
				Util.ZZLog(user_name, fx_uid);
				this.$http.post(AdminConfig.base_api + "user/fx-user/update-user-name", data, {
					emulateJSON: true
				}).then(res => {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					if(res_data['flag'] == false) {
						this.$message.warning(res_data['msg']);
					} else {
						this.$message.success(AdminConfig.infoUpdateSuccess);
					}
				}, () => {
					this.$message.error(AdminConfig.infoApiError);
				});
			},
			user_name_change(val) {
				this.user_name1 = val;
			},
			//审核
			blur_user_name2(dict) {
				let user_name = this.user_name2;
				let fx_uid = dict['fx_uid'];
				Util.ZZLog(user_name, fx_uid);
			},
			dis_user_name_change(val) {
				this.user_name1 = val;
			},
			//修改日期
			change_user_date1(val) {
				this.user_start_date = val;
			},
			change_user_date2(val) {
				this.user_end_date = val;
			},
			change_dis_date1(val) {
				this.dis_start_date = val;
			},
			change_dis_date2(val) {
				this.dis_end_date = val;
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../css/common/bootstrap.css";
	@import "../css/common/bootstrap-datetimepicker.min.css";
	@import "../css/common/module.css";
	@import "../css/distributor_list.css";
	.el-tabs__content {
		display: none!important;
		opacity: 0!important;
	}
	
	.el-date-editor.el-input {
		width: 149px;
	}
	
	.el-select {
		width: 149px;
	}
</style>