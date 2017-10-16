<template>
<div>
	<div class="cell" v-if="item.stock != '0'" style="height:240px;border-top:1px solid #eee;">
		<div style="float:left;position:relative;overflow:hidden;width:240px;height:180px;margin-top:30px;margin-left:30px;">
			<div @click="btnSeeBusImageClick(item)" class="icon ib" :title="getIconTitle(item)" :style="getIconStyle(item)" style="position:absolute;width:240px;height:180px;background-image: radial-gradient(circle at 0 0, #ffffff, #eaeaea);">
				<div v-if="item.img_cnt!=0" class="icon_num ib" style="width:60px;height:25px;position:absolute;right:7px;bottom:7px;text-align:center;background-color: rgba(0,0,0,0.4);margin-right:7px;margin-bottom:7px;border-radius: 5px;font-size: 16px;font-weight: 500;color: #FFFFFF;" v-html="item.img_cnt+'图'">
					<!--<div class="" style="font-size:16px;color:#fff;font-weight:500;height:100%;background-color: rgba(0,0,0,0.4);border-radius: 5px;" v-html="item.img_cnt+'图'">10图</div>-->
				</div>
			</div>
		</div>
		<div class="center ib" style="padding-top:42px;margin-left:35px;float:left;">
			<div class="ib" style="font-size:20px;font-weight:500">
				<div class="ib" v-html="item.brand_name +' '+ item.seat_count+'座巴士'">宇通53座巴士</div>
				<div class="ib" style="margin-left:43px;" v-html="item.num_plate">苏A牌</div>
			</div>
			<div class="" style="margin-top:18px;">
				<div class="ib gray_title">正座：</div>
				<div class="ib black_num" v-html="item.seat_count">52+1</div>
				<div class="ib" style="padding:0 15px;">|</div>
				<div class="ib gray_title">车龄：</div>
				<div class="ib black_num" v-html="item.age_type_name">3-5年</div>
				<div class="ib" style="padding:0 15px;">|</div>
				<div class="ib gray_title">车况：</div>
				<div class="ib black_num" v-html="formatService_lvl(item)">4.8/5分</div>
			</div>
			<div class="" style="padding-top:38px;">
				<div class="ib">
					<div class="ib img xinyu" style="width:40px;height:50px;"></div>
					<div class="ib " style="margin-left:18px;vertical-align:super;">
						<div class="ib" style="color:#666;font-size:14px;" v-html="formatOrder_cnt(item)">被预订 256 次</div>
						<div class=" " style="line-height:1;margin-top:8px;">
							<div class="ib" style="color:#666;font-size:14px;margin-right:11px;">信誉评分</div>
							<div class="ib" v-if="item.credit_lvl-0==0" style="font-size:14px;color:#999;width:107px;text-align:left;">无</div>
							<star-show v-else :starValue="item.credit_lvl"></star-show>
							<!-- <div v-else class="ib">
								<Icon v-for="num in formatStar(item.credit_lvl).all" :key="num" class="ib" type="star" size="18" style="color: #ffa300;margin-top:-4px;" />
								<Icon v-show="formatStar(item.credit_lvl).half!=0" class="ib" type="ios-star-half" size="18" style="color: #ffa300;margin-top:-4px;" />
								<Icon v-for="num in formatStar(item.credit_lvl).empty" :key="num" class="ib" type="star" size="18" style="color: #e9e9e9;margin-top:-4px;"/>
								<div class="ib" style="font-size:14px;color:#999;margin-left:10px;" v-html="item.credit_lvl?item.credit_lvl:''">3.0</div>
							</div> -->
						</div>
					</div>
				</div>
				<div class="line ib" style="padding:0 46px;"></div>
				<div class="ib">
					<div class="ib img siji" style="width:40px;height:50px;"></div>
					<div class="ib " style="margin-left:18px;vertical-align:super;">
						<div class="ib" style="color:#666;font-size:14px;" v-html="formatAll_miles(item)">安全里程 8万</div>
						<div class="" style="line-height:1;margin-top:8px;">
							<div class="ib" style="color:#666;font-size:14px;margin-right:11px;">服务评分</div>
							<div class="ib" v-if="item.drivel_service_lvl-0==0" style="color:#999;font-size:14px;">无</div>
							<star-show v-else :starValue="item.drivel_service_lvl"></star-show>
							<!--
							<div v-else class="ib">
								<Icon v-for="num in formatStar(item.drivel_service_lvl).all" :key="num" class="ib" type="star" size="18" style="color: #ffa300;margin-top:-4px;" />
								<Icon v-show="formatStar(item.drivel_service_lvl).half!=0" class="ib" type="ios-star-half" size="18" style="color: #ffa300;margin-top:-4px;" />
								<Icon v-for="num in formatStar(item.drivel_service_lvl).empty" :key="num" class="ib" type="star" size="18" style="color: #e9e9e9;margin-top:-4px;"/>
								<div class="ib" style="font-size:14px;color:#999;margin-left:10px;" v-html="item.drivel_service_lvl?item.drivel_service_lvl:''">3.0</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="right ib ib-pe" style="float:right;">
			<div class="ib" style="margin-top:35px;margin-right:66px;">
				<div class="ib " style="color:#ff9710;font-size:14px;padding-bottom:4px;margin-right: 5px;">¥</div>
				<div class="ib" style="color:#ff9710;font-family: inherit;font-size: 40px;font-weight: 600;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: -2px;" v-html="item.model_price">1980</div>
			</div>
			<div class="" style="margin-right:66px;margin-top:5px;">
				<div class="ib" style="font-family: Adobe Heiti Std R;font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color:#999;" v-html="getPriceContentTxt(item)">往返价，含油费路桥费等</div>
				<div class="ib info" style="vertical-align:text-top;">
					<!--<Icon style="font-size:16px;margin-left:6px;" type="ios-information-outline"></Icon>-->
				</div>
			</div>
			<div class="" style="margin-top:42px;">
				<div @click="btnBookClick(item)" class="btn ib" style="">预订</div>
			</div>
		</div>

	</div>
	<div class="cell" v-else style="height:240px;border-top:1px solid #eee;">
		<div class="icon ib" :title="getIconTitle(item)" :style="getIconStyle(item)" style="float:left;position:relative;width:240px;height:180px;background-image: radial-gradient(circle at 0 0, #ffffff, #eaeaea);margin-top:30px;margin-left:30px;">
			<div style="width:240px;height:180px;background-color: rgba(0,0,0,0.5);z-index: 2;position:relative;"></div>
			<!-- position:absolute;left: 0;right: 0;top: 0;bottom: 0; -->
			<div v-if="item.img_cnt!=0" class="icon_num ib" style="width:60px;height:25px;position:absolute;right:7px;bottom:7px;text-align:center;background-color: rgba(0,0,0,0.4);margin-right:7px;margin-bottom:7px;border-radius: 5px;font-size: 16px;font-weight: 500;color: #FFFFFF;" v-html="item.img_cnt+'图'">
				<!--<div class="" style="font-size:16px;color:#fff;font-weight:500;height:100%;background-color: rgba(0,0,0,0.4);border-radius: 5px;" v-html="item.img_cnt+'图'">10图</div>-->
			</div>
		</div>
		<div class="center ib" style="padding-top:42px;margin-left:35px;float:left;">
			<div class="ib" style="font-size:20px;font-weight:500">
				<div class="ib" style="color: #999999;" v-html="item.brand_name +' '+ item.seat_count+'座巴士'">宇通53座巴士</div>
				<div class="ib" style="margin-left:43px;color: #999999;" v-html="item.num_plate">苏A牌</div>
			</div>
			<div class="none_font" style="margin-top:18px;">
				<div class="ib gray_title">正座：</div>
				<div class="ib black_num" v-html="item.seat_count">52+1</div>
				<div class="ib" style="padding:0 15px;">|</div>
				<div class="ib gray_title">车龄：</div>
				<div class="ib black_num" v-html="item.age_type_name">3-5年</div>
				<div class="ib" style="padding:0 15px;">|</div>
				<div class="ib gray_title">车况：</div>
				<div class="ib black_num" v-html="formatService_lvl(item)">4.8/5分</div>
			</div>
			<div class="" style="padding-top:38px;">
				<div class="ib">
					<div class="ib img xinyugray" style="width:40px;height:50px;"></div>
					<div class="ib" style="margin-left:18px;vertical-align:super;">
						<div class="ib" style="color:#999999;font-size:14px;" v-html="formatOrder_cnt(item)">被预订 256 次</div>
						<div class="" style="line-height:1;margin-top:8px;">
							<div class="ib" style="color:#999999;font-size:14px;margin-right:11px;">信誉评分</div>
							<div class="ib" v-if="item.credit_lvl-0==0" style="font-size:14px;color:#999;width:107px;text-align:left;">无</div>
							<star-show v-else :starValue="item.credit_lvl" :allGray="true"></star-show>
							<!-- <div v-else class="ib">
								<Icon v-for="num in formatStar(item.credit_lvl).all" :key="num" class="ib" type="star" size="18" style="color: #999999;margin-top:-4px;" />
								<Icon v-show="formatStar(item.credit_lvl).half!=0" class="ib" type="ios-star-half" size="18" style="color: #999999;margin-top:-4px;" />
								<Icon v-for="num in formatStar(item.credit_lvl).empty" :key="num" class="ib" type="star" size="18" style="color: #999999;margin-top:-4px;"/>
								<div class="ib" style="font-size:14px;color:#999;margin-left:10px;" v-html="item.credit_lvl?item.credit_lvl:''">3.0</div>
							</div> -->
						</div>
					</div>
				</div>
				<div class="line ib" style="padding:0 46px;"></div>
				<div class="ib">
					<div class="ib img sijigray" style="width:40px;height:50px;"></div>
					<div class="ib" style="margin-left:18px;vertical-align:super;">
						<div class="ib" style="color:#999999;font-size:14px;" v-html="formatAll_miles(item)">安全里程 8万</div>
						<div class="" style="line-height:1;margin-top:8px;">
							<div class="ib" style="color:#999999;font-size:14px;margin-right:11px;">服务评分</div>
							<div class="ib" v-if="item.drivel_service_lvl-0==0" style="color:#999;font-size:14px;">无</div>
							<star-show v-else :starValue="item.drivel_service_lvl" :allGray="true"></star-show>
							<!-- <div v-else class="ib">
								<Icon v-for="num in formatStar(item.drivel_service_lvl).all" :key="num" class="ib" type="star" size="18" style="color: #999999;margin-top:-4px;" />
								<Icon v-show="formatStar(item.drivel_service_lvl).half!=0" class="ib" type="ios-star-half" size="18" style="color: #999999;margin-top:-4px;" />
								<Icon v-for="num in formatStar(item.drivel_service_lvl).empty" :key="num" class="ib" type="star" size="18" style="color: #999999;margin-top:-4px;"/>
								<div class="ib" style="font-size:14px;color:#999;margin-left:10px;" v-html="item.drivel_service_lvl?item.drivel_service_lvl:''">3.0</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ib" style="float:right;">
			<div class="shouqin"></div>
		</div>

	</div>
