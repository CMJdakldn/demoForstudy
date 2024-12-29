import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [] // 用于存储用户姓名等信息
	},
	mutations: {
		// 添加用户
		addUser(state, user) {
			state.users.push(user);
		},
		removeUser(state, userToRemove) {
			state.users = state.users.filter(user => user.name !== userToRemove.name);
		}

	},
	actions: {
		addUser({
			commit
		}, user) {
			commit('addUser', user);
		},
		removeUser({
			commit
		}, userToRemove) {
			commit('removeUser', userToRemove);
		}
	},
	getters: {
		// 获取所有用户的姓名
		getUsers(state) {
			return state.users.map(user => user.name);
		}
	}
})