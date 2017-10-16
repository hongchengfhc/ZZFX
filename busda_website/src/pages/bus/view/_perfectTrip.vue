<template lang="html">
  <div class="perfectTrip">

	<Modal class="trip_modal" v-model="show" width="650" style="box-shadow: 0 0 25px 0 rgba(51, 51, 51, 0.4);">
	  <p slot="header">
		  <span style="font-size:14px;color:#333;font-weight:500;">完善行程</span>
	  </p>
		<div class="top_info" style="margin-top:16px;">
			<div class="station">
                <div class="one ib" v-for="item in stations">
					<span class="name">{{item}}</span>
                    <Icon class="icon" type="ios-arrow-thin-right"></Icon>
					<!-- <Icon v-show="stationIcon" class="icon" type="ios-arrow-thin-right"></Icon> -->
				</div>
				<!-- <div class="one">
					<span class="name">上海</span>
					<Icon class="icon" type="ios-arrow-thin-right"></Icon>
				</div> -->
			</div>
			<div class="distance" style="margin-top:22px;">
				<span style="color:#999;">往返</span>
				<span style="color:#333;margin-left:4px;">约 {{mileage}} 公里</span>
				<span style="padding:0 35px;">|</span>
				<span style="color:#999;">行程天数</span>
				<span style="color:#333;margin-left:4px;">{{days}} 天</span>
			</div>
		</div>

	    <time-line ref="trip_time_line" @OK="timeLineOK" @cancel="cancel" :timeList="times" class="ub ub-ac" style="margin-top:48px;"></time-line>

		<!-- <div class="button ub ub-pc" style="margin-left:-65px;">
			<Button @click="OK()" style="font-size:14px;width:100px;height:35px;border-radius:2px;box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);" type="primary">确定</Button>
			<Button @click="cancel()" style="margin-left: 8px;font-size:14px;color:#999;width:100px;height:35px;" type="text">取消</Button>
		</div> -->


  </Modal>
  </div>
</template>

<script>
import timeLine from './_timeLine.vue'
export default {
	name: "perfectTrip",
    props:{
        times:[Array],
        days:[Number,String],
        stations:[Array],
        stationIcon:[Boolean],
        mileage:[Number,String]
    },
	data() {
		return {
            show:false
		}
	},
	components: {
		timeLine
	},
    mounted(){
    },
    // /booking/order/get-city-for-select
    methods:{
        //时间轴的回调
        timeLineOK(arr,showStartTime){
            this.show=false;
            this.$emit('tripOK',arr,showStartTime);
        },cancel(){
            this.show=false;
        }
    }
}
</script>

<style lang="css">
.trip_modal .ivu-modal-footer{
	display: none!important;
}
.trip_modal .ivu-modal-body{
    height: 430px!important;
    overflow-y: scroll!important;
    text-align: left!important;
}
</style>
<style scoped="scoped">
.one>.name {
	color: #333;
}

.one>.icon {
	padding: 0 12.5px;
}

.one:last-child>.icon {
	display: none;
}
.trip_modal .station,.trip_modal .distance{
    margin-left:144px;
}
</style>
