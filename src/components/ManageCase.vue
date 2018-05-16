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
      prop="cost"
      label="案件费用"
      width="120">
    </el-table-column>
    <el-table-column
      prop="casetype"
      label="案件类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="info"
      label="案件备注"
      width="300">
    </el-table-column>
    <el-table-column
      prop="wtime"
      label="录入时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="finish"
      label="是否结案"
      width="100">
    </el-table-column>
    <el-table-column
      prop="caseid"
      label="案件编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="lawyername"
      label="承接律师"
      width="120">
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
  <el-dialog title="修改案件" :visible.sync="dialogFormVisible">
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
    <el-button type="primary" @click="signIn('regform')">添加</el-button>
    <el-button @click="dialogFormVisible = false">取消</el-button>
    </el-form-item>
    </el-form>
    </el-dialog>
</div>
</template>

<script>
  import {login, getAdminInfo, register, updateLawyer, updateCase, loadCase} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
  export default {
    created() {
      this.getCaseData();
      this.tableData = this.caseInfo;
      console.log(this.tableData);
    },
    computed: {
      ...mapState(['caseInfo']),
    },
    methods: {
      ...mapActions(['getCaseData']),
      handleClick(row) {
        this.dialogFormVisible = true;
        this.regform.cost = row.cost
        this.regform.casetype = row.casetype
        this.regform.info = row.info
        this.regform.wtime = row.wtime
        this.regform.finish = row.finish
        this.regform.caseid = row.caseid
        this.regform.lawyername =row.lawyername

        console.log(row);
      },
      async signIn(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						const res = await updateCase({cost: this.regform.cost, casetype: this.regform.casetype, info: this.regform.info, wtime: this.regform.wtime, finish: this.regform.finish, caseid: this.regform.caseid, lawyername: this.regform.lawyername})
						if (res.status == 1) {


							this.$message({
		                        type: 'success',
								            message: '更改成功'
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
    },

    data() {
      return {
        input: '',
        dialogFormVisible: false,
        formLabelWidth: '100px',
        tableData: [],
        regform: {
                    cost: '',
					          casetype: '',
                    info: '',
                    wtime: '',
					          finish: '',
                    caseid: '',
                    lawyername: '',
                }
      }
    }
  }
</script>