<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="Manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="UserManage">
						<template slot="title"><i class="el-icon-document"></i>用户管理</template>
						<el-menu-item index="ManageLawyer">管理律师</el-menu-item>
						<el-menu-item index="AddLawyer">添加律师</el-menu-item>
					</el-submenu>
					<el-submenu index="CustomerManage">
						<template slot="title"><i class="el-icon-document"></i>客户管理</template>
						<el-menu-item index="ManageCustomer">管理客户</el-menu-item>
						<el-menu-item index="AddCustomer">添加客户</el-menu-item>
					</el-submenu>
					<el-submenu index="CaseManage">
						<template slot="title"><i class="el-icon-document"></i>案件管理</template>
						<el-menu-item index="ManageCase">管理案件</el-menu-item>
						<el-menu-item index="AddCase">新增案件</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-menu-item index="Money">
						<template slot="title"><i class="el-icon-document"></i>费用清算</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->			
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},

		watch: {
			'$route' (to, from) {
			}
		},

		methods: {
			jumpManageLawyer(){
				this.$router.push({path: '/ManageLawyer', query: {r: Math.random()}});
			}
		}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>