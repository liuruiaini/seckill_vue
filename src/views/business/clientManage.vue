<template>
<div id="clients">
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="医院" name="first">
       <div class="hospital">
         <div class="hospital-top">
           <el-radio-group v-model="isShow" style="">
             <el-radio-button label="1">常用</el-radio-button>
             <el-radio-button label="2">待处理</el-radio-button>
           </el-radio-group>
           <el-button type="primary" style="float: right">+ 临床医护</el-button>
         </div>
         <div v-show="isShow=='1'">
           <!--搜索框-->
          <div style="height: 40px;margin-top: 10px">
            医院筛选：<el-input
                placeholder="请输入医院名称"
                v-model="search.name"
                style="width: 300px;"
                @input="inputChange"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
           <div style="height: 40px;margin-top: 10px;margin-bottom: 10px">
             地区筛选：<el-cascader
                 :options="optionThreed"
                 v-model="selectedTwo"
                 style="width: 300px;margin-right: 30px"
                 placeholder="省市区三级联动"
                 @change="handleInputConfirm1"
             ></el-cascader>
             级别筛选： <el-select v-model="search.grade" placeholder="请选择" @change="selectChange2">
             <el-option
                 label="全部"
                 value="0">

             </el-option>
             <el-option
                 label="三级"
                 value="1">

             </el-option>
             <el-option
                 label="二级"
                 value="2">

             </el-option>
             <el-option
                 label="一级"
                 value="3">

             </el-option>
             <el-option
                 label="未评级"
                 value="4">
             </el-option>
           </el-select>
           </div>
           <!--       {{search}}-->
           <!--table表格-->
           <div>
             <el-table
                 :data="hospitalList1"
                 border
                 style="width: 100%">
               <el-table-column
                   label="序号"
                   type="index"
                   width="50">
               </el-table-column>
               <el-table-column
                   prop="hospitalName"
                   label="医院名称"
                   width="180">
               </el-table-column>
               <el-table-column
                   prop="hospitalNickname"
                   label="医院别名"
                   width="180">
               </el-table-column>
               <el-table-column
                   prop="shengShiQU"
                   label="城市"
                   width="180">
               </el-table-column>
               <el-table-column
                   prop="hospitalAdress"
                   label="地址"
                   width="400">
               </el-table-column>
               <el-table-column
                   label="级别"
                   width="200">
                 <template slot-scope="scope">
                   {{scope.row.hospitalGrade == 1?"三级":""}}
                   {{scope.row.hospitalGrade == 2?"二级":""}}
                   {{scope.row.hospitalGrade == 3?"一级":""}}
                   {{scope.row.hospitalGrade == 4?"未评级":""}}
                 </template>
               </el-table-column>
               <el-table-column
                   prop="personList"
                   label="临床医护"
                   width="200">

               </el-table-column>
               <el-table-column

                   label="操作"
                   width="199">
                 <el-link type="primary" :underline="false">详情</el-link>
               </el-table-column>
             </el-table>
           </div>
           <!--分页组件-->
           <div>
             <el-pagination style="margin-left: 1100px" @size-change="pageSizeChange" @current-change="nowPageChange" :small="true"
                            :current-page="pageInfo.nowPage" :page-size="pageInfo.pageSize" :page-sizes="[10,20,100]"
                            layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
             </el-pagination>
             {{pageInfo}}}
           </div>
         </div>

         <div v-show="isShow=='2'">
           <!--搜索框-->
           <div style="height: 40px;margin-top: 10px">
             医院筛选：<el-input
               placeholder="请输入医院名称"
               v-model="search1.name"
               style="width: 300px;"
               @input="inputChange1"
           >
             <i slot="prefix" class="el-input__icon el-icon-search"></i>
           </el-input>
           </div>
           <div style="height: 40px;margin-top: 10px;margin-bottom: 10px">
             地区筛选：<el-cascader
               :options="optionThreed"
               v-model="selectedTwo1"
               style="width: 300px;margin-right: 30px"
               placeholder="省市区三级联动"
               @change="handleInputConfirm2"
           ></el-cascader>
             级别筛选： <el-select v-model="search1.grade" placeholder="请选择" @change="selectChange3">
             <el-option
                 label="全部"
                 value="0">

             </el-option>
             <el-option
                 label="三级"
                 value="1">

             </el-option>
             <el-option
                 label="二级"
                 value="2">

             </el-option>
             <el-option
                 label="一级"
                 value="3">

             </el-option>
             <el-option
                 label="未评级"
                 value="4">
             </el-option>
           </el-select>
           </div>
           <!--       {{search}}-->
           <!--table表格-->
           <div>
             <el-table
                 :data="hospitalList2"
                 border
                 style="width: 100%">
               <el-table-column
                   label="序号"
                   type="index"
                   width="50">
               </el-table-column>
               <el-table-column
                   prop="hospitalName"
                   label="医院名称"
                   width="180">
               </el-table-column>
               <el-table-column
                   prop="hospitalNickname"
                   label="医院别名"
                   width="180">
               </el-table-column>
               <el-table-column
                   prop="shengShiQU"
                   label="城市"
                   width="180">
               </el-table-column>
               <el-table-column
                   prop="hospitalAdress"
                   label="地址"
                   width="400">
               </el-table-column>
               <el-table-column
                   label="级别"
                   width="200">
                 <template slot-scope="scope">
                   {{scope.row.hospitalGrade == 1?"三级":""}}
                   {{scope.row.hospitalGrade == 2?"二级":""}}
                   {{scope.row.hospitalGrade == 3?"一级":""}}
                   {{scope.row.hospitalGrade == 4?"未评级":""}}
                 </template>
               </el-table-column>
               <el-table-column
                   label="状态"
                   width="200">
                 <template slot-scope="scope">
                   {{scope.row.isAgree == 0?"未通过":""}}
                   {{scope.row.isAgree == 2?"正在审核":""}}
                   {{scope.row.isAgree == 3?"审核未通过":""}}
                   {{scope.row.isAgree == 4?"审核通过":""}}
                 </template>

               </el-table-column>
               <el-table-column

                   label="操作"
                   width="199">
                 <el-link type="primary" :underline="false">详情</el-link>
               </el-table-column>
             </el-table>
           </div>
           <!--分页组件-->
           <div>
             <el-pagination style="margin-left: 1100px" @size-change="pageSizeChange1" @current-change="nowPageChange1" :small="true"
                            :current-page="pageInfo1.nowPage" :page-size="pageInfo1.pageSize" :page-sizes="[10,20,100]"
                            layout="total, sizes, prev, pager, next, jumper" :total="pageInfo1.total">
             </el-pagination>
             {{pageInfo1}}
           </div>
         </div>

         </div>



    </el-tab-pane>
    <el-tab-pane label="药店" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="渠道" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="其他终端" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

