<template>
<div id="protocol">
  <!--页头-->
  <div class="title">
    <div class="title-left">
      <p style="margin-top: 10px">推广协议</p>
    </div>
    <div class="title-right">

    </div>

  </div>
  <!--搜索框-->
  <el-row :gutter="20">
    <el-col :span="6">

        <el-input
            placeholder="请输入协议号、委托方名称"
            v-model="search.name"
            @input="inputChange"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

    </el-col>
    <el-col :span="6">
      状态：
      <el-select @change="selectChange" v-model="search.state" placeholder="请选择状态">
        <el-option
            label="已签约"
            value="1">
        </el-option>
        <el-option
            label="等待签约"
            value="0">
        </el-option>
      </el-select>

    </el-col>

  </el-row>
  {{search}}
  <!--table表格-->
  <div class="table">
    <el-table
        :data="protocolList"
        border
        style="width: 100%">
      <el-table-column
          type="index"
          label="序号"
          width="70">
      </el-table-column>
      <el-table-column
          prop="protocolId"
          label="协议号"
          width="200">
      </el-table-column>
      <el-table-column
          prop="jiaCompanyName"
          label="委托方"
          width="180">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="100">
        <template slot-scope="scope">
          <span style="color: #409EFF">{{scope.row.state == "0"?"尚未签约":""}}</span>
          {{scope.row.state == "1"?"已签约":""}}
        </template>
      </el-table-column>
      <el-table-column
          prop="productInfoList"
          label="推广产品"
          width="200"
          >
        <template slot-scope="scope">
          <span v-for="(item,index) in getArray(scope.row.productInfoList)" :key="index">
             {{item}}
          </span>

        </template>

      </el-table-column>
      <el-table-column
          prop="protocolLocation"
          label="业务区域"
          width="200">
      </el-table-column>
      <el-table-column
          prop="protocolInitTime,protocolEndTime"
          label="推广周期"
          width="284">
        <template slot-scope="scope">
          {{scope.row.protocolInitTime}}--
          {{scope.row.protocolEndTime }}
        </template>
      </el-table-column>
      <el-table-column
          prop="yiInitTime"
          label="签订时间"
          width="284">
      </el-table-column>
      <el-table-column

          label="操作"
          width="70">
<!--        <template slot-scope="scope">-->
<!--          <div v-show="scope.raw.state==1">-->
<!--            <router-link  to="/protocolDetail">-->
<!--              <span style="color: #409EFF">详情</span>-->
<!--            </router-link>-->
<!--          </div >-->
<!--          <div v-show="scope.raw.state==0">-->
<!--            <router-link  to="/protocolDetail">-->
<!--              <span style="color: #409EFF">签约</span>-->
<!--            </router-link>-->
<!--          </div>-->


<!--        </template>-->
        <template slot-scope="scope">
                    <div >
                      <router-link v-show="scope.row.state==1" :to="{path:'/protocolDetail',query:{protocolId:scope.row.protocolId,state:1}}">
                        <span style="color: #409EFF">详情</span>
                      </router-link>

                    </div >
          <div >
            <router-link v-show="scope.row.state==0"  :to="{path:'/protocolDetail',query:{protocolId:scope.row.protocolId,state:0}}">
              <span style="color: #409EFF">签约</span>
            </router-link>
          </div >

        </template>

      </el-table-column>
    </el-table>
  </div>
  <!--分页组件-->
  <el-pagination style="margin-left: 1100px" @size-change="pageSizeChange" @current-change="nowPageChange" :small="true"
                 :current-page="pageInfo.nowPage" :page-size="pageInfo.pageSize" :page-sizes="[3,6,9,12]"
                 layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
  </el-pagination>
  {{pageInfo}}}
</div>
</template>

<script>
export default {
  name: "protocol",
  data(){
    return {
      search:{name:"",state:""},
      protocolList:[],
      pageInfo: {
        pageSize: 6,
        nowPage: 1,
        total: 15
      }
    }
  },
  methods:{
    getArray(data){
      let arr=[];
      if(data && data.length!=0){
        data.forEach(item=>{
           arr.push(item.productName);
        })
        return arr.join(",");
      }
    },
    initTable() {
      this.pageInfo.nowPage = 1;
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log("data1");
      this.$axios.get("http://localhost:8088/protocol/initTable?" + data1).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.protocolList = map.returnData.t;
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
      this.$axios.get("http://localhost:8088/protocol/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.protocolList = map.returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    selectChange(){
      var data1 = this.$qs.stringify(this.pageInfo);
      console.log(data1);
      var data2 = this.$qs.stringify(this.search);
      console.log(data2);
      this.$axios.get("http://localhost:8088/protocol/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.protocolList = map.returnData.t;
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
      this.$axios.get("http://localhost:8088/protocol/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.protocolList = map.returnData.t;
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
      this.$axios.get("http://localhost:8088/protocol/initTableByTj?" + data1+"&"+data2).then(
          response => {
            var map = response.data;
            console.log(map);
            if (map.returnData.message == "代码正确") {
              this.pageInfo.total = map.num;
              this.protocolList = map.returnData.t;
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
#protocol{
  background-color: #ffffff;
  color: #333333FF;
  margin-left: 10px;
  margin-right: 10px;
  text-align: left;
  line-height: 50px;
}
a{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.title {
  height: 40px;
  margin-bottom: 10px;
}
.title-left{
  display: inline-block;
  float: left;
  height: 40px;
  width: 100px;
  border-left-style: solid;
  border-top-style: solid;
  border-right-style: solid;

  border-width: 1px;
  border-color: #C8CBD0FF;
  border-radius: 2px;
  color: #1999B9FF;
  text-align: center;
  line-height: 15px;
  font-size: 15px;

}
.title-right{
  display: inline-block;
  float: left;
  height: 40px;
  width: 1470px;
  border-bottom-style: solid;

  border-width: 1px;
  border-color: #C8CBD0FF;
  border-radius: 2px;
  color: #1999B9FF;
  text-align: center;
  line-height: 15px;
  font-size: 15px;
}
</style>