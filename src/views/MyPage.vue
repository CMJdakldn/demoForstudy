<template>
	<div class = "mypage">
		<div id="topnav">
			<topNav @changeTab="changeTab"/>
		</div>
		
		<div id = "conten_1">
			<sideNav v-bind:activeTab="activeTab"/>
			<bugContent id = "bugContent_1" v-bind:activeTab="activeTab"/>
			<userContent id = "userContent_1" v-bind:activeTab="activeTab"/>
		</div>
		
	</div>
	
</template>

<script>
import topNav from '@/components/topNav.vue'
import sideNav from '@/components/sideNav.vue'
import bugContent from '../components/bugContent.vue'
import userContent from '@/components/userContent.vue'
//引入element-ui所提供样式
import ElementUI from 'element-ui'
// element-ui所提供的css样式
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'MyPage',
  components: {
	topNav,
	sideNav,
	bugContent,
	userContent
  },
  data()
  {
	  return{
		  activeTab:"side_1"
	  }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;  // 更新 activeTab
    }
  }
}
</script>

<style>
	
.mypage{
	/* display: block; */
}	
#topnav{
	margin-top: 20px;
	height: 60px;
}
#conten_1{
	margin-top: 20px;
	display: flex;
}
#bugContent_1{
	
	margin-left: 100px;
}
#userContent_1
{
	margin-left: 0;
}
</style>