<template>
<!--时间轴-->
<div class="time ub" style="margin-left: 120px;">
	<!-- <div class="ub" v-if="times.length<=1" v-for="(item,index) in times" :key="index">
		<div v-show="item.date" style="margin-left: -120px;position: absolute;color:#666;" v-html="item.date"></div>
		<div v-html="item.text"></div>
	</div> -->
	<Timeline class="timeLine">
		<Timeline-item class="ub" color="#ff9710" v-for="(item,index) in times" :key="index">
			<div v-show="item.date" style="margin-left: -145px;position: absolute;color:#666;" v-html="item.date"></div>
			<!-- <div v-show="item.date && item.day" style="margin-left: -70px;position: absolute;color:#666;" v-html="'第'+item.day+'天'"></div> -->
			<div v-html="item.text"></div>
		</Timeline-item>
	</Timeline>


</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: "time",
	data() {
		return {
			firstText: "",
			times: [
				// {
				// 	"date": "2016-01-01&emsp;第1天",
				// 	"text": "上海市闵行区  虹桥万科  08:00"
				// }, {
				// 	"date": "",
				// 	"text": "人民广场"
				// }
			]
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.times.length != 0) {
				this.firstText = this.times[0].text;
			}

		})
	},
	methods: {
		add(item) {
			let date = item['date'];
			let line_index = 0;
			for (let i = 0; i < this.times.length; i++) {
				if (item['date'] == this.times[i]['date']) {
					line_index = i;
				}
			}
			this.times.splice(line_index, 0, {
				date: date,
				text: "新增的",
				show_time: false,
				show_add: false
			});
			Util.ZZLog(this.times);

		},
		del(item, index) {
			Util.ZZLog(this.times);
			this.times.splice(index, 1);
		},
		change(key) {
			if (key.keyCode === 8 || key.keyCode === 46) {
				if (this.times[0].text.length <= this.firstText.length) {
					this.times[0].text = this.firstText;
				}
			}
		}
	}
}
</script>

<style>
.timeLine .ivu-timeline-item-head {
	width: 7px;
	height: 7px;
	margin-top:3px;
}

.timeLine .ivu-timeline-item-tail {
	margin-top:3px;
	left: 3px;
	border-left: 1px solid #ff9710;
}
</style>
