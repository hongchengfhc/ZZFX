<template>
<div id="app" v-if="!hide">
	<keep-alive>
		<!-- <transition name="bounce" translate mode="out-in"> -->
		<!-- <transition name="fade" mode="out-in"> -->
		<router-view></router-view>
		<!-- </transition> -->
	</keep-alive>
</div>
</template>

<script>
import Util from './config/Util'
export default {
	name: 'app',
	data() {
		return {
			hide: true
		}
	},
	mounted() {
		let sys = Util.myBrowser();
		if (sys.IEVersion==9) {
			this.hide=false;
			this.$Modal.confirm({
				title: '温馨提示',
				content: "hi，您当前的浏览器版本过低，可能会造成体验不佳，建议升级浏览器",
				okText:"前往下载",
				cancelText:"继续浏览",
				onOk: () => {
					window.location.href = 'https://www.baidu.com/s?wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8&rsv_spt=1&rsv_iqid=0xc14a012200001fc6&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=6&rsv_sug1=6&rsv_sug7=101&rsv_t=cecf%2F1uKoT6MkqFSPV%2BPPskS2dStgeiRXaeRJChjoPQ1E0hbZFIh%2F%2FAcM4lDpZ2u7OaS&rsv_sug2=0&prefixsug=%25E8%25B0%25B7%25E6%25AD%258C&rsp=1&inputT=2617&rsv_sug4=3470';
				},onCancel:()=>{

				}
			})
		}else{
			this.hide=false;
		}
	}
}
</script>

<style>
#app {
	/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}


/* 可以设置不同的进入和离开动画 */


/* 设置持续时间和动画函数 */


/*.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: .5;
}*/

.bounce-enter-active {
	animation: bounce-in .5s;
}

.bounce-leave-active {
	animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.5);
	}
	100% {
		transform: scale(1);
	}
}
</style>
