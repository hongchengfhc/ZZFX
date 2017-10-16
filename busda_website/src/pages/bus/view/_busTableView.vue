<template>
<div class="tableView">
	<div class="table" style="background:#fff;text-align:left;">
		<div class="" style="height:58px;">
			<div class="ib">
				<div class="left_title ib" style="margin-left:65px;padding:20px 0;color:#333;font-weight:600;">排序</div>
				<div class="ib sort_type" @click="btnSortClick(1)" :style="currentSort==enumSortType.enumSortDefault?'color:#ff9910;':''" style="margin-left:52px;color:#333;">默认</div>
				<div class="ib sort_type" @click="btnSortClick(2)" :style="currentSort==enumSortType.enumSortPriceUp || currentSort==enumSortType.enumSortPriceDown ?'color:#ff9910;':''" style="margin-left:47px;color:#333;">
					<div class="ib" style="">价格</div>
					<Icon style="font-size:20px;padding-left:8px;" v-show="currentSort!=enumSortType.enumSortPriceDown" type="ios-arrow-thin-up"></Icon>
					<Icon style="font-size:20px;padding-left:8px;" v-show="currentSort==enumSortType.enumSortPriceDown" type="ios-arrow-thin-down"></Icon>
					<!-- <Icon style="font-size:20px;padding-left:8px;" type="ios-arrow-thin-down"></Icon> -->
				</div>
				<div class="ib sort_type" @click="btnSortClick(3)" :style="currentSort==enumSortType.enumSortAgeUp || currentSort==enumSortType.enumSortAgeDown?'color:#ff9910;':''" style="margin-left:43px;color:#333;">
					<div class="ib" style="">车龄</div>
					<Icon style="font-size:20px;padding-left:8px;" v-show="currentSort!=enumSortType.enumSortAgeDown" type="ios-arrow-thin-up"></Icon>
					<Icon style="font-size:20px;padding-left:8px;" v-show="currentSort==enumSortType.enumSortAgeDown" type="ios-arrow-thin-down"></Icon>
				</div>
			</div>
			<div class="ib ib-pe" style="margin-right:40px;color:#999;float:right;line-height:58px;">共{{page.total_count}}个结果</div>
		</div>
		<div class="table_list">
			<cell-view @bookClick="bookClick" @seeBusImageClick="seeBusImageClick" v-for="(item,index) in busList" :item="item" :key="index"></cell-view>
		</div>
		<div class="" v-show="(page.total_count-0)==0" style="min-height:300px;line-height:300px;text-align:center;font-size:16px;color:#999;border-top: 1px solid #EEEEEE;">暂无符合条件的车辆，请试试换个条件查询</div>
	</div>
	<Page v-if="(page.total_count-0)!=0" style="padding-top:33px;padding-bottom:67px;" @on-change="changePage" :current="(page.current_page-0)" :total="(page.total_count-0)" size="small"></Page>
	<div v-else style="height: 128px;"></div>
</div>
</template>

<script>
import Util from '../../../config/Util'
import cellView from './_cell.vue'

export default {
	name: "busTable",
	components: {
		cellView
	},
	props: {
		busList: [Array],
		page:[Object]
	},
	data() {
		return {
			enumSortType: {
				enumSortDefault: 1,
				enumSortPriceUp: 2,
				enumSortPriceDown: 3,
				enumSortAgeUp: 4,
				enumSortAgeDown: 5
			},
			currentSort: 1
		}
	},
	mounted() {
		this.setSortTypeDefault();
	},
	methods: {
		setSortTypeDefault(){
			this.currentSort = this.enumSortType.enumSortDefault;
		},
		/* ============================================表格的协议方法======================================================== */
		changePage(selectPage) {
			this.page.current_page = selectPage;
			this.$emit('changePage', selectPage);
		},
		//头部筛选的回调函数
		btnSearchClick() {

		},
		//cell的回调函数
		bookClick(item) {
			this.$emit('bookClick', item);
		},
		seeBusImageClick(item) {
			this.$emit('seeBusImageClick', item);
		},
		//排序
		btnSortClick(type) {
			if (type == 1) {
				this.currentSort = this.enumSortType.enumSortDefault;
			} else if (type == 2) {
				if (this.currentSort == this.enumSortType.enumSortPriceUp) this.currentSort = this.enumSortType.enumSortPriceDown;
				else if (this.currentSort == this.enumSortType.enumSortPriceDown) this.currentSort = this.enumSortType.enumSortPriceUp;
				else this.currentSort = this.enumSortType.enumSortPriceUp;
			} else if (type == 3) {
				if(this.currentSort==this.enumSortType.enumSortAgeUp) this.currentSort=this.enumSortType.enumSortAgeDown;
				else if(this.currentSort==this.enumSortType.enumSortAgeDown) this.currentSort=this.enumSortType.enumSortAgeUp;
				else this.currentSort = this.enumSortType.enumSortAgeUp;
			}
			this.$emit('sort',this.currentSort,this.enumSortType);
		}
	}
}
</script>


<style>
.tableView .ivu-page-prev,
.tableView .ivu-page-next {
	background: #eee;
}

.tableView .ivu-page-item {
	background-color: #eee;
}

.tableView .ivu-page-item-active {
	background-color: #ff9710;
}
.tableView .ivu-icon{
	vertical-align: middle;
}
</style>
<style scoped="scoped">
.sort_type {
	cursor: pointer;
}
.sort_type:hover{
	color: #ff9710 !important;
}
</style>
