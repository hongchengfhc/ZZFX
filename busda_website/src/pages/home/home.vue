<template>
	<div class="home" v-show="loadSuccess" style="max-width: 1920px;margin: 0 auto;">
		<header-view ref="headerView"></header-view>
		<!--顶部轮播-->
		<div style="margin-top: 1px;text-align: center;margin: 0 auto;">
			<swiper :options="ad_swiper" ref="mySwiper">
				<swiper-slide v-for="(item,index) in items" :key="index" style="width: 100%;overflow: hidden;text-align: center;margin: 0 auto;">
					<div style="width: 100%;position: relative;left:-960px;text-align: center;min-width: 1200px;">
						<div style="width: 100%;position: relative;right: -50%;">
							<img :src="item" style="height: 500px;width: 1920px;margin: 0 auto;text-align: center;" />
						</div>
					</div>
				</swiper-slide>
				<!--<div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div>-->
			</swiper>
			<div class="" style="width: 1200px;height:460px;margin: 0 auto;z-index: 1;margin-top: -424px;position: relative;">
				<search></search>
			</div>

		</div>

		<!--用车历史-->
		<div class="" style="margin: 0 auto;width: 1200px;">
			<div class="" style="margin: 56px 14px 30px 0;display: table;">
				<div v-if="title_type.type_id == 1" class="a7" style="display: table-cell;vertical-align: middle;"></div>
				<div v-else class="a8" style="display: table-cell;vertical-align: middle;"></div>
				<div style="font-size: 18px;color: #666666;line-height: 1;padding-left: 14px;display: table-cell;vertical-align: middle;">{{title_type.type_name}}</div>
			</div>
			<div class="" style="overflow: auto;">
				<car-cell v-for="trip in trips" :key="trip.id" :title="formatTitle(trip)" :item="trip" class="car_trip" @selectCell="selectCell" style="float: left;"></car-cell>
			</div>
		</div>

		<!--丰富车型-->
		<div class="" style="margin: 67px 0 55px 0;">
			<div style="font-size: 24px;font-weight: 600;color: #333333;line-height: 1;">丰富车型</div>
			<div style="height: 4px;width: 43px;background: #ff9710;margin: 0 auto;margin-top: 20px;"></div>
		</div>
		<div class="" style="margin: 0 auto;width: 1200px;overflow: auto;">
			<div v-for="car_img in car_imgs" class="car_img" :style="getLabelStyles(car_img)" style="float: left;"></div>
		</div>

		<!--用车流程-->
		<div class="" style="margin: 93px 0 66px 0;">
			<div style="font-size: 24px;font-weight: 600;color: #333333;line-height: 1;">用车流程</div>
			<div style="height: 4px;width: 43px;background: #ff9710;margin: 0 auto;margin-top: 20px;"></div>
		</div>
		<div class="" style="margin: 0 auto;width: 1200px;">
			<div class="">
				<div class="" style="width:400px;display: table-cell;">
					<div style="display: table-cell;">
						<div class="a1"></div>
					</div>
					<div style="padding-left: 26px;width: 270px;text-align: left;display: table-cell;vertical-align: top;" class="">
						<div class="">
							<div style="color: #333333;font-size: 20px;font-weight: 500;line-height: 1;font-family: inherit;display: inline-block;">01</div>
							<div style="color: #333333;font-size: 18px;font-weight: 500;line-height: 1;padding-left: 10px;display: inline-block;">填写行程</div>
						</div>
						<div style="height: 41px;font-size: 15px;color: #9b9a9a;margin-top: 13px;" class="">录入车辆出发地、目的地、出发日期、行程天数。</div>
					</div>
				</div>
				<div class="" style="width:400px;display: table-cell;">
					<div style="display: table-cell;padding-left: 45px;">
						<div class="a2"></div>
					</div>
					<div style="padding-left: 26px;width: 270px;text-align: left;display: table-cell;vertical-align: top;" class="">
						<div class="">
							<div style="color: #333333;font-size: 20px;font-weight: 500;line-height: 1;font-family: inherit;display: inline-block;">02</div>
							<div style="color: #333333;font-size: 18px;font-weight: 500;line-height: 1;padding-left: 10px;display: inline-block;">选择车辆</div>
						</div>
						<div style="height: 41px;font-size: 15px;color: #9b9a9a;margin-top: 13px;" class="">根据查询结果选择需要的车辆。</div>
					</div>
				</div>
				<div class="" style="width:400px;display: table-cell;">
					<div style="display: table-cell;padding-left: 90px;">
						<div class="a3" style=""></div>
					</div>
					<div style="padding-left: 26px;width: 270px;text-align: left;display: table-cell;vertical-align: top;" class="">
						<div class="">
							<div style="color: #333333;font-size: 20px;font-weight: 500;line-height: 1;font-family: inherit;display: inline-block;">03</div>
							<div style="color: #333333;font-size: 18px;font-weight: 500;line-height: 1;padding-left: 10px;display: inline-block;">支付车款</div>
						</div>
						<div style="height: 41px;font-size: 15px;color: #9b9a9a;margin-top: 13px;" class="">通过微信、支付宝、银行转账等方式付款。</div>
					</div>
				</div>
			</div>
			<div class="" style="margin-top: 70px;">
				<div class="" style="width: 400px;display: table-cell;">
					<div style="display: table-cell;">
						<div class="a4"></div>
					</div>
					<div style="padding-left: 26px;width: 270px;text-align: left;display: table-cell;vertical-align: top;" class="">
						<div class="">
							<div style="color: #333333;font-size: 20px;font-weight: 500;line-height: 1;font-family: inherit;display: inline-block;">04</div>
							<div style="color: #333333;font-size: 18px;font-weight: 500;line-height: 1;padding-left: 10px;display: inline-block;">车队派车</div>
						</div>
						<div style="height: 41px;font-size: 15px;color: #9b9a9a;margin-top: 13px;" class="">查询车牌号和司机电话等详细信息。</div>
					</div>
				</div>
				<div class="" style="width: 400px;display: table-cell;">
					<div style="display: table-cell;padding-left: 45px;">
						<div class="a5"></div>
					</div>
					<div style="padding-left: 26px;width: 270px;text-align: left;display: table-cell;vertical-align: top;" class="">
						<div class="">
							<div style="color: #333333;font-size: 20px;font-weight: 500;line-height: 1;font-family: inherit;display: inline-block;">05</div>
							<div style="color: #333333;font-size: 18px;font-weight: 500;line-height: 1;padding-left: 10px;display: inline-block;">乘车出行</div>
						</div>
						<div style="height: 41px;font-size: 15px;color: #9b9a9a;margin-top: 13px;" class="">按约定的时间和线路开始行程。</div>
					</div>
				</div>
				<div class="" style="width: 400px;display: table-cell;">
					<div style="display: table-cell;padding-left: 90px;">
						<div class="a6"></div>
					</div>
					<div style="padding-left: 26px;width: 270px;text-align: left;display: table-cell;vertical-align: top;" class="">
						<div class="">
							<div style="color: #333333;font-size: 20px;font-weight: 500;line-height: 1;font-family: inherit;display: inline-block;">06</div>
							<div style="color: #333333;font-size: 18px;font-weight: 500;line-height: 1;padding-left: 10px;display: inline-block;">归来点评</div>
						</div>
						<div style="height: 41px;font-size: 15px;color: #9b9a9a;margin-top: 13px;" class="">根据司机服务质量和车况进行点评。</div>
					</div>
				</div>
			</div>

		</div>
		<!--介绍-->
		<div style="background: #f5f5f5;margin-top: 86px;">
			<div class="" style="margin: 0 auto;width: 1200px;height: 245px;text-align: left;">
				<div class="" style="display: inline-block;width: 237px;">
					<div style="margin-top: 83px;padding: 0 21px;border-left: 4px solid #ff9710;color: #333333;font-size: 20px;line-height: 1;">资质严审</div>
					<div class="des_font" style="margin: 20px 26px;">
						<div style="line-height: 1;">把关入驻</div>
						<div style="line-height: 1;margin-top: 11px;">严格监管</div>
					</div>
				</div>
				<div class="" style="display: inline-block;width: 237px;">
					<div style="margin-top: 83px;padding: 0 21px;border-left: 4px solid #ff9710;color: #333333;font-size: 20px;line-height: 1;">车源丰富</div>
					<div class="des_font" style="margin: 20px 26px;">
						<div style="line-height: 1;">车型齐全</div>
						<div style="line-height: 1;margin-top: 11px;">库存充足</div>
					</div>
				</div>
				<div class="" style="display: inline-block;width: 237px;">
					<div style="margin-top: 83px;padding: 0 21px;border-left: 4px solid #ff9710;color: #333333;font-size: 20px;line-height: 1;">价格透明</div>
					<div class="des_font" style="margin: 20px 26px;">
						<div style="line-height: 1;">差价差异</div>
						<div style="line-height: 1;margin-top: 11px;">一目了然</div>
					</div>
				</div>
				<div class="" style="display: inline-block;width: 237px;">
					<div style="margin-top: 83px;padding: 0 21px;border-left: 4px solid #ff9710;color: #333333;font-size: 20px;line-height: 1;">预订便捷</div>
					<div class="des_font" style="margin: 20px 26px;">
						<div style="line-height: 1;">一键比价</div>
						<div style="line-height: 1;margin-top: 11px;">一键比车</div>
					</div>
				</div>
				<div class="" style="display: inline-block;width: 237px;">
					<div style="margin-top: 83px;padding: 0 21px;border-left: 4px solid #ff9710;color: #333333;font-size: 20px;line-height: 1;">品质服务</div>
					<div class="des_font" style="margin: 20px 26px;">
						<div style="line-height: 1;">安全保障</div>
						<div style="line-height: 1;margin-top: 11px;">高效理赔</div>
					</div>
				</div>
			</div>
		</div>

		<!--底部-->
		<footer-view></footer-view>
	</div>
