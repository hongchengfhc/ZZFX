<template>
<div class="ub ub-ac" style="display: table;" :class="isFocus ? 'sel_class' : 'dis_class'" @click="onClick(item)" @mouseenter="focus" @mouseleave="unFocus">
	<div style="vertical-align: middle;display: table-cell;">
		<div :class="tripTypeImgClass(item.type_id)" style="width: 68px;height: 52px;margin: 0 18px;"></div>
	</div>
	<div class="" style="display:table-cell;vertical-align: middle;">
		<div style="height: 40px;text-align: left;font-weight: 500;padding-right: 12px;">{{title}}</div>
		<div class="" style="text-align: left;">
			<div class="trip_type" :class="isFocus ? 'sel' : 'dis' " style="padding: 3px 9px;line-height: 1;display: inline-block;">{{item.type}}</div>
			<div class="trip_day" style="padding-left: 7px;display: inline-block;">{{item.day_count}}天行程</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		title: [String],
//		trip_day: [String, Number],
//		trip_type_alias: [String],
//		trip_type_status: [String, Number],
//		trip_id: [String, Number],
		item :[Object]
	},
	data() {
		return {
			isFocus: false
		}
	},
	methods: {
		onClick(item) {
			this.$emit('selectCell', item);
		},
		focus() {
			this.isFocus = true;
		},
		unFocus() {
			this.isFocus = false;
		},
		tripTypeImgClass(type){
			if (type == '1') {
				if (this.isFocus == true) {
					return 'province_hover'
				} else{
					return 'province'
				}
			} else if(type == '2'){
				if (this.isFocus == true) {
					return 'city_hover'
				} else{
					return 'city'
				}
			}else if(type == '3' || type == '4'){
				if (this.isFocus == true) {
					return 'plane_hover'
				} else{
					return 'plane'
				}
			}else{
				if (this.isFocus == true) {
					return 'station_hover'
				} else{
					return 'station'
				}
			}
		}
	}
}
</script>

<style scoped>
.trip_type {
	color: #ffffff;
	font-size: 12px;
	opacity: 0.5;
	background: #ff9710;
	border-radius: 8.5px;
}

.trip_day {
	color: #666666;
	font-size: 12px;
}

.sel_class {
	border: 1px solid #ff9710;
	cursor: pointer;
}

.dis_class {
	border: solid 1px rgba(153, 153, 153, 0.5);
	cursor: pointer;
}

.sel {
	opacity: 1
}

.dis {
	opacity: 0.7
}

.province {
	background-image: url('../../../assets/images/home/12.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.province_hover {
	background-image: url('../../../assets/images/home/shengshibaoche4.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.city{
	background-image: url('../../../assets/images/home/13.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.city_hover{
	background-image: url('../../../assets/images/home/shiqubaoche4.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.plane{
	background-image: url('../../../assets/images/home/14.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.plane_hover{
	background-image: url('../../../assets/images/home/jiesongji4.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.station{
	background-image: url('../../../assets/images/home/11.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.station_hover{
	background-image: url('../../../assets/images/home/jiesongzhan4.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
</style>