</div>
</template>

<script>
import starShow from './_starShow.vue'
export default {
	name: "cell",
	props: {
		item: [Object] //接收一个对象
	},
	components: {
		starShow
	},
	methods: {
		//格式化显示
		formatService_lvl(item) {
			if (item.service_lvl - 0 == 0 || item.service_lvl == "") {
				return "无"
			}
			let cstr = (item.service_lvl - 0).toFixed(1) + ' / 5分';
			return cstr;
		},
		formatOrder_cnt(item) {
			if (item.order_cnt == "" || item.order_cnt == "新入住") {
				return "新入驻";
			}
			let cstr = '被预订 ' + item.order_cnt + '次';
			return cstr;
		},
		formatAll_miles(item) {
			if (item.all_miles == "" || item.all_miles == "新入住") {
				return "新入驻";
			}
			let show = 0;
			if (item.all_miles > 10000) {
				show = item.all_miles / 10000;
				show = show.toFixed(1);
			}
			let cstr = '安全里程 ' + show + '万';
			return cstr;
		},
		formatStar(value) {
			if (value > 5) value = '5.0';
			let star = (value - 0).toFixed(1) + '';
			let arr = star.split('.');
			let all = arr[0] - 0;
			let half = arr[1] - 0;
			if (half != 0) half = 1;
			let empty = 5 - Math.ceil(star);
			return {
				all,
				half,
				empty
			};
		},
		//车辆图片title
		getIconTitle(item) {
			if (item.img_cnt == '0') {
				return '';
			} else {
				return '查看车辆图片';
			}
		},
		//icon style
		getIconStyle(item) {
			let imgurl = item.img_url ? item.img_url : 'http://img.zhizhuchuxing.cn/busda/empty.png';
			let style = {
				background: 'url(' + imgurl + ')',
				backgroundSize: '240px 180px'
			}
			// if(item.img_cnt!='0'){
			if (item.stock != '0') {
				style.cursor = 'pointer';
			}

			// }
			return style;
		},
		//价格下面的方案
		getPriceContentTxt(item) {
			let cstr = '';
			if (item.bus_type == '1') cstr = '含往返价，含油费路桥费等';
			else if (item.bus_type == '2') cstr = '含100公里8小时/天，超出另计';
			else cstr = '含油费、路桥费、停车费等';
			return cstr;
		},
		// 协议方法
		btnBookClick(item) {
			this.$emit('bookClick', item);
		},
		btnSeeBusImageClick(item) {
			this.$emit('seeBusImageClick', item);
		}

	}
}
</script>

