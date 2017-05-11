<template>
	<div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" id="withdrawalDIV">
		<div class="iframe_box">
			<ul id="myTabs" class="nav nav-tabs" role="tablist">
				<li role="presentation" class="active" href="#money_list" data-toggle="tab">
					<a>提现申请列表</a>
				</li>
			</ul>
			<div class="tab-content table_box">
				<div role="tabpanel" class="tab-pane active" id="money_list">
					<div class="dis_search" style="text-align: left;">
						<div class="form-inline search_list_1">
							<span class="search_name">名称：</span>
							<div class="form-group">
								<el-input v-model="apply_user_name" size="small" placeholder="用户名"></el-input>
								<!--<input type="text" class="form-control" id="apply_user_name" placeholder="用户名">-->
							</div>
							<span class="search_name">手机号：</span>
							<div class="form-group">
								<el-input v-model="apply_user_phone" size="small" placeholder="手机号"></el-input>
								<!--<input type="text" class="form-control" id="apply_user_phone" placeholder="手机号">-->
							</div>
							<span class="search_name">开始时间：</span>
							<el-date-picker v-model="date1Val" size="small" @change="change1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>

							<span class="search_name">结束时间：</span>
							<el-date-picker v-model="date2Val" size="small" @change="change2" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>

						</div>
						<div class="form-inline">
							<span class="search_name">状态：</span>
							<div class="form-group">
								<el-select v-model="apply_status_id" size="small" filterable placeholder="请选择">
									<el-option v-for="item in apply_status_list" :key="item.apply_status_id" :value="item.apply_status_id" :label="item.apply_status_des">
									</el-option>
								</el-select>
							</div>
							<!--<select class="form-control sel_width" id="apply_status">-->
							<!--<option is="apply_status_item" v-for="item in apply_status_list" v-bind:item="item"></option>-->
							<!--<option value="">全部</option>
						        <option value="">待处理</option>
						        <option value="">已审核</option>-->
							<!--</select>-->
							<div class="form-group" id="btns" style="float: right;">
								<el-button @click="searchDidClick" size="small" icon="search" type="primary" style="float: right;">搜索</el-button>
								<el-button @click="resetDidClick" size="small" type="warning" style="float: right;margin-right: 10px;">重置</el-button>
								<!--<button type="button" class="btn btn-primary float_r mar_r" v-on:click="searchDidClick"><span class="glyphicon glyphicon-search"></span> 搜索</button>
								<button type="button" class="btn btn-warning float_r  mar_r" v-on:click="resetDidClick">重置</button>-->
							</div>
						</div>

					</div>
					<div class="dis_table">
						<el-table :data="apply_listinfo" style="width: 100%;text-align: left;">
							<el-table-column prop="apply_user_name" label="名称"></el-table-column>
							<el-table-column prop="apply_user_phone" label="手机号"></el-table-column>
							<el-table-column prop="apply_money" label="提现金额"></el-table-column>
							<el-table-column prop="open_id" style="width: 1000px;" label="收款帐号/开户行/openID"></el-table-column>
							<el-table-column prop="apply_style_des" label="提现方式"></el-table-column>
							<el-table-column prop="apply_status_des" label="状态"></el-table-column>
							<el-table-column prop="apply_create_time" label="申请时间"></el-table-column>
							<el-table-column prop="" label="操作">
								<template scope="scope">
									<!--<el-button size="small" v-if="apply_status_id == 1" type="info" @click="adoptDidClick(scope.row)">审核</el-button>-->
									<el-button size="small" v-if="scope.row.apply_status_id==1" type="info" @click="adoptDidClick(scope.row)">审核</el-button>
									<span v-else>-</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!--dis_table end-->
					<el-pagination v-if="apply_listinfo.length>0" style="text-align: right;margin-right: 30px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current_page" :page-size="10" layout="prev, pager, next, jumper" :total="total_count">
					</el-pagination>
					<!--<div class="pageDiv"></div>-->
				</div>
			</div>
		</div>

		<!-- 大模态框 提现申请审核-->
		<el-dialog title="提现申请审核" v-model="dialogFormVisible">
			<div class="form-group div_center" dict="">
				<div class="form-inline div_class_info">
					<span class="div_name">申请提现金额：</span>
					<span class="div_content" id="div_price">500元</span>
				</div>
				<div class="form-inline div_class_info">
					<span class="div_name">收款人账户：</span>
					<span class="div_content" id="div_username">张三</span>
				</div>
				<div class="form-inline div_class_info">
					<span class="div_name">openID：</span>
					<span class="div_content" id="div_open_id">115135135</span>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="div_right()">确 定</el-button>
			</div>
			<!--<div class="newpro_bottom text_c mar_b">
				<button type="button" class="btn btn-default mar_r" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="div_right">通过</button>
			</div>-->

		</el-dialog>

		<div id="div_class" class="modal fade bs-example-modal-sm " tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content div_class" style="overflow: hidden;">
					<div class="div_class_apply div_class_title">提现申请审核</div>
					<div class="form-group div_center" dict="">
						<div class="form-inline div_class_info">
							<span class="div_name">申请提现金额：</span>
							<span class="div_content" id="div_price">500元</span>
						</div>
						<div class="form-inline div_class_info">
							<span class="div_name">收款人账户：</span>
							<span class="div_content" id="div_username">张三</span>
						</div>
						<div class="form-inline div_class_info">
							<span class="div_name">openID：</span>
							<span class="div_content" id="div_open_id">115135135</span>
						</div>
					</div>
					<div class="newpro_bottom text_c mar_b">
						<button type="button" class="btn btn-default mar_r" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="div_right">通过</button>
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
		name: "withdrawalDIV",
		data() {
			return {
				pickerOptions0: {},
				current_page: 1,
				page_size: 10,
				total_count: 0,
				apply_status_list: [],
				apply_listinfo: [],
				apply_user_name: "", //名称
				apply_user_phone: "", //手机号
				date1Val: "",
				date2Val: "",
				apply_status_id: "", //状态
				no_info: "无查询结果",
				dialogFormVisible: false,
				formDict: {},
				formLabelWidth: "",
				loading:true    //显示loading
			}
		},
		//过滤器
		filters: {

		},
		//钩子函数
		mounted: function() {
			this.$nextTick(function() {
				Util.delay(this.httpLoadInfo,AdminConfig.delayTime);
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
			httpLoadInfo() {
				let _this = this;
				this.$http.post(
					AdminConfig.base_api + "order/order/apply-base-type", {}, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					if(res_data['flag'] == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						_this.apply_status_list = data['apply_status_list'];
						_this.searchDidClick();
					}
				}, function() {
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			httpFirstData() {
				this.current_page = 1;
				let current_page = this.current_page;
				let page_size = this.page_size;
				let apply_user_name = this.apply_user_name;
				let apply_user_phone = this.apply_user_phone;
				let start_time = this.date1Val;
				let end_time = this.date2Val;
				let apply_status_id = this.apply_status_id;
				let data = {
					current_page,
					page_size,
					apply_user_name,
					apply_user_phone,
					start_time,
					end_time,
					apply_status_id
				};
				let _this = this;
				this.$http.post(
					AdminConfig.base_api + "order/order/get-apply-list", data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					_this.loading=false;
					if(res_data['flag'] == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						let page = data['page'];
						_this.apply_listinfo = data['prod_list'];
						_this.total_count = parseInt(page['total_count']);
					}

				}, function() {
					_this.loading=false;
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			httpData() {
				let current_page = this.current_page;
				let page_size = this.page_size;
				let apply_user_name = this.apply_user_name;
				let apply_user_phone = this.apply_user_phone;
				let start_time = this.date1Val;
				let end_time = this.date2Val;
				let apply_status_id = this.apply_status_id;
				let data = {
					current_page,
					page_size,
					apply_user_name,
					apply_user_phone,
					start_time,
					end_time,
					apply_status_id
				};
				let _this = this;
				this.$http.post(
					AdminConfig.base_api + "order/order/get-apply-list", data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					_this.loading=false;
					if(res_data['flag'] == false) {
						_this.$message.warning(res_data['msg']);
					} else {
						let data = res_data['data'];
						let page = data['page'];
						_this.apply_listinfo = data['prod_list'];
						_this.total_count = parseInt(page['total_count']);
					}
				}, function() {
					_this.loading=false;
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			adoptDidClick(dict) {
				this.formDict = dict;
				Util.ZZLog(dict);
				this.dialogFormVisible = true;
			},
			div_right() {
				var dict = this.formDict;
				var data = {
					apply_id: dict.apply_id
				};
				var _this = this;
				this.$http.post(
					AdminConfig.base_api + "order/order/through-apply", data, {
						emulateJSON: true
					}
				).then(function(res) {
					let res_data = res['body'];
					Util.ZZLog(res_data);
					if(res_data.flag == false) {
						_this.$message.warning(res_data.msg);
					} else {
						_this.httpData();
						this.dialogFormVisible = false;
					}
				}, function() {
					_this.$message.error(AdminConfig.infoApiError);
				});
			},
			change1(val) {
				this.date1Val = val;
			},
			change2(val) {
				this.date2Val = val;
			},
			searchDidClick() {
//				this.loading=true;
				this.httpFirstData();
			},
			resetDidClick() {
				this.apply_user_name = ""; //名称
				this.apply_user_phone = ""; //手机号
				this.date1Val = "";
				this.date2Val = "";
				this.apply_status_id = ""; //状态
				this.httpFirstData();
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../css/common/bootstrap.css";
	@import "../css/common/bootstrap-datetimepicker.min.css";
	@import "../css/common/module.css";
	@import "../css/withdrawal_list.css";
	.el-date-editor.el-input {
		width: 149px;
	}
	
	.el-select {
		width: 149px;
	}
</style>