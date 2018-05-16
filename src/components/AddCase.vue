<template>
<el-form :model="regform" ref="regform">
							<el-form-item  prop="cost" label="案件费用" :label-width="formLabelWidth">
                              <el-input v-model="regform.cost" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop="casetype" label="案件类型" :label-width="formLabelWidth">
                              <el-input v-model="regform.casetype" auto-complete="off"></el-input>
							  </el-form-item>
                            <el-form-item prop="info" label="案件备注" :label-width="formLabelWidth">
                              <el-input v-model="regform.info" auto-complete="off"></el-input>
							  </el-form-item>
							<el-form-item prop="wtime" >
                                &nbsp;&nbsp;&nbsp;
                                <span class="demonstration">录入时间</span>
                                <el-date-picker
                                 v-model="regform.wtime"
                                 type="date"
                                 placeholder="选择日期">
                                 </el-date-picker>
							  </el-form-item>
							  <el-form-item prop="finish" label="是否结案" :label-width="formLabelWidth">
                              <el-select v-model="regform.finish" placeholder="请选择">
                                              <el-option label="是" value="是"></el-option>
                                              <el-option label="否" value="否"></el-option>
                            </el-select>
                           </el-form-item>
                              <el-form-item prop="caseid" label="案件编号" :label-width="formLabelWidth">
                              <el-select v-model="regform.caseid" placeholder="请选择案件编号">
                                              <el-option label="100" value="100"></el-option>
                                              <el-option label="101" value="101"></el-option>
							                 <el-option label="102" value="102"></el-option>
							                 <el-option label="103" value="103"></el-option>
                            </el-select>
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
import {login, getAdminInfo, register,addLawyer,addCustomer,addCase} from '@/api/getData'
import {mapActions, mapState} from 'vuex'
  export default {
    data() {
      return {
        input: '',
        formLabelWidth:"80px", 
        regform: {
                    cost: '',
				          	casetype: '',
                    info: '',
                    wtime: '',
					          finish: '',
                    caseid: '',
                    lawyername: '',
                },
      }
    },
    methods: {
      async onSubmit(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						const res = await addCase({cost: this.regform.cost, casetype: this.regform.casetype, info: this.regform.info, wtime: this.regform.wtime, finish: this.regform.finish, caseid: this.regform.caseid, lawyername: this.regform.lawyername})
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