<style scoped="scoped">
.gray_title {
	color: #999;
	font-size: 14px;
}

.black_num {
	color: #333;
	font-size: 14px;
}

.siji {
	background-image: url('../../../assets/images/bus/siji.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.sijigray {
	background-image: url('../../../assets/images/bus/sijigray.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.xinyu {
	background-image: url('../../../assets/images/bus/xinyu.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.xinyugray {
	background-image: url('../../../assets/images/bus/xinyugray.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.info {
	background-image: url('../../../assets/images/bus/zhuyi.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	width: 13px;
	height: 13px;
	margin-left: 8px;
}

.btn {
	text-align: center;
	cursor: pointer;
	font-size: 16px;
	color: #fff;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: 35px;
	letter-spacing: normal;
	margin-right: 66px;
	width: 100px;
	height: 35px;
	border-radius: 2px;
	background-color: #ff9710;
	box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);
}

.btn:hover {
	background: #FFAC40 !important;
}

.icon {
	transition: all 0.6s;
}

.icon:hover {
	/*transform: scale(1.1);*/
}

.none_font div {
	color: #999999;
}

.shouqin {
	width: 114px;
	height: 116px;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-image: url('http://img.zhizhuchuxing.cn/busda/shouqin.png');
	margin-top: 54px;
	margin-right: 78px;
}
</style>
