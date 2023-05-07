<template>
  <div id="employee">
    <!--搜索框-->
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-input
            placeholder="请输入邮箱账号或者姓名搜索"
            v-model="search.name"
            @input="inputChange"
            >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-checkbox v-model="search.accept" @change="butten1Change">仅显示已加入的成员</el-checkbox>
        <el-checkbox v-model="search.state" @change="butten2Change">不显示已冻结的成员</el-checkbox>
      </div>

      </el-col>
      <el-col :span="2" :offset="12"><div class="grid-content bg-purple" v-show="this.employeeInfo.menuId==2">
        <el-button type="primary" @click="openDialog1">邀请成员</el-button>
      </div>
      </el-col>
    </el-row>
    {{search}}
    <!-- 表格 -->
    <el-table
        :data="employeeInfoList"
        border
        style="width: 100%"
        cell-class-name="cell-class-name">
      <el-table-column
          prop="employeeId"
          label="序号"
          width="50">
      </el-table-column>
      <el-table-column
          prop="employeeEmail"
          label="邮箱号"
          width="200">
      </el-table-column>
      <el-table-column
          prop="employeePhone"
          label="手机号"
          width="200">
      </el-table-column>
      <el-table-column
          prop="employeeName"
          label="姓名"
          width="100">
      </el-table-column>
      <el-table-column
          prop="employeeDpt"
          label="部门"
          width="125">
      </el-table-column>
      <el-table-column
          prop="employeePost"
          label="职务"
          width="125">
      </el-table-column>
      <el-table-column
          prop="menuId"
          label="账号权限"
          width="150">
        <template slot-scope="scope">
          {{scope.row.menuId == "1"?"超级管理员":""}}
          {{scope.row.menuId == "2"?"管理员":""}}
          {{scope.row.menuId == "3"?"普通":""}}
        </template>
      </el-table-column>
      <el-table-column
          prop="employeeJoinTime"
          label="加入企业时间"
          width="200">
      </el-table-column>
      <el-table-column
          prop="employeeLatestTime"
          label="最近活跃时间"
          width="200">
      </el-table-column>
      <el-table-column
          prop="accept"
          label="邀请进度"
          width="85">
        <template slot-scope="scope">
          {{scope.row.accept == "0"?"未加入":""}}
          {{scope.row.accept == "1"?"已加入":""}}
        </template>
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="85">
        <template slot-scope="scope">
          {{scope.row.state == "0"?"冻结":""}}
          {{scope.row.state == "1"?"正常":""}}
        </template>
      </el-table-column>
      <el-table-column
          v-if="this.employeeInfo.menuId==2"
          label="操作"
          width="88">
        <template slot-scope="scope">
          <el-dropdown>
  <span class="el-dropdown-link">
    更多
  </span>
            <el-dropdown-menu slot="dropdown">

              <el-dropdown-item v-show="scope.row.menuId==3">
                <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-show="scope.row.menuId==2">
                <el-button type="text" size="mini" @click="menuTo(scope.row)">权限转移</el-button>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

    </el-table>
    <!--分页组件-->
    <el-pagination @size-change="pageSizeChange" @current-change="nowPageChange" :small="true"
                   :current-page="pageInfo.nowPage" :page-size="pageInfo.pageSize" :page-sizes="[3,6,9,12]"
                   layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
    </el-pagination>
    {{pageInfo}}}
    <!--新增企业成员信息-->
    <el-dialog title="新增企业成员信息" :visible.sync="editFlag" width="50%">
      <el-form label-width="100px" :model='addEmployee'>
        <el-row>
          <el-col :span="14">
            <el-form-item label="邮箱号">
              <el-input v-model="addEmployee.employeeEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="14">
            <el-form-item label="手机号">
              <el-input v-model="addEmployee.employeePhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="14">
            <el-form-item label="姓名">
              <el-input v-model="addEmployee.employeeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="14">
            <el-form-item label="部门">
              <el-input v-model="addEmployee.employeeDpt"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="14">
            <el-form-item label="职务">
              <el-input v-model="addEmployee.employeePost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="14">
            <el-form-item label="请选择权限">
              <el-select v-model="addEmployee.menuId">
                <!-- <el-option :value="0" label="无上级"></el-option> -->
                <el-option :value="1" label="超级管理员" disabled="ture"></el-option>
                <el-option :value="2" label="管理员"></el-option>
                <el-option :value="3" label="普通"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>





      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editFlag=false">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="submitForm()">保存
        </el-button>
      </div>
      {{addEmployee}}
    </el-dialog>
    <!--权限转移-->
    <el-dialog
        title="转移权限"
        :visible.sync="editFlag1"
        width="30%">
      <template>
        <el-select v-model="menuId.menuIdTo" placeholder="请选择">
          <el-option
              v-for="item in employeeInfoList"
              :key="item.employeeName"
              :label="item.employeeName"
              :value="item.employeeId">
          </el-option>
        </el-select>
      </template>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editFlag1 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm1()">确 定</el-button>
  </span>
      {{menuId}}

    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "employee",
  data() {
    return {
      pageInfo: {
        pageSize: 6,
        nowPage: 1,
        total: 15
      },
      search: {
        name:'',
        accept:false,
        state:false
      },
      employeeInfo: {},
      employeeInfoList: [],
      editFlag:false,
      editFlag1:false,
      menuId:{
        menuIdFrom:0,
        menuIdTo:0
      },//权限转移
      addEmployee:{
        employeeId:null,
        companyId:null,
        employeeEmail:'',
        employeePhone:'',
        employeeName:'',
        employeePwd:'123456',
        employeeDpt:'',
        employeePost:'',
        menuId:0,
        employeeJoinTime:null,
        employeeLatestTime:null,
        accept:0,
        state:1
      }//添加用户

    }
  },
  methods: {
    initEmployeeInfo() {
      this.$axios.get("http://localhost:8088/mainPage/initEmployeeInfo?").then(response => {
        this.employeeInfo = response.data.t;
        console.log(this.employeeInfo);
      });
    },
    pageSizeChange(pageSize) {
      this.pageInfo.nowPage = 1;
      this.pageInfo.pageSize = pageSize;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/employee/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.employeeInfoList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    nowPageChange(nowPage) {
      this.pageInfo.nowPage = nowPage;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/employee/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.employeeInfoList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    initTable() { //初始化表格
      this.pageInfo.nowPage = 1;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log("data1");
      this.$axios.get("http://localhost:8088/employee/initTable?" + data1).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.employeeInfoList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    inputChange(){
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/employee/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.employeeInfoList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    butten1Change(){
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/employee/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.employeeInfoList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    butten2Change(){
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/employee/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.employeeInfoList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    openDialog1(){
      this.editFlag=true;
    },
    submitForm(){
      this.$axios.post("http://localhost:8088/employee/addUser" , this.addEmployee).then(
          response => {
            var returnData = response.data;
            console.log(returnData);
            if (returnData.message == "代码正确"){
              this.$message({
                message: '已将邀请信息发送至邮箱',
                type: 'success'
              });
            } else {
              this.$message.error('邀请用户失败');
            }

          });
    },
    submitForm1(){
      var data1 = this.$qs.stringify(this.menuId);
      this.$axios.post("http://localhost:8088/employee/changeMenu?"+data1 ).then(
          response => {
            var returnData = response.data;
            console.log(returnData);
            if (returnData.message == "代码正确"){
              this.editFlag1=false;
              this.$message({
                message: '转移权限成功',
                type: 'success'
              });
            } else {
              this.$message.error('转移权限失败');
            }

          });
    },
    del(val){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(val.employeeId);
        var employeeId=val.employeeId;
        this.$axios.post("http://localhost:8088/employee/delUser?employeeId="+employeeId).then(
            response => {
              var returnData = response.data;
              console.log(returnData);
              if (returnData.message == "代码正确"){
                this.$message({
                  message: '删除用户成功',
                  type: 'success'
                });
              } else {
                this.$message.error('删除用户失败');
              }

            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    menuTo(val){
      this.menuId.menuIdFrom=val.employeeId;
       this.editFlag1=true;
    }
  },
  created() {
    this.initEmployeeInfo();
    this.initTable();
  }


}
</script>

<style>
#employee {
  background-color: #ffffff;
  color: #333333FF;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 30px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}


</style>
