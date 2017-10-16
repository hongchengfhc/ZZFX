<template lang="html">
  <div class="startShow ib">
	  <div v-if="allGray==false" class="ib" style="line-height:17px;vertical-align:middle;">
			  <i v-for="num in formatStar(value).all" class="ib star" type="star" size="18" style="background-image:url('static/images/bus/star_all.png');width:15px;height:15px;background-size:100% 100%;background-repeat:no-repeat;"></i>
			  <i v-if="formatStar(value).half!=0" class="ib star" type="ios-star-half" size="18" style="background-image:url('static/images/bus/star_half.png');width:15px;height:15px;background-size:100% 100%;background-repeat:no-repeat;"></i>
			  <i v-for="num in formatStar(value).empty" class="ib star" type="star" size="18" style="background-image:url('static/images/bus/star_empty.png');width:15px;height:15px;background-size:100% 100%;background-repeat:no-repeat;"></i>
			  <div class="ib" style="font-size:14px;color:#999;margin-left:10px;vertical-align:top;" v-html="value?value:''">3.0</div>
	  </div>
	  <div v-else class="ib" style="line-height:17px;vertical-align:middle;">
		  	<i v-for="num in formatStar(value).all" class="ib star" type="star" size="18" style="background-image:url('static/images/bus/star_empty.png');width:15px;height:15px;background-size:100% 100%;background-repeat:no-repeat;"></i>
	  		<i v-if="formatStar(value).half!=0" class="ib star" type="ios-star-half" size="18" style="background-image:url('static/images/bus/star_empty.png');width:15px;height:15px;background-size:100% 100%;background-repeat:no-repeat;"></i>
	  		<i v-for="num in formatStar(value).empty" class="ib star" type="star" size="18" style="background-image:url('static/images/bus/star_empty.png');width:15px;height:15px;background-size:100% 100%;background-repeat:no-repeat;"></i>
	  		<div class="ib" style="font-size:14px;color:#999;margin-left:10px;vertical-align:top;" v-html="value?value:''">3.0</div>
	  </div>
  </div>
</template>

<script>
import Util from '../../../config/Util'
export default {
	name: "startShow",
	props: {
		starValue: {
			// required:true,
			default:'3.0',
			type:[String, Number]
		},
		allGray: {
			default:false,
			type:[Boolean]
		}
	},
	data() {
		return {
			value: ''
		}
	},
	watch: {
		starValue(cur, old) {
			this.value = cur;
		}
	},
	mounted() {
		this.value = this.starValue;
	},
	methods: {
		formatStar(value) {
			if (value > 5) value = '5.0';
			let star = (value - 0).toFixed(1) + '';
			let arr = star.split('.');
			let all = arr[0] - 0;
			let half = arr[1] - 0;
			if (half != 0) half = 1;
			let empty = 5 - Math.ceil(star);
			let starObj = {
				all,
				half,
				empty
			}
			return starObj;
		}
	}
}
</script>

<style lang="css" scoped>
.star:not(:first-child){
    margin-left:5px;
}
</style>
