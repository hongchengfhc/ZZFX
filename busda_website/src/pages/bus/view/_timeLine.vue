<template>
<!--时间轴-->
<div class="time ub" style="margin-left: 120px;">
	<Timeline class="timeLine" style="margin-bottom:100px;min-height:196px;">
		<Timeline-item class="ub" color="#ff9710" v-for="(item,index) in times" :key="index">
			<div style="margin-left: -100px;position: absolute;color:#666;" v-if="item.show_date" v-html="item.date"></div>
			<div style="margin-top: 20px;margin-left: -69px;position: absolute;color:#666;" v-if="item.show_date">第{{item.day}}天</div>
			<div class="ib" v-if="(item.show_date && index==0) || times.length==0" style="margin-top:-10px;">
				<div class="ib trip_amap_input_time">
					<div class="ib" style="margin-left:10px;color:#666;float:left;height:32px;line-height:32px;">{{startArea}}</div>
					<!-- <el-amap-search-box ref="amap_trip_time" :style="styleTripAmap()" :search-option="searchOption" :on-search-result="onMapSearchResult" class="amap_trip_time search-box"></el-amap-search-box> -->
					<Input class="time_first_input" :style="styleTripAmap()" placeholder="填写详细地址" style="width:291px;height:32px;border:0px;" v-model="item.text">{{item.text}}</Input>
				</div>
				<!-- <el-amap-search-box ref="amap_trip" :search-option="searchOption" :on-search-result="onMapSearchResult" style="width:293px;height:32px;"></el-amap-search-box> -->
				<TimePicker @on-change="timeChange" :value="showStartTime" format="HH:mm" placeholder="请选择" style="width: 75px;margin-left:3px;"></TimePicker>
			</div>
			<Input placeholder="请输入行程地点" style="width:344px;height:32px;margin-top:-10px;" v-if="item.show_date && index!=0" v-model="item.text">{{item.text}}</Input>
			<Input placeholder="请输入行程地点" style="width:344px;height:32px;margin-top:-10px;"  v-show="!item.show_add && index!=0 && !item.show_date" v-model="item.text">{{item.text}}</Input>

			<Button class="ub ub-ac" v-if="item.show_add" @click="add(item)" style="margin-top:-7px;background:#fff;border:0px;padding:0px;height:32px;">
						<Icon class="" type="plus-circled" style="font-size:20px;color:#ff9710;height:20px;position:absolute"></Icon>
						<span class="" style="height:20px;line-height:20px;margin-left:20px;">添加行程</span>
					</Button>
			<Button v-if="!item.show_add && !item.show_date" @click="del(item,index)" style="margin-top:-5px;margin-left:3px;background:#fff;border:0px;padding:0px;height:32px;">
						<!-- <Icon type="ios-minus" style="font-size:20px;color:#ccc;height:20px;"></Icon> -->
						<Icon type="minus-circled" style="font-size:20px;color:#ccc;height:20px;"></Icon>
					</Button>
		</Timeline-item>
	</Timeline>
	<div class="button" style="margin-top:-100px;margin-left:24px;">
		<Button @click="OK()" style="font-size:14px;width:100px;height:35px;border-radius:2px;box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);" type="primary">确定</Button>
		<Button @click="cancel()" style="margin-left: 8px;font-size:14px;color:#999;width:100px;height:35px;" type="text">取消</Button>
	</div>
</div>
</template>

