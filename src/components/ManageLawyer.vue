<template>
<div>
    <el-row>
            <el-col :span="3" class="grid">
                <el-input v-model="input" placeholder="请输入内容" ></el-input>
            </el-col>
            <el-col :span="1" class="grid">
                <el-button type="success" icon="el-icon-search" >搜索</el-button>
            </el-col>
        </el-row>
        <br>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="lawyername"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="type"
      label="用户类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      width="140">
    </el-table-column>
    <el-table-column
      prop="idcard"
      label="身份证"
      width="190">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="70">
    </el-table-column>
    <el-table-column
      prop="position"
      label="律师级别"
      width="90">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="70">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-dialog title="修改用户" :visible.sync="dialogFormVisible">
  <el-form :model="regform" ref="regform">
							<el-form-item prop = "_username" label="用户名" :label-width="formLabelWidth">
                              <el-input v-model="regform._username" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop = "_password" label="密码" :label-width="formLabelWidth">
                              <el-input v-model="regform._password" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop = "lawyername" label="姓名" :label-width="formLabelWidth">
                              <el-input v-model="regform.lawyername" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop = "type" label="用户类型" :label-width="formLabelWidth">
                              <el-input v-model="regform.type" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop = "tel" label="电话" :label-width="formLabelWidth">
                              <el-input v-model="regform.tel" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop = "idcard" label="身份证" :label-width="formLabelWidth">
                              <el-input v-model="regform.idcard" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop = "age" label="年龄" :label-width="formLabelWidth">
                              <el-input v-model="regform.age" auto-complete="off"></el-input>
							  </el-form-item>

						    <el-form-item prop = "position" label="律师级别" :label-width="formLabelWidth">
                              <el-select v-model="regform.position" placeholder="请选择律师级别">
                               <el-option label="一级律师" value="1"></el-option>
                               <el-option label="二级律师" value="2"></el-option>
							   <el-option label="三级律师" value="3"></el-option>
							   <el-option label="四级律师" value="4"></el-option>
                            </el-select>
                           </el-form-item>
						    <el-form-item prop = "sex" label="性别" :label-width="formLabelWidth">
                              <el-select v-model="regform.sex" placeholder="请选择性别">
                               <el-option label="男" value="male"></el-option>
                               <el-option label="女" value="female"></el-option>
                            </el-select>
                           </el-form-item>
						  
                  <el-form-item>
			     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  <el-button type="primary" @click="signIn('regform')" >确 定</el-button>
				   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  <el-button @click="dialogFormVisible = false">取 消</el-button>
				  </el-form-item>
				  </el-form>
						  
				  </el-dialog>
</div>
</template>

<script>
  // import {login, getAdminInfo, register, loadLawyer, updateLawyer} from '@/api/getData'
	// import {mapActions, mapState} from 'vuex'
  export default {
    data() {
      return {
        input: '',
        dialogFormVisible: false,
        formLabelWidth: '100px',
        tableData: [],
        regform: {
                    _username: '',
					          _password: '',
				          	lawyername: '',
				           	type: '',
				          	tel: '',
				          	idcard: '',
				          	age: '',
         		      	position: '',
          		     	sex: '',
          			    delivery: false,
          			    type: [],
         			      resource: '',
          			    desc: ''
                }
      }
    },
    created() {
      // // this.getLawyerData();
      // this.tableData = this.lawyerInfo;
      // console.log(this.tableData);
    },
    computed: {
      
    },
    methods: {
      // ...mapActions(['getLawyerData']),
      handleClick(row) {
        this.dialogFormVisible = true;
        this.regform._username = row.username
        this.regform._password = row.password
        this.regform.idcard = row.idcard
        this.regform.type = row.type
        this.regform.tel = row.tel
        this.regform.age = row.age
        this.regform.position = row.position
        this.regform.sex = row.sex
        this.regform.lawyername =row.lawyername
        console.log();
        
      },
      async signIn(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						// const res = await updateLawyer({username: this.regform._username, password: this.regform._password, lawyername: this.regform.lawyername, type: this.regform.type, tel: this.regform.tel, idcard: this.regform.idcard, age: this.regform.age, position: this.regform.position, sex: this.regform.sex})
						if (1 == 1) {


							// this.$message({
		          //               type: 'success',
							// 	            message: '更改成功'
              //               });
              //               this.dialogFormVisible=false
              //               this.$router.push('Manage')



						}else{
							// this.$message({
		          //               type: 'error',
		          //               message: res.message
		          //           });
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
    },

  }
</script>