</template>

<script>
	import Util from '../../config/Util'
	import infoType from '../../config/infoType'
	import headerView from "../common/_header"
	import carCell from "../home/view/_carCell"
	import footerView from "../common/_footer"
	import search from "../home/view/_search"

	export default {
		name: "Home",
		data() {
			return {
				loadSuccess: true,
				img: "http://img.zhizhuchuxing.cn/wechat/disney.jpg",
				items: [
					'http://img.zhizhuchuxing.cn/busda/banner/banner.jpg'
					//					'https://dimg04.c-ctrip.com/images/700g0j000000ayx0473FA_1920_340_17.jpg',
					//					'https://dimg04.c-ctrip.com/images/700g0j000000ayx0473FA_1920_340_17.jpg',
					//					'https://app.busj.cn/carApp/image/20170329/ad_E204A9A0141311E7A9A08CAA30297784.jpg',
					//					'https://app.busj.cn/carApp/image/20170408/ad_FBD3FD301BEE11E7B315F697618E9601.png'

				],
				ad_swiper: {
					// 所有配置均为可选（同Swiper配置）
					notNextTick: true,
					autoplay: 3000,
					paginationClickable: true,
					observeParents: true,
					loop: true,
					loopAdditionalSlides: 1,
					autoplayDisableOnInteraction: false,
					onTransitionStart(swiper) {
						//						console.log(swiper)
					}
				},
				//				trips : [{
				//					title : '上海-千岛湖君庭大酒店',
				//					trip_days : '2',
				//					trip_type_alias : '接机',
				//					trip_type_status : '1',
				//					trip_id : '2'
				//				},{
				//					title : '上海-千岛湖33',
				//					trip_days : '2',
				//					trip_type_alias : '市区包车',
				//					trip_type_status : '1',
				//					trip_id : '2'
				//				},{
				//					title : '上海-千岛湖22',
				//					trip_days : '2',
				//					trip_type_alias : '市区包车',
				//					trip_type_status : '1',
				//					trip_id : '2'
				//				},{
				//					title : '上海-千岛湖111',
				//					trip_days : '2',
				//					trip_type_alias : '送机',
				//					trip_type_status : '1',
				//					trip_id : '2'
				//				}],
				trips: [],
				car_imgs: [],
				title_type: {
					type_id: 1,
					type_name: '用车历史'
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.$refs.headerView.loginUserInfo();
			})
		},
		mounted() {
			//			console.log("每次切换都会触发我");
			//			this.swiper.slideTo(3, 1000, false)
			this.$nextTick(() => {
				this.initData();
			})
		},
		components: {
			headerView,
			carCell,
			footerView,
			search
		},
		methods: {
			formatTitle(item) {
				return item.start_station + ' — ' + item.end_station;
			},
			initData() {
				Util.post({
					obj: this,
					url: '/home-page/init',
					success: (res_data) => {
						Util.ZZLog(res_data);
						this.loadSuccess = true;
						if(!res_data.flag) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							//历史行程
							this.trips = data.useBusHistory;
							this.trips = this.trips.splice(0, 4);
							//丰富车型
							this.car_imgs = data.busImage;
							this.title_type = data.title_type;

							this.items = data.banner;
							if(Util.myBrowser().IEVersion==9){
								this.items=[data.banner[1]];
							}
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			selectCell(item) {
				let data = {
					bus_type: item.type_id,
					start_station_name: item.start_station,
					start_station_id: item.start_station_id,
					end_station_name: item.end_station,
					end_station_id: item.end_station_id,
					day_count: item.day_count,
					start_run_date: Util.after(Util.getDateTime(0)),
					start_run_time: ''
				}
				this.$router.push({
					name: 'busList',
					query: data
				})
			},
			getLabelStyles(item) {
				return {
					background: 'url(' + item.image_url + ')'
				}
			}
		},
		computed: {
			swiper() {
				//				return this.$refs.mySwiperA.swiper
			}
		}
	}
</script>

<style scoped="">
	.car_trip {
		width: 285px;
		height: 110px;
		border-radius: 4px;
		margin-right: 20px;
	}

	.car_trip:last-child {
		margin-right: 0px !important;
	}

	.car_img {
		background-color: #333333;
		width: 225px;
		height: 275px;
		margin-right: 18px;
	}

	.car_img:last-child {
		margin-right: 0px !important;
	}

	.des_font div {
		color: #7f7f7f;
		font-size: 14px;
		text-align: left;
	}

	.a1 {
		width: 40px;
		height: 39px;
		background-image: url('../../assets/images/home/queren.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a2 {
		width: 40px;
		height: 39px;
		background-image: url('../../assets/images/home/yuding.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a3 {
		width: 40px;
		height: 39px;
		background-image: url('../../assets/images/home/zhifu.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a4 {
		width: 40px;
		height: 39px;
		background-image: url('../../assets/images/home/paiche.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a5 {
		width: 40px;
		height: 39px;
		background-image: url('../../assets/images/home/chuxing.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a6 {
		width: 40px;
		height: 39px;
		background-image: url('../../assets/images/home/pingjia.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a7 {
		width: 20px;
		height: 20px;
		background-image: url('../../assets/images/home/yongchelishi.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.a8 {
		width: 20px;
		height: 20px;
		background-image: url('../../assets/images/home/remen.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
