<template>
<el-form :model="regform" ref="regform">
							<el-form-item  prop="customername" label="客户姓名" :label-width="formLabelWidth">
                              <el-input v-model="regform.customername" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop="caseid" label="案件编号" :label-width="formLabelWidth">
                              <el-input v-model="regform.caseid" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop="tel" label="客户电话" :label-width="formLabelWidth">
                              <el-input v-model="regform.tel" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop="address" label="客户地址" :label-width="formLabelWidth">
                              <el-input v-model="regform.address" auto-complete="off"></el-input>
							  </el-form-item>
                             <el-form-item prop="lawyername" label="承接律师" :label-width="formLabelWidth">
                              <el-select v-model="regform.lawyername" placeholder="请选择承接律师">
                               <el-option label="刘帆" value="刘帆"></el-option>
                               <el-option label="叶锋" value="叶锋"></el-option>
							                 <el-option label="黄俊凯" value="黄俊凯"></el-option>
							                 <el-option label="白春光" value="白春光"></el-option>
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
import {login, getAdminInfo, register,addLawyer,addCustomer} from '@/api/getData'
import {mapActions, mapState} from 'vuex'
  export default {
    data() {
      return {
        input: '',
        formLabelWidth:"80px", 
        regform: {
          customername: '',
					caseid: '',
					lawyername: '',
					tel: '',
					address: '',
                },
      }
    },
    methods: {
      async onSubmit(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						const res = await addCustomer({customername: this.regform.customername, caseid: this.regform.caseid, tel: this.regform.tel, address: this.regform.address, lawyername: this.regform.lawyername})
						if (res.status == 1) {

							this.$message({
		                        type: 'success',
								            message: '添加成功'
                            });
                            this.dialogFormVisible=false
                            this.$router.push('Manage')
                                 }
            else{
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
							