<script>
import Util from '../../../config/Util'
export default {
	name: "time",
	props: {
		timeList: [Array]
	},
	data() {
		return {
			searchOption: {
				city: "",
				citylimit: true
			},
			stopUpdateTime: true, //不允许修改
			times: [],
			startArea: "", //可通过ref给值
			showStartTime: "",
			firstText: "",
			// times: [{
			// 		"date": "2016-01-01","day":1,
			// 		"text": "text1","show_date":true,"show_add":false
			// 	}, {
			// 		"date": "2016-01-01","day":1,
			// 		"text": "text11","show_date":false,"show_add":false
			// 	}
			// ],
		}
	},
	watch: {
		timeList: {
			handler(cur, old) {
				this.times = Util.clone(this.timeList);
				this.firstText = this.times[0].text;

			},deep:true
		},
		startArea(cur, old) {
			this.searchOption.city = cur;

		}
	},
	mounted() {

		this.$nextTick(() => {
			Util.ZZLog(this,'this');
		})
	},
	methods: {
		add(item) {
			let line_index = 0;
			for (let i = 0; i < this.times.length; i++) {
				if (item.day == this.times[i].day) {
					line_index = i;
				}
			}
			if(line_index<=1)line_index=1;
			let date = this.times[line_index-1].date?this.times[line_index-1].date:this.times[0].date;
			this.times.splice(line_index, 0, {
				date: this.times[line_index-1].date,
				text: "",
				day:item.day,
				show_time: false,
				show_add: false
			});
			Util.ZZLog(this.times,line_index);
		},
		del(item, index) {
			this.times.splice(index, 1);
		},
		OK() {
			this.$emit('OK', this.times, this.showStartTime);
		},
		cancel() {
			this.$emit('cancel');
		},
		timeChange(val) {
			this.showStartTime = val;
		},
		styleTripAmap(){
			let wh = 72 / 6;
			let width = 344 - 10 - wh * this.startArea.length - 2;
			width=width-4;
			// let d = document.querySelector('.trip_amap_input_time');
			// let dom_tip = d.querySelectorAll('.search-tips')[0];
			// // let dom_tip=document.getElementsByClassName('search-tips')[0];
			//
			// dom_tip.style.width=width+'px';
			// Util.ZZLog(d,dom_tip);
			return {
				width: width + 'px'
			}
		},
		onMapSearchResult(arr) {
			let item = arr[0];
			if (this.times.length >= 0) {
				this.times[0].text = item.name;
			}
		}
	}
}
</script>

<style>
.time_first_input .ivu-input{
	border: 0px!important;
	height: 32px!important;
}
.timeLine .ivu-timeline-item-head {
	width: 7px!important;
	height: 7px!important;
}

.timeLine .ivu-timeline-item-tail {
	left: 3px!important;
	border-left: 1px solid #ff9710!important;
}



/*地图*/

.timeLine .search-btn {
	display: none!important;
}
.timeLine .trip_amap_input_time {
	width: 344px!important;
	font-size: 12px!important;
	border: 1px solid #d7dde4!important;
	border-radius: 4px!important;
	color: #333!important;
	background-color: #fff!important;
	cursor: text!important;
	transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out!important;
}

.timeLine .trip_amap_input_time:hover {
	border: 1px solid #ffac40!important;
}
.timeLine .el-vue-search-box-container .search-box-wrapper {
	display: inline-block!important;
	width: 100%!important;
	height: 32px!important;
	line-height: 32px!important;
	font-size: 12px!important;
	/*border: 1px solid #d7dde4!important;*/
	border-radius: 4px!important;
	color: #333!important;
	background-color: #fff!important;
	background-image: none!important;
	position: relative!important;
	cursor: text!important;
	transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out!important;
	/* box-sizing: border-box!important; */
}

.timeLine .el-vue-search-box-container .search-box-wrapper:hover {
	/*border: 1px solid #ffac40!important;*/
}

.timeLine .search-box-wrapper input {
	width: 100%!important;
	height: 32px!important;
	border-radius: 4px!important;
	text-indent: 0px!important;
	display: inline-block!important;
    width: 100%!important;
    height: 32px!important;
    line-height: 1.5!important;
    padding: 4px 7px!important;
    font-size: 12px!important;
    border-radius: 4px!important;
    color: #333!important;
    background-color: #fff!important;
    background-image: none!important;
    position: relative!important;
    cursor: text!important;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out!important;
}

.timeLine .el-vue-search-box-container {
	position: relative!important;
	/* width: 360px!important; */
	height: 32px!important;
	background: #f3f3f3!important;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0)!important;
	border-radius: 2px 3px 3px 2px!important;
	z-index: 10!important;
}

.timeLine .el-vue-search-box-container .search-tips {
	position: absolute!important;
	margin-top: 3px!important;
	top: 100%!important;
	width:297px!important;
	/*width: 290px!important!important;*/
	border: 0px solid #dbdbdb!important;
	background: #fff!important;
	overflow: auto!important;
}

.timeLine .el-vue-search-box-container .search-tips ul li {
	height: 32px!important;
	text-align: left!important;
	line-height: 32px!important;
	box-shadow: 0 1px 1px rgba(0, 0, 0, .1)!important;
	padding: 0 10px!important;
	cursor: pointer!important;
	border-left: 1px solid #dbdbdb!important;
	border-right: 1px solid #dbdbdb!important;
	overflow: hidden!important;
	text-overflow: ellipsis!important;
	white-space: nowrap!important;
}

.timeLine .el-vue-search-box-container .search-tips ul li:active {
	background: #ff9710!important;
	color: #fff!important;
}
</style>
