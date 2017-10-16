<template>
	<div>
		<!--点评-->
		<div style="padding: 28px 25px;" class="ub">
			<div class="ub" v-for="(item,index) in comment_type" @click="statusDidClick(item)" :key="item.comment_type_id" style="width: 75px;margin-right: 55px;cursor: pointer;">
				<Badge class="badge" :count="item.comment_count">
					<div style="font-size: 14px;" :class="item.selected==true ? 'sel_status':'dis_status'">{{item.comment_type_alias}}</div>
				</Badge>
			</div>
		</div>
		<div style="width: 950px;height: 45px;background: #fff4e7;margin-left: 25px;" class="ub ub-ac">
			<div style="width: 340px;text-align: center;color: #666666;display: inline-block;">车辆</div>
			<div style="width: 160px;text-align: center;color: #666666;display: inline-block;">行程</div>
			<div style="width: 110px;text-align: center;color: #666666;display: inline-block;">用车日期</div>
			<div style="width: 100px;text-align: center;color: #666666;display: inline-block;">订单金额</div>
			<div style="width: 100px;text-align: center;color: #666666;display: inline-block;">状态</div>
			<div style="width: 120px;text-align: center;color: #666666;display: inline-block;">操作</div>
		</div>
		<div class="table ub ub-ver" style="width: 950px;margin-top: 20px;margin-left: 25px;">
			<comment-cell :data="cell_item"></comment-cell>
			<comment-cell :data="cell_item"></comment-cell>
			<comment-cell :data="cell_item"></comment-cell>
			<comment-cell :data="cell_item"></comment-cell>
		</div>
		<div class="ub ub-pe" style="margin-right: 25px;margin-bottom: 40px;">
			<Page :total="100" show-elevator size="small"></Page>
		</div>
	</div>
</template>

<script>
	import commentCell from './_commentCell'
	export default {
		data() {
			return {
				comment_type: [{
					comment_type_id: '1',
					comment_type_alias: '待点评',
					comment_count: '2',
					selected: true
				}, {
					comment_type_id: '2',
					comment_type_alias: '已点评',
					comment_count: '4',
					selected: false
				}],
				sel_status: '',
				cell_item: {}
			}
		},
		components: {
			commentCell
		},
		methods: {
			statusDidClick(item) {
				this.comment_type.map(x => x.selected = false);
				item.selected = true;
				this.sel_status = item.comment_type_id;
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
		background: #ff3300;
		border: 1px solid transparent;
		color: #fff;
		line-height: 16px;
		text-align: center;
		font-size: 12px;
		white-space: nowrap;
		transform-origin: -10% center;
		z-index: 10;
		box-shadow: 0 0 0 1px #fff;
		min-width: 16px;
		padding: 0;
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
</style>