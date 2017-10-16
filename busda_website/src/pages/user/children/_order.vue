<template>
<div>
	<!--我的订单-->
	<div style="padding: 28px 25px;overflow: auto;" class="">
		<div class="" v-for="(item,index) in order_type" @click="statusDidClick(item)" :key="item.order_type_id" style="width: 75px;margin-right: 55px;cursor: pointer;float: left;">
			<Badge class="badge" :count="item.order_count">
				<div style="font-size: 14px;" class="fonthover" :class="item.selected==true ? 'sel_status':'dis_status'">{{item.order_type_alias}}</div>
			</Badge>
		</div>
	</div>
	<div style="width: 950px;height: 45px;background: #fff4e7;margin-left: 25px;line-height: 45px;" class="">
		<div style="width: 340px;text-align: center;color: #666666;float: left;">车辆</div>
		<div style="width: 160px;text-align: center;color: #666666;float: left;">行程</div>
		<div style="width: 125px;text-align: center;color: #666666;float: left;">用车日期</div>
		<div style="width: 125px;text-align: center;color: #666666;float: left;">订单金额</div>
		<div style="width: 85px;text-align: center;color: #666666;float: left;">状态</div>
		<div style="width: 100px;text-align: center;color: #666666;float: left;">操作</div>
	</div>
	<div class="table" style="width: 950px;margin-top: 20px;margin-left: 25px;">
		<order-cell @cellClick="cellClick" @orderCancelSuccess="orderCancelSuccess" v-for="(cell_item,index) in order_list" :data="cell_item" :key="index"></order-cell>
	</div>
	<div class="" v-show="(page.total_count-0)==0" style="min-height:300px;font-size:16px;color:#999;border-top: 1px solid #EEEEEE;line-height: 300px;">暂无相关订单信息</div>
	<div class="" style="margin-right: 25px;margin-bottom: 40px;text-align: right;" v-show="(page.total_count-0)!=0">
		<Page @on-change="changePage" :total="parseInt(page.total_count)" show-elevator size="small"></Page>
	</div>
</div>
</template>

<script>
import Util from '../../../config/Util'
import infoType from '../../../config/infoType'
import orderCell from './_orderCell'
export default {
	data() {
		return {
			order_list: [],
			//查询的参数
			page: {
				current_page: 1,
				page_size: 10,
				total_page: 1,
				total_count: "0"
			},
			//
			order_type: [{
				order_type_id: '',
				order_type_alias: '全部订单',
				order_count: '0',
				selected: true
			}, {
				order_type_id: '0',
				order_type_alias: '等待支付',
				order_count: '0',
				selected: false
			}, {
				order_type_id: '1',
				order_type_alias: '派车中',
				order_count: '0',
				selected: false
			}, {
				order_type_id: '2',
				order_type_alias: '已派车',
				order_count: '0',
				selected: false
			}, {
				order_type_id: '3',
				order_type_alias: '已完成',
				order_count: '0',
				selected: false
			}, {
				order_type_id: '4',
				order_type_alias: '已取消',
				order_count: '0',
				selected: false
			}],
			sel_status: '',
			cell_item: {}
		}
	},
	components: {
		orderCell
	},
	beforeRouteEnter(to,from,next){
		next((vm)=>{
			vm.load();
		})
	},
	mounted() {
		this.load();
	},
	methods: {
		load(){
			Util.isLogin({
				obj: this,
				success: (userInfo, token) => {
					this.httpLoadInfo();
				},
				error: () => {
					this.$router.push({
						name:"home"
					})
				}
			})
		},
		httpLoadInfo() {
			Util.post({
				obj: this,
				url: '/order/get-orders',
				data: {
					current_page: this.page.current_page,
					page_size:this.page.page_size,
					status_id:this.sel_status
				},
				success: (res_data) => {
					Util.ZZLog(res_data);
					if (res_data.flag == false) {
						if(res_data.code==infoType.codeNotLogin){
							this.$router.push({
								name:"home"
							})
						}else{
							this.$Message.warning(res_data.msg);
						}
					} else {
						let data = res_data.data;
						let order_type_count = data.count_by_status;
						this.order_list = data.list;
						this.page = data.page;
						this.order_type.map(x=>{
							x.order_count=0;
						})
						for(var i=0;i<this.order_type.length;i++){
							if (i== 1 || i == 2 || i ==3) {
								this.order_type[i].order_count=order_type_count[i];
							}
						}

					}
				},
				error: () => {
					this.$Message.error(infoType.infoApiError);
				}
			})
		},
		statusDidClick(item) {
			this.order_type.map(x => x.selected = false);
			item.selected = true;
			this.sel_status = item.order_type_id;
			this.httpLoadInfo();
		},
		//点击单元格
		cellClick(item){
			this.$router.push({
				name:"orderDetail",
				query:{order_id:item.id}
			})
		},
		//分页的回调
		changePage(cur){
			this.page.current_page=cur;
			this.httpLoadInfo();
		},
		//cell的回调
		orderCancelSuccess(){
			this.httpLoadInfo();
		}
	}
}
</script>

<style>
.badge .ivu-badge-count {
	position: absolute;
	transform: translateX(50%);
	right: -10px;
	height: 16px;
	border-radius: 8px;
	width: 16px;
	border: 1px solid transparent;
	color: #fff;
	line-height: 14px;
	text-align: center;
	font-size: 12px;
	white-space: nowrap;
	transform-origin: -10% center;
	z-index: 10;
	box-shadow: 0 0 0 1px #fff;
	min-width: 16px;
	padding: 0;
	top:-6px
}
</style>

<style scoped>
.sel_status {
	font-weight: 600;
	color: #333333;
}

.dis_status {
	color: #666666;
}

.fonthover:hover{
	color: #333333;
}
</style>
