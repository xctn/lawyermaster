import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/components/Login')), 'Login');
const Manage = r => require.ensure([], () => r(require('@/components/Manage')), 'Manage');
const Home = r => require.ensure([], () => r(require('@/components/Home')), 'Home');
const ManageLawyer = r => require.ensure([], () => r(require('@/components/ManageLawyer')), 'ManageLawyer');
const AddLawyer = r => require.ensure([], () => r(require('@/components/AddLawyer')), 'AddLawyer');
const ManageCustomer = r => require.ensure([], () => r(require('@/components/ManageCustomer')), 'ManageCustomer');
const AddCustomer = r => require.ensure([], () => r(require('@/components/AddCustomer')), 'AddCustomer');
const ManageCase = r => require.ensure([], () => r(require('@/components/ManageCase')), 'ManageCase');
const AddCase = r => require.ensure([], () => r(require('@/components/AddCase')), 'AddCase');
const Money = r => require.ensure([], () => r(require('@/components/Money')), 'Money');


export default new Router({
  routes: [
    {
      	path: '/',
      	name: 'System Login',
      	component: Login
    },
    {
    	path: '/Manage',
    	name: 'Lawyer Manage',
      component: Manage,
      children: [
      {
        path: '',
        component: ManageLawyer,
        meta: []
      },
      {
        path: '/AddLawyer',
        component: AddLawyer,
        meta: []
      },
      {
        path: '/ManageCustomer',
        component: ManageCustomer,
        meta: []
      },
      {
        path: '/AddCustomer',
        component: AddCustomer,
        meta: []
      },
      {
        path: '/ManageCase',
        component: ManageCase,
        meta: []
      },
      {
        path: '/AddCase',
        component: AddCase,
        meta: []
      },
      {
        path: '/Money',
        component: Money,
        meta: []
      }
    ]
    }
  ]
})
