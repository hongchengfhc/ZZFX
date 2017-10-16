<template>
<div style="padding: 23px 0;background: #fff4e7;text-align: left;position:absolute;height:100%;" class="">
	<!--使用指南-->
	<div class="">
		<div style="padding: 14px 22px;line-height: 1;font-weight: 600;font-size: 14px;">使用指南</div>
		<div class="">
			<div v-for="(item,index) in guide_ary" :key="item.item_id" @click="itemDidClick(item)" :style="item.selected == true ? 'border-left:4px solid #ff9710':'border-left:4px solid #fff4e7'" class=" hightlight" :class="{sel_item : item.selected}" >
				<!--<div class="line" style="width: 4px;height: 34px;" :style="item.selected == true ? 'background:#ff9710' : 'background : #fff4e7'"></div>-->
				{{item.item_name}}
			</div>
		</div>
	</div>


	<!--支付说明-->
	<div class="">
		<div style="padding: 14px 22px;line-height: 1;font-weight: 600;font-size: 14px;">支付说明</div>
		<div class="">
			<div v-for="(item,index) in explain_ary" :key="item.item_id" @click="itemDidClick(item)" :style="item.selected == true ? 'border-left:4px solid #ff9710':'border-left:4px solid #fff4e7'" class=" hightlight" :class="{sel_item : item.selected}" >
				<!--<div class="line" style="width: 4px;height: 34px;" :style="item.selected == true ? 'background:#ff9710' : 'background : #fff4e7'"></div>-->
				{{item.item_name}}
			</div>
		</div>
	</div>
	<!--车队入驻-->
	<div class="">
		<div style="padding: 14px 22px;line-height: 1;font-weight: 600;font-size: 14px;">车队入驻</div>
		<div class="">
			<div v-for="(item,index) in fleet_ary" :key="item.item_id" @click="itemDidClick(item)" class=" hightlight" :class="{sel_item : item.selected}" :style="item.selected == true ? 'border-left:4px solid #ff9710':'border-left:4px solid #fff4e7'" >
				<!--<div class="line" style="width: 4px;height: 34px;" :style="item.selected == true ? 'background:#ff9710' : 'background : #fff4e7'"></div>-->
				{{item.item_name}}
			</div>
		</div>
	</div>
	<!--平台概况-->
	<div class="">
		<div style="padding: 14px 22px;line-height: 1;font-weight: 600;font-size: 14px;">平台概况</div>
		<div class="">
			<div v-for="(item,index) in platform_ary" :key="item.item_id" @click="itemDidClick(item)" :style="item.selected == true ? 'border-left:4px solid #ff9710':'border-left:4px solid #fff4e7'" class=" hightlight" :class="{sel_item : item.selected}" >
				<!--<div class="line" style="width: 4px;height: 34px;" :style="item.selected == true ? 'background:#ff9710' : 'background : #fff4e7'"></div>-->
				{{item.item_name}}
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		defaultType: [String]
	},
	data() {
		return {
			sel_type: "",
			fleet_ary: [{
				item_name: '入驻说明',
				item_id: 'fleet_explain',
				selected: false
			}, {
				item_name: '入驻途径',
				item_id: 'fleet_channel',
				selected: false
			}],

			explain_ary: [{
				item_name: '价格说明',
				item_id: 'price_explain',
				selected: false
			}, {
				item_name: '付款方式',
				item_id: 'pay_style',
				selected: false
			}, {
				item_name: '发票开具',
				item_id: 'invoice',
				selected: false
			}],

			guide_ary: [{
				item_name: '常见问题',
				item_id: 'common_problem',
				selected: false
			},{
				item_name: '预订须知',
				item_id: 'book_notes',
				selected: false
			}, {
				item_name: '注意事项',
				item_id: 'attention',
				selected: false
			}],

			platform_ary: [{
				item_name: '关于我们',
				item_id: 'about_us',
				selected: false
			}, {
				item_name: '联系我们',
				item_id: 'contact_us',
				selected: false
			}]
		}
	},
	mounted() {
		this.fleet_ary.map(x => {
			if (x.item_id == this.defaultType) x.selected = true
		});
		this.explain_ary.map(x => {
			if (x.item_id == this.defaultType) x.selected = true
		});
		this.guide_ary.map(x => {
			if (x.item_id == this.defaultType) x.selected = true
		});
		this.platform_ary.map(x => {
			if (x.item_id == this.defaultType) x.selected = true
		});
	},
	watch:{
		defaultType(cur,old){
			this.fleet_ary.map(x => x.selected = false);
			this.explain_ary.map(x => x.selected = false);
			this.guide_ary.map(x => x.selected = false);
			this.platform_ary.map(x => x.selected = false);
			this.fleet_ary.map(x => {
				if (x.item_id == this.defaultType) x.selected = true
			});
			this.explain_ary.map(x => {
				if (x.item_id == this.defaultType) x.selected = true
			});
			this.guide_ary.map(x => {
				if (x.item_id == this.defaultType) x.selected = true
			});
			this.platform_ary.map(x => {
				if (x.item_id == this.defaultType) x.selected = true
			});
		}
	},
	methods: {
		itemDidClick(item) {
			this.fleet_ary.map(x => x.selected = false);
			this.explain_ary.map(x => x.selected = false);
			this.guide_ary.map(x => x.selected = false);
			this.platform_ary.map(x => x.selected = false);
			item.selected = true;
			this.sel_type = item.item_id;
			this.$emit('selType', this.sel_type);
		}
	}
}
</script>

<style scoped="scoped">
.sel_item {
	background: #FFFFFF !important;
}
.hightlight:not(.sel_item):hover{
	background: #FFFFFF !important;
	border-left: 4px solid #FFFFFF !important;
}
.hightlight{
	height: 34px;
	line-height: 34px;
	padding-left: 45px;
	cursor: pointer;width: 200px;height: 34px;color: #333333;background: #fff4e7;
}

</style>
