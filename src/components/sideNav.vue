<template>
	<div id="div_side">
		<el-col :span="12" >
			<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

				<el-menu-item index="1" v-show="activeTab === 'side_1'">
					<i class="el-icon-menu"></i>
					<span slot="title">{{side1_message}}</span>
				</el-menu-item>
				<el-menu-item index="1" v-show="activeTab === 'side_2'">
					<i class="el-icon-menu"></i>
					<span slot="title">{{side2_message}}</span>
				</el-menu-item>
			</el-menu>
		</el-col>

	</div>

</template>


<script>
	export default {
		name: 'div_side',
		props:['activeTab'],
		data() {
			return {
				side1_message: "BUG列表",
				side2_message: "用户列表"
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style>
	#div_side {
		/* display: inline-block; */
		display: flex;
		margin-top: 30px;
		width: 5%;
		height: 800px;
	}
</style>