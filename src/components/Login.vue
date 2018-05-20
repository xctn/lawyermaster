<template>
	<div class="login_page fillcontain">
		<transition name="form-fade" mode="in-out">
			<section class="form_contianer" v-show="showLogin">
				<div class="manage_tip">
					<p>LawyerMaster Login</p>
				</div>
				<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
					</el-form-item>
	
					<el-form-item>
						<el-button type="primary" @click="dialogFormVisible=true" class="submit_btn">注册</el-button>
	
					</el-form-item>
				</el-form>
			</section>
		</transition>
		<el-dialog title="新增用户" :visible.sync="dialogFormVisible">
			<el-form :model="regform" ref="regform">
				<el-form-item prop="_username" label="用户名" :label-width="formLabelWidth">
					<el-input v-model="regform._username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="_password" label="密码" :label-width="formLabelWidth">
					<el-input v-model="regform._password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="lawyername" label="姓名" :label-width="formLabelWidth">
					<el-input v-model="regform.lawyername" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="type" label="用户类型" :label-width="formLabelWidth">
					<el-input v-model="regform.type" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="tel" label="电话" :label-width="formLabelWidth">
					<el-input v-model="regform.tel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="idcard" label="身份证" :label-width="formLabelWidth">
					<el-input v-model="regform.idcard" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="age" label="年龄" :label-width="formLabelWidth">
					<el-input v-model="regform.age" auto-complete="off"></el-input>
				</el-form-item>
	
				<el-form-item prop="position" label="律师级别" :label-width="formLabelWidth">
					<el-select v-model="regform.position" placeholder="请选择律师级别">
						<el-option label="一级律师" value="1"></el-option>
						<el-option label="二级律师" value="2"></el-option>
						<el-option label="三级律师" value="3"></el-option>
						<el-option label="四级律师" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
					<el-select v-model="regform.sex" placeholder="请选择性别">
						<el-option label="男" value="male"></el-option>
						<el-option label="女" value="female"></el-option>
					</el-select>
				</el-form-item>
	
				<el-form-item>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<el-button type="primary" @click="signIn('regform')">确 定</el-button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<el-button @click="dialogFormVisible = false">取 消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	// import {
	// 	login,
	// 	getAdminInfo,
	// 	register
	// } from '@/api/getData'
	// import {
	// 	mapActions,
	// 	mapState
	// } from 'vuex'
	
	export default {
		data() {
			return {
				formLabelWidth: "120px",
				dialogFormVisible: false,
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
				showLogin: true,
	
				regform: {
					_username: '',
					_password: '',
					lawyername: '',
					type: '',
					tel: '',
					idcard: '',
					age: '',
					position: '',
					sex: ''
	
				},
			}
		},
	
		mounted() {
			this.showLogin = true;
			// if (!this.adminInfo.id) {
			// 	this.getAdminData()
			// }
		},
	
		computed: {
			// ...mapState(['adminInfo']),
		},
	
		methods: {
			// ...mapActions(['getAdminData']),
			async submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (valid) {
						//const res = await login({username: this.loginForm.username, password: this.loginForm.password})
	
						this.$request.get(
							'/api/login?username=' + this.loginForm.username + "&password=" + this.loginForm.password + "&type=0"
							)
							.then((response) => {

							

								let type = response.data.type;
								if (type) {
									//this.$Message.success("登录成功");
									this.$message({
										type: 'success',
										message: response.status
									});
	

									this.$ls.set("userinfo", response.data);
									//this.$router.push('/');
									this.$router.push('Manage')
								} else {
									this.$message({
										type: 'error',
										message: "登录失败"
									});
	
	
								}
							}
							).catch((error) => {
								console.log(error);
	
	
							});
	
	
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
			async signIn(formName) {
	
	
				this.$refs[formName].validate(async(valid) => {
	
					if (valid) {
						const res = await register({
							username: this.regform._username,
							password: this.regform._password,
							lawyername: this.regform.lawyername,
							type: this.regform.type,
							tel: this.regform.tel,
							idcard: this.regform.idcard,
							age: this.regform.age,
							position: this.regform.position,
							sex: this.regform.sex
						})
						if (res.status == 1) {
	
	
							this.$message({
								type: 'success',
								message: '注册成功'
							});
							this.dialogFormVisible = false
	
	
	
						} else {
							this.$message({
								type: 'error',
								message: res.message
							});
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的值',
							offset: 100
						});
						return false;
					}
				});
			},
	
		},
	
		watch: {
			adminInfo: function(newValue) {
				if (newValue.id) {
					this.$message({
						type: 'success',
						message: '检测到您之前登录过，将自动登录'
					});
					this.$router.push('Manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page {
		background-color: #324057;
	}
	
	.manage_tip {
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p {
			font-size: 34px;
			color: #fff;
		}
	}
	
	.form_contianer {
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn {
			width: 100%;
			font-size: 16px;
		}
	}
	
	.tip {
		font-size: 12px;
		color: red;
	}
	
	.form-fade-enter-active,
	.form-fade-leave-active {
		transition: all 1s;
	}
	
	.form-fade-enter,
	.form-fade-leave-active {
		transform: translate3d(0, -50px, 0);
		opacity: 0;
	}
</style>
