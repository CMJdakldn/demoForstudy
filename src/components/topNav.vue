<template>
	<div id="div_top">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
			<el-menu-item index="1" @click="changeTab('side_1')">BUG管理</el-menu-item>
			<el-menu-item index="2" @click="changeTab('side_2')">用户管理</a></el-menu-item>
		</el-menu>
		<div class="line"></div>
	</div>

</template>


<script>
	export default {
		data() {
			return {
				activeIndex: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			changeTab(tab) {
				this.$emit('changeTab', tab); // 发射事件
			}
		}
	}
</script>