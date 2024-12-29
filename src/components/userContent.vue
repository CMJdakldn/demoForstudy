<template>
	<div id="div_table">
		<!-- 表格定义列名 -->
		<el-table id="table_1" :data="tableData" border style="width: 100%" v-show="activeTab === 'side_2'">
			<el-table-column prop="name" label="姓名" width="200">
			</el-table-column>
			<el-table-column prop="workid" label="工号" width="150">
			</el-table-column>
			<el-table-column prop="posts" label="职位" width="150">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
						移除
					</el-button> -->
					<el-button @click="openDeleteDialog(scope.$index)" type="text" size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加用户 -->
		<el-button type="primary" id="AddBtn" @click="openDialog" v-show="activeTab === 'side_2'">+ 添加用户</el-button>
		<!-- 删除用户 -->
		<el-dialog title="删除确认" :visible.sync="deleteDialogVisible">
			<p>确认删除此用户吗？</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="deleteDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleDelete">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 添加用户弹窗 -->
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="工号" :label-width="formLabelWidth" prop="workid">
					<el-input v-model="form.workid" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位" :label-width="formLabelWidth" prop="posts">
					<el-select v-model="form.posts" placeholder="请选择职位">
						<el-option label="开发" value="开发"></el-option>
						<el-option label="测试" value="测试"></el-option>
					</el-select>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveData()">确 定</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
	import {
		mapActions
	} from 'vuex';
	export default {
		props: ['activeTab'],
		data() {
			return {
				tableData: [],
				dialogTableVisible: false,
				dialogFormVisible: false,
				deleteDialogVisible: false,
				form: {
					name: '',
					workid: '',
					posts: ''
				},
				formLabelWidth: '120px',
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					workid: [{
							required: true,
							message: '请输入工号',
							trigger: 'blur'
						},
						{
							pattern: /^[0-9]*$/,
							message: '工号必须为数字',
							trigger: 'blur'
						}
					],
					posts: [{
						required: true,
						message: '请选择职位',
						trigger: 'change'
					}]
				}
			}
		},

		methods: {
			...mapActions(['addUser', 'removeUser']),

			openDeleteDialog(index) {
				this.deleteIndex = index;
				this.deleteDialogVisible = true;
			},

			handleDelete() {
				const index = this.deleteIndex; // 获取待删除的索引
				if (index >= 0 && index < this.tableData.length) {
					const userToDelete = this.tableData[index]; // 获取删除的用户
					console.log('删除用户:', userToDelete); // 调试用
					this.removeUser(userToDelete); // 调用 Vuex Action 删除用户
					this.tableData.splice(index, 1); // 本地更新表格数据
					this.deleteDialogVisible = false; // 关闭对话框
					this.deleteIndex = null; // 重置索引
				} else {
					console.error('无效的索引:', index);
				}
			},
			// 打开弹窗
			openDialog() {
				this.dialogFormVisible = true;
			},
			// 保存数据并新增一行
			saveData() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.addUser({
							name: this.form.name,
							workid: this.form.workid,
							posts: this.form.posts
						});
						this.tableData.push({
							name: this.form.name,
							workid: this.form.workid,
							posts: this.form.posts
						});
						// 关闭弹窗
						this.dialogFormVisible = false;
						// 重置表单
						this.form = {
							description: '',
							date: '',
							name: ''
						};
					} else {
						console.log('表单验证失败');
						return false;
					}
				});

			}
		},
	};
</script>
<style>
	#div_table {
		width: 100%
	}

	#table_1 {
		margin-top: 30px;
		margin-left: 20px;
	}

	#AddBtn {
		width: 21%;
		margin-left: 76%;
	}
</style>