<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive>
    		<!--<transition name="fade" mode="out-in">-->
    			<router-view></router-view>
    		<!--</transition>-->
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.fade-enter-active, .fade-leave-active{
	transition:opacity 0.1s
}
.fade-enter, .fade-leave-active{
	opacity: 0;
}



</style>
