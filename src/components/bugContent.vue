<template>
	<div id="div_table">
		<el-table id="table_1" :data="tableData" border style="width: 100%" v-show="activeTab === 'side_1'">
			<el-table-column prop="description" label="BUG描述" width="200">
			</el-table-column>
			<el-table-column prop="date1" label="提交日期" width="150">
			</el-table-column>
			<el-table-column prop="name" label="指派给" width="150">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-button type="primary" id="AddBtn" @click="openDialog" v-show="activeTab === 'side_1'">+ 提交BUG</el-button>

		<el-dialog title="提交BUG" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="BUG描述" :label-width="formLabelWidth" prop="description">
					<el-input v-model="form.description" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="提交日期" :label-width="formLabelWidth" prop="date1">
					<!-- <el-date-picker type="date" autocomplete="off" placeholder="选择日期" v-model="form.date1"
						style="width: 100%;"></el-date-picker> -->
					<el-input v-model="form.date1" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="指派给" :label-width="formLabelWidth" prop="name">
					<el-select v-model="form.name" placeholder="请选择用户">
						<el-option v-for="(user, index) in getUsers" :key="index" :label="user" :value="user">
						</el-option>
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
		mapGetters
	} from 'vuex';
	export default {

		props: ['activeTab'],
		data() {
			return {
				tableData: [],
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					description: '',
					date1: '',
					name: ''
				},
				formLabelWidth: '120px',
				rules: {
					description: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					date1: [{
						required: true,
						message: '请输入日期',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请选择负责人',
						trigger: 'change'
					}]
				}
			}
		},
		computed: {
			...mapGetters(['getUsers']) // 获取 Vuex 中存储的用户信息
		},
		watch: {
			getUsers(newUsers) {
				this.tableData.forEach(row => {
					if (!newUsers.includes(row.name)) {
						// 将不在getUsers中的用户移除
						this.tableData = this.tableData.filter(item => item.name !== row.name);
					}
				});
			}
		},
		methods: {
			deleteRow(index, rows) {
				rows.splice(index, 1);
				this.$forceUpdate();
			},
			// 打开弹窗
			openDialog() {
				this.dialogFormVisible = true;
			},
			// 保存数据并新增一行
			saveData() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.tableData.push({
							description: this.form.description,
							date1: this.form.date1,
							name: this.form.name
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
	}
</script>
<style>
	#div_table {
		width: 100%
	}

	#table_1 {
		margin-top: 30px;
		margin-left: 10px;
	}

	#AddBtn {
		width: 21%;
		margin-left: 76%;
	}
</style>