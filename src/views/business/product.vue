<template>
<div id="product">
  <!--搜索框-->
  <div class="product-top">
  <el-row :gutter="20" >
    <el-col :span="6">
      <el-input
          placeholder="请输入产品名称，生产厂商进行搜索"
          v-model="search.name"
          @input="inputChange">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
  </el-row>
  </div>
  <!--表格-->
  <div style="line-height: 30px">
    <el-table
        :data="productList"
        border
        style="width: 100%">
      <el-table-column
          type="index"
          label="序号"
          width="70">
      </el-table-column>
      <el-table-column
          prop="productName"
          label="产品名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="manufacturer"
          label="生产厂商"
          width="180">
      </el-table-column>

      <el-table-column
          prop="departmentsInfos"
          label="推荐科室"
          width="200"
      >
        <template slot-scope="scope">
          <span v-for="(item,index) in getArray(scope.row.departmentsInfos)" :key="index">
             {{item}}
          </span>

        </template>

      </el-table-column>
      <el-table-column
          prop="productFunction"
          label="主要关键信息"
          width="330">
      </el-table-column>
      <el-table-column
          prop="employeeInfoList"
          label="指派信息"
          width="200"
      >
        <template slot-scope="scope">
          <span v-for="(item,index) in getArray1(scope.row.employeeInfoList)" :key="index">
             {{item}}
          </span>

        </template>

      </el-table-column>
      <el-table-column
          prop="manufacturer"
          label="生产企业"
          width="284">
      </el-table-column>
      <el-table-column

          label="操作"
          width="145">
        <template slot-scope="scope">
<!--          <span v-for="(item,index) in getArray1(scope.row.employeeInfoList)" :key="index">-->
<!--             {{item}}-->
<!--          </span>-->
          <el-link type="primary" style="margin-left:20px;margin-right: 20px" :underline="false" @click="click(scope.row.id,getArray2(scope.row.employeeInfoList))">产品指派</el-link>
        </template>




      </el-table-column>
    </el-table>
  </div>
  <!--分页组件-->
  <el-pagination style="margin-left: 1100px" @size-change="pageSizeChange" @current-change="nowPageChange" :small="true"
                 :current-page="pageInfo.nowPage" :page-size="pageInfo.pageSize" :page-sizes="[3,6,9,12]"
                 layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
  </el-pagination>
  <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      >
    <template>
      <el-transfer v-model="selectuserId" :data="allUserInfo" :titles="['未授权','已授权']" :props="{
      key: 'employeeId',
      label: 'employeeName'
    }"></el-transfer>
    </template>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="empower">确 定</el-button>
  </span>
  </el-dialog>
  {{pageInfo}}}

</div>
</template>

<script>
export default {
  name: "product",
  data(){
    return {
      search:{
        name:''
      },
      pageInfo: {
        pageSize: 6,
        nowPage: 1,
        total: 15
      },
      productList:[],
      //产品指派
      currentProductId:0,
      selectuserId:[],
      allUserInfo:[],
      dialogVisible: false
    }
  },
  methods:{
    initTable(){
      this.pageInfo.nowPage = 1;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log("data1");
      this.$axios.get("http://localhost:8088/product/initTable?" + data1).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.productList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    getArray(data){
      let arr=[];
      if(data && data.length!=0){
        data.forEach(item=>{
          arr.push(item.departmentsName);
        })
        return arr.join(",");
      }
    },
    getArray1(data){
      let arr=[];
      if(data && data.length!=0){
        data.forEach(item=>{
          arr.push(item.employeeName);
        })
        return arr.join(",");
      }
    },
    getArray2(data){
      let arr=[];
      if(data && data.length!=0){
        data.forEach(item=>{
          arr.push(item.employeeId);
        })
        return arr;
      }
    },
    click(val1,val2){
      console.log(val1);
      console.log(val2);
      this.currentProductId=val1;
      this.selectuserId=val2;
      this.$axios.get("http://localhost:8088/product/initEmpower?").then(
          response => {
            var returnData = response.data;
            console.log(returnData);
            if (returnData.message == "代码正确") {
              this.allUserInfo=returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
      this.dialogVisible=true;
    },
    empower(){
      this.$axios.get("http://localhost:8088/product/empower?currentProductId=" + this.currentProductId+"&selectuserId="+this.selectuserId).then(
          response => {
            var returnData = response.data;
            console.log(returnData);
            if (returnData.message == "代码正确") {
              this.$message.info('授权成功');
              this.dialogVisible=false;
            } else {
              this.$message.error('授权失败');
            }

          });
    },


    inputChange(){
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/product/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.productList = map.returnData.t;
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
      this.$axios.get("http://localhost:8088/product/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.productList = map.returnData.t;
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
      this.$axios.get("http://localhost:8088/product/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.productList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });

    }
  },
  created() {
    this.initTable();
  }
}


</script>

<style >
.product-top {
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
}
</style>