</div>
</template>

<script>

import {
  regionDataPlus

} from "element-china-area-data";


export default {
  name: "clients",
  data(){
    return{
      activeName: 'first',
      isShow:"1",
      pageInfo: {
        pageSize: 10,
        nowPage: 1,
        total: 15
      },
      pageInfo1: {
        pageSize: 10,
        nowPage: 1,
        total: 15
      },
      search:{
        name:'',
        grade:null,
        area:null
      },
      search1:{
        name:'',
        grade:null,
        area:null,
        isAgree:null
      },
      selectedTwo: [ ],
      selectedTwo1: [ ],

      optionThreed: regionDataPlus,
      hospitalList1:[],
      hospitalList2:[]
    }
  },
  methods:{
    initTable1(){
      this.pageInfo.nowPage = 1;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log("data1");
      this.$axios.get("http://localhost:8088/client/initTable1?" + data1).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.hospitalList1 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    initTable2(){
      this.pageInfo1.nowPage = 1;
      var data1 = this.$qs.stringify(this.pageInfo1);
      console.log("data1");
      this.$axios.get("http://localhost:8088/client/initTable2?" + data1).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo1.total = map.num;
              this.hospitalList2 = map.returnData.t;
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
      this.$axios.get("http://localhost:8088/client/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.hospitalList1 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    inputChange1(){
      var data1 = this.$qs.stringify(this.pageInfo1);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search1);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj1?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo1.total = map.num;
              this.hospitalList2 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    selectChange2(){
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.hospitalList1 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    selectChange3(){
      var data1 = this.$qs.stringify(this.pageInfo1);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search1);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj1?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo1.total = map.num;
              this.hospitalList2 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    handleInputConfirm1(val){
      console.log(val);
      this.search.area=this.selectedTwo[2];
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.hospitalList1 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    handleInputConfirm2(){
      this.search1.area=this.selectedTwo1[2];
      var data1 = this.$qs.stringify(this.pageInfo1);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search1);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj1?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo1.total = map.num;
              this.hospitalList2 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    pageSizeChange(pageSize){
      this.pageInfo.nowPage = 1;
      this.pageInfo.pageSize = pageSize;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.hospitalList1 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    pageSizeChange1(pageSize){
      this.pageInfo1.nowPage = 1;
      this.pageInfo1.pageSize = pageSize;
      var data1 = this.$qs.stringify(this.pageInfo1);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search1);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj1?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo1.total = map.num;
              this.hospitalList2 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    nowPageChange(nowPage){
      this.pageInfo.nowPage = nowPage;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.hospitalList1 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });

    },
    nowPageChange1(nowPage){
      this.pageInfo1.nowPage = nowPage;
      var data1 = this.$qs.stringify(this.pageInfo1);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search1);
      console.log(data2);
      this.$axios.get("http://localhost:8088/client/initTableByTj1?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo1.total = map.num;
              this.hospitalList2 = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    }
  },
  created() {
    this.initTable1();
    this. initTable2();
  }
}
</script>

<style >
#clients{
  background-color: #ffffff;
  color: #333333FF;
  margin-left: 10px;
  margin-right: 10px;
  text-align: left;
  line-height: 30px;
}



</style>