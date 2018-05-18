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
      prop="customername"
      label="客户姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="caseid"
      label="案件编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="lawyername"
      label="承接律师"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="客户电话"
      width="140">
    </el-table-column>
    <el-table-column
      prop="address"
      label="客户地址"
      width="190">
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
  <el-dialog title="修改客户" :visible.sync="dialogFormVisible">
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
    <el-button type="primary" @click="signIn('regform')">添加</el-button>
    <el-button @click="dialogFormVisible = false">取消</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
//  import {login, getAdminInfo, register, updateLawyer, updateCustomer, loadCustomer} from '@/api/getData'
// 	import {mapActions, mapState} from 'vuex'
  export default {
    created() {
      this.getCustomerData();
      this.tableData = this.customerInfo;
    },
    computed: {
      // ...mapState(['customerInfo']),
    },
    methods: {
      // ...mapActions(['getCustomerData']),
      handleClick(row) {
        this.dialogFormVisible = true;
        this.regform.customername = row.customername
        this.regform.caseid = row.caseid
        this.regform.lawyername = row.lawyername
        this.regform.address = row.address
        this.regform.tel = row.tel
        console.log(row);
      
    },
    async signIn(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						const res = await updateCustomer({customername: this.regform.customername, caseid: this.regform.caseid, tel: this.regform.tel, address: this.regform.address, lawyername: this.regform.lawyername})
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
          customername: '',
					caseid: '',
					lawyername: '',
					tel: '',
					address: '',
                }
      }
    }
  }
</script>

