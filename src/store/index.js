import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo, loadLawyer} from '@/api/getData'
import {loadCustomer, loadCase } from '../api/getData';

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg',
		username: '2'
	},
	lawyerInfo: [],
	customerInfo: [],
	caseInfo: [],
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	saveLawyerInfo(state, lawyerInfo){
		lawyerInfo.forEach(function(item){
			state.lawyerInfo.push(item);
		});
	},
	saveCustomerInfo(state, customerInfo){
		customerInfo.forEach(function(item){
			state.customerInfo.push(item);
		});
	},
	saveCaseInfo(state, caseInfo){
		caseInfo.forEach(function(item){
			state.caseInfo.push(item);
		});
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	async getLawyerData({commit}){
		state.lawyerInfo = [];
		try{
			const res = await loadLawyer();
			if (res.status === '1') {
				commit('saveLawyerInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	async getCustomerData({commit}){
		try{
			const res = await loadCustomer();
			if (res.status === '1') {
				commit('saveCustomerInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	async getCaseData({commit}){
		try{
			const res = await loadCase();
			if (res.status === '1') {
				commit('saveCaseInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})