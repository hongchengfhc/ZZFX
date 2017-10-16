<template>
	<div class="photo">
		<Modal class="t_photo" v-model="photo_model" width="1000" height="945">
			<!--title-->
			<div class="">
				<div class="photo_title" style="text-align: center;">参考车辆图片</div>
			</div>
			<div class="" style="margin: 15px 15px;border: 1px solid #EEEEEE;width: 942px;height: 562px;">
				<img class="" :src="realimg" style="width: 940px;height: 560px;" />
			</div>
			<!--轮播-->
			<div style="padding: 10px;">
				<swiper :options="photo_swiper" ref="" style="padding: 0 50px;" :style="getBrowser()">
					<swiper-slide v-for="(item,index) in photo_items" :key="index" :style="getBrowserSlide()" style="height: 90px;width: 155px;cursor: pointer;">
						<img :src="item.show" style="height: 90px;width: 155px;" />
					</swiper-slide>
					<div class="swiper-button-prev" slot="button-prev"></div>
					<div class="swiper-button-next" slot="button-next"></div>
				</swiper>
			</div>
			<!--巴士达认证-->
			<div class="" style="margin-top: 40px;">
				<div class="" style="text-align: center;">
					<div style="font-size: 18px;color: #333333;line-height: 1;display: inline-block;vertical-align: middle;">巴士达已认证</div>
					<!--<Icon type="checkmark-circled" style="font-size: 18px;color: #FFstart_res_time;margin-left: 5px;margin-top: 2px;"></Icon>-->
					<div class="renzheng" style="display: inline-block;vertical-align: middle;"></div>
				</div>
				<div class="" style="width: 620px;margin: 0 auto;margin-top: 40px;">
					<div class="" style="width: 152px;display: inline-block;text-align: center;">
						<div class="a" style="width: 33px;height: 38px;margin: 0 auto;"></div>
						<div style="margin-top: 10px;font-size: 14px;line-height: 1;color: #333333;">车辆行驶证</div>
					</div>
					<div class="" style="width: 152px;display: inline-block;text-align: center;">
						<div class="a" style="width: 33px;height: 38px;margin: 0 auto;"></div>
						<div style="margin-top: 10px;font-size: 14px;line-height: 1;color: #333333;">车辆道路运输证</div>
					</div>
					<div class="" style="width: 152px;display: inline-block;text-align: center;">
						<div class="a" style="width: 33px;height: 38px;margin: 0 auto;"></div>
						<div style="margin-top: 10px;font-size: 14px;line-height: 1;color: #333333;">车辆安全责任险</div>
					</div>
					<div class="" style="width: 152px;display: inline-block;text-align: center;">
						<div class="a" style="width: 33px;height: 38px;margin: 0 auto;"></div>
						<div style="margin-top: 10px;font-size: 14px;line-height: 1;color: #333333;">司机从业资格证</div>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Util from '../../../config/Util'
	export default {
		data() {
			return {
				photo_model: false,
				photo_items: [
					//					 {
					//					 	small: "http://img.zhizhuchuxing.cn/wechat/disney.jpg",
					//					 },{
					//					 	small: "http://img.zhizhuchuxing.cn/busda/shouqin.png",
					//					 },
					//					 {
					//					 	small: "http://img.zhizhuchuxing.cn/wechat/disney.jpg",
					//					 },{
					//					 	small: "http://img.zhizhuchuxing.cn/busda/shouqin.png",
					//					 },
					//					 {
					//					 	small: "http://img.zhizhuchuxing.cn/wechat/disney.jpg",
					//					 },{
					//					 	small: "http://img.zhizhuchuxing.cn/busda/shouqin.png",
					//					 }
				],
				realimg: '',
				photo_swiper: {
					// 所有配置均为可选（同Swiper配置）
					notNextTick: true,
					paginationClickable: true,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					//					observeParents: true,
					//					paginationClickable: true,
					//					loop : true,
					loopAdditionalSlides: 1,
					slidesPerView: '5',
					spaceBetween: 12,
					//					autoplayDisableOnInteraction: false,
					onSlideNextEnd: (swiper) => {
						this.realimg = this.photo_items[swiper.realIndex].show;
					},
					onSlidePrevEnd: (swiper) => {
						this.realimg = this.photo_items[swiper.realIndex].show;
					},
					onClick: (swiper) => {
						//						console.log(swiper);
						let index = swiper.clickedIndex?swiper.clickedIndex:swiper.realIndex;
						this.realimg = this.photo_items[index].show;
					},
					//					onTransitionStart(swiper) {
					//						console.log(swiper)
					//					}
					//					swipclick: (swiper)=>{
					//						console.log(swiper);
					//					}

				}
			}
		},
		mounted: function() {
			//			this.photo_model = true;
		},
		methods: {
			getBrowser() {
				var sys = Util.myBrowser();
				return {
					display: sys.IEVersion == 9 ? 'table' : ''
				}
			},
			getBrowserSlide() {
				var sys = Util.myBrowser();
				return {
					display: sys.IEVersion == 9 ? 'table-cell' : ''
				}
			}
		}

	}
</script>

<style>
	.t_photo .ivu-modal-footer {
		padding-bottom: 20px;
		border-top: 1px solid #FFFFFF !important;
	}

	.t_photo .ivu-modal-footer .ivu-btn {
		display: none !important;
	}

	.t_photo .ivu-modal .ivu-icon-ios-close-empty {
		font-size: 45px;
		color: #999;
		transition: color 0.2s ease;
		position: relative;
		top: 1px;
	}

	.t_photo .ivu-modal-close {
		font-size: 12px;
		position: absolute;
		right: 16px;
		top: 2px;
		overflow: hidden;
		cursor: pointer;
		z-index: 1;
	}
</style>

<style scoped>
	.photo_title {
		color: #333333;
		font-size: 20px;
		line-height: 1;
	}

	.swiper-button-prev.swiper-button-disabled,
	.swiper-button-next.swiper-button-disabled {
		opacity: 1;
		cursor: auto;
		pointer-events: none;
	}

	.swiper-button-prev {
		background-image: url("../../../assets/images/bus/left_jiantou.png");
		width: 50px;
		height: 100px;
		background-size: 100% 100%;
		left: 0;
		top: 22px;
	}

	.swiper-button-next {
		background-image: url("../../../assets/images/bus/right_jiantou.png");
		width: 50px;
		height: 100px;
		background-size: 100% 100%;
		top: 22px;
		right: 0;
	}

	.a {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../../assets/images/bus/renzheng2.png');
	}

	.renzheng {
		width: 18px;
		height: 18px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../../assets/images/bus/renzheng.png');
		margin-left: 5px;
	}
</style>
