<template>
<el-form :model="regform" ref="regform">
							<el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                              <el-input v-model="regform.username" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                              <el-input v-model="regform.password" auto-complete="off"></el-input>
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
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-button type="primary" @click="onSubmit('regform')">添加</el-button>
    <el-button>取消</el-button>
    </el-form-item>
    </el-form>
</template>

<script>
import {login, getAdminInfo, register,addLawyer} from '@/api/getData'
import {mapActions, mapState} from 'vuex'
  export default {
    data() {
      return {
				input: '',
        formLabelWidth:"80px",  
        regform: {
          username: '',
					password: '',
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
    methods: {
        
     async onSubmit(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						const res = await addLawyer({username: this.regform.username, password: this.regform.password, lawyername: this.regform.lawyername, type: this.regform.type, tel: this.regform.tel, idcard: this.regform.idcard, age: this.regform.age, position: this.regform.position, sex: this.regform.sex})
						if (res.status == 1) {


							this.$message({
		                        type: 'success',
								message: '添加成功'
														});
														this.dialogFormVisible=false
                            this.$router.push('Manage')



						}else{
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
        
      }
    }
  }
</script